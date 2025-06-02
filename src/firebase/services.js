// src/services/firebaseServices.js
import {
    collection,
    doc,
    getDocs,
    setDoc,
    updateDoc,
    orderBy,
    query,
    getDoc,
    deleteDoc
} from 'firebase/firestore';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage';
import { db, storage } from '../firebase/config';

// Fetch all fund manager reports
export const getFundManagerReports = async () => {
    try {
        const q = query(collection(db, 'fundManagerReports'), orderBy('year', 'desc'));
        const querySnapshot = await getDocs(q);
        const reports = [];

        querySnapshot.forEach((doc) => {
            reports.push({
                id: doc.id,
                ...doc.data()
            });
        });

        return reports;
    } catch (error) {
        console.error('Error fetching reports:', error);
        throw new Error('Failed to fetch reports');
    }
};

// Upload file with progress tracking
export const uploadFileWithProgress = async (file, fileName, onProgress) => {
    try {
        // Validate file size (max 10MB)
        const maxSize = 50 * 1024 * 1024;
        if (file.size > maxSize) {
            throw new Error('File size must be less than 10MB');
        }

        // Validate file type
        const allowedTypes = [
            'application/pdf',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation'
        ];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('File must be PDF, PPT, or PPTX format');
        }

        const fileExtension = file.name.split('.').pop();
        const timestamp = Date.now();
        const fullFileName = `${fileName}_${timestamp}.${fileExtension}`;
        const storageRef = ref(storage, `reports/${fullFileName}`);

        // Simulate upload progress for demonstration
        onProgress(10);
        await new Promise(resolve => setTimeout(resolve, 200));
        onProgress(30);
        await new Promise(resolve => setTimeout(resolve, 200));
        onProgress(60);

        const snapshot = await uploadBytes(storageRef, file);
        onProgress(90);

        const downloadURL = await getDownloadURL(snapshot.ref);
        onProgress(100);

        return {
            downloadUrl: downloadURL,
            fileName: fullFileName,
            isPpt: fileExtension === 'pptx' || fileExtension === 'ppt'
        };
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
};

// Add new report to a year
export const addReport = async (yearId, reportData) => {
    try {
        const yearDocRef = doc(db, 'fundManagerReports', yearId);
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const currentData = yearDocSnap.data();
            const updatedItems = [...(currentData.items || []), reportData];

            await updateDoc(yearDocRef, {
                items: updatedItems
            });
        } else {
            await setDoc(yearDocRef, {
                title: `${yearId} Reports`,
                year: parseInt(yearId),
                items: [reportData]
            });
        }
    } catch (error) {
        console.error('Error adding report:', error);
        throw new Error('Failed to add report');
    }
};

// Update year title
export const updateYearTitle = async (yearId, newTitle) => {
    try {
        const yearDocRef = doc(db, 'fundManagerReports', yearId);
        await updateDoc(yearDocRef, {
            title: newTitle
        });
    } catch (error) {
        console.error('Error updating year title:', error);
        throw new Error('Failed to update year title');
    }
};

// Delete an entire year
export const deleteYear = async (yearId) => {
    try {
        const yearDocRef = doc(db, 'fundManagerReports', yearId);
        await deleteDoc(yearDocRef);
    } catch (error) {
        console.error('Error deleting year:', error);
        throw new Error('Failed to delete year');
    }
};

// Delete a specific report
export const deleteReport = async (yearId, reportIndex) => {
    try {
        const yearDocRef = doc(db, 'fundManagerReports', yearId);
        const yearDocSnap = await getDoc(yearDocRef);

        if (yearDocSnap.exists()) {
            const currentData = yearDocSnap.data();
            const reportToDelete = currentData.items[reportIndex];
            const updatedItems = currentData.items.filter((_, index) => index !== reportIndex);

            await updateDoc(yearDocRef, {
                items: updatedItems
            });

            if (reportToDelete.fileName) {
                const fileRef = ref(storage, `reports/${reportToDelete.fileName}`);
                try {
                    await deleteObject(fileRef);
                } catch (storageError) {
                    console.warn('File may not exist in storage:', storageError);
                }
            }
        }
    } catch (error) {
        console.error('Error deleting report:', error);
        throw new Error('Failed to delete report');
    }
};

// Helper function to extract title from filename
export const extractTitleFromFilename = (filename) => {
    const nameWithoutExtension = filename.replace(/\.[^/.]+$/, "");
    // Remove common patterns and convert to readable format
    return nameWithoutExtension
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .trim();
};