import { setDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { fundManagerReports } from './data'; // Your existing data

export const migrateExistingData = async () => {
    try {
        for (const yearData of fundManagerReports) {
            const year = yearData.title.split(' ')[0]; // Extract year from title

            // Transform items to include download URLs (you'll need to upload files first)
            const transformedItems = yearData.items.map(item => ({
                ...item,
                downloadUrl: `/pdf/${item.file}.${item.ppt ? 'pptx' : 'pdf'}`, // Temporary URL
                uploadDate: new Date(),
                fileName: `${item.file}.${item.ppt ? 'pptx' : 'pdf'}`
            }));

            await setDoc(doc(db, 'fundManagerReports', year), {
                title: yearData.title,
                year: parseInt(year),
                items: transformedItems
            });
        }

        console.log('Data migration completed successfully!');
    } catch (error) {
        console.error('Error migrating data:', error);
    }
};