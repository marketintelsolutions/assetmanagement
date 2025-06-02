// useFormLogic.js - Updated with Modal Support
import { useState } from 'react';
import { PDFGenerator } from './PDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useFormLogic = (fundManagerEmail) => {
    const [formData, setFormData] = useState({
        date: '',
        fullName: '',
        clientId: '',
        telephoneNumber: '',
        email: '',
        unitsToRedeemFigures: '',
        unitsToRedeemWords: '',
        bank: '',
        branch: '',
        sortCode: '',
        accountNumber: '',
        accountName: '',
        certificateNumbers: '',
        totalUnits: '',
        previousRedemption: '',
        balance: '',
        currentRedemption: '',
        userEmail: '',
        primarySignature: null,
        jointSignature: null
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        message: '',
        title: ''
    });
    const [signatureMode, setSignatureMode] = useState({
        primary: 'draw',
        joint: 'draw'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSignatureChange = (type, signatureData) => {
        setFormData(prev => ({ ...prev, [type]: signatureData }));
    };

    const handleSignatureModeChange = (signatureType, mode) => {
        setSignatureMode(prev => ({ ...prev, [signatureType]: mode }));
    };

    const showModal = (type, message, title = '') => {
        setModal({
            isOpen: true,
            type,
            message,
            title
        });
    };

    const closeModal = () => {
        setModal({
            isOpen: false,
            type: null,
            message: '',
            title: ''
        });
    };

    const validateFormLocally = () => {
        const required = ['fullName', 'clientId', 'email', 'unitsToRedeemFigures', 'unitsToRedeemWords',
            'bank', 'branch', 'sortCode', 'accountNumber', 'accountName'];

        for (let field of required) {
            if (!formData[field]) {
                return { valid: false, message: `${field} is required` };
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { valid: false, message: 'Invalid email format' };
        }

        if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
            return { valid: false, message: 'Invalid user email format' };
        }

        return { valid: true };
    };

    const validateFormWithBackend = async () => {
        try {
            const result = await apiService.redemption.validate(formData);
            return result;
        } catch (error) {
            console.error('Backend validation error:', error);
            return {
                valid: false,
                errors: [apiUtils.getErrorMessage(error)],
                message: 'Validation service unavailable, using local validation'
            };
        }
    };

    const generatePDF = () => {
        try {
            const pdfDoc = PDFGenerator.generateFilledPDF(formData);
            const pdfBase64 = pdfDoc.output('datauristring');
            // Remove the data:application/pdf;base64, prefix
            return pdfBase64.split(',')[1];
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        }
    };

    const handleSubmit = async () => {
        // Local validation first
        const localValidation = validateFormLocally();
        if (!localValidation.valid) {
            showModal('error', localValidation.message, 'Validation Error');
            return;
        }

        if (!formData.primarySignature) {
            showModal('error', 'Primary signature is required to submit the form.', 'Missing Signature');
            return;
        }

        setIsSubmitting(true);

        try {
            // Generate PDF
            let pdfContent;
            try {
                pdfContent = generatePDF();
            } catch (pdfError) {
                throw new Error('Failed to generate PDF: ' + pdfError.message);
            }

            // Submit to backend
            const result = await apiUtils.retry(
                () => apiService.redemption.submit(formData, pdfContent, fundManagerEmail),
                3, // 3 retries
                2000 // 2 second delay
            );

            console.log('result', result);

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit form');
            }

            showModal(
                'success',
                `Redemption form submitted successfully!\n\nReference: ${result.referenceId}\n\nYou and the fund manager will receive emails with the complete PDF form and signature files.`,
                'Form Submitted Successfully!'
            );

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    date: '',
                    fullName: '',
                    clientId: '',
                    telephoneNumber: '',
                    email: '',
                    unitsToRedeemFigures: '',
                    unitsToRedeemWords: '',
                    bank: '',
                    branch: '',
                    sortCode: '',
                    accountNumber: '',
                    accountName: '',
                    certificateNumbers: '',
                    totalUnits: '',
                    previousRedemption: '',
                    balance: '',
                    currentRedemption: '',
                    userEmail: '',
                    primarySignature: null,
                    jointSignature: null
                });
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);

            const errorDetails = apiUtils.getErrorDetails(error);
            let errorMessage = 'Failed to submit form.\n\n';

            // Check if it's a validation error with specific details
            if (error.response?.status === 400 && error.response?.data?.errors) {
                errorMessage = 'Form validation failed:\n\n';
                error.response.data.errors.forEach(err => {
                    errorMessage += `• ${err}\n`;
                });
            } else if (errorDetails.isNetworkError) {
                errorMessage += 'Please check your internet connection and try again.';
            } else if (errorDetails.isServerError) {
                errorMessage += 'Server error occurred. Please try again in a few minutes.';
            } else if (errorDetails.isClientError) {
                errorMessage += errorDetails.message;
            } else {
                errorMessage += errorDetails.message;
            }

            showModal('error', errorMessage, 'Submission Failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePreviewPDF = () => {
        try {
            const pdfDoc = PDFGenerator.generateFilledPDF(formData);
            pdfDoc.save(`PACAM_Redemption_Preview_${Date.now()}.pdf`);
        } catch (error) {
            console.error('PDF preview error:', error);
            showModal('error', 'Error generating PDF preview: ' + error.message, 'PDF Generation Error');
        }
    };

    const checkSubmissionStatus = async (clientId, referenceId = null) => {
        try {
            const status = await apiService.redemption.getStatus(clientId, referenceId);
            return status;
        } catch (error) {
            console.error('Status check error:', error);
            throw new Error(apiUtils.getErrorMessage(error));
        }
    };

    const testEmailConfiguration = async (testEmail) => {
        try {
            const result = await apiService.email.sendTest(testEmail);
            return result;
        } catch (error) {
            console.error('Email test error:', error);
            throw new Error(apiUtils.getErrorMessage(error));
        }
    };

    return {
        formData,
        isSubmitting,
        modal,
        signatureMode,
        handleInputChange,
        handleSignatureChange,
        handleSignatureModeChange,
        handleSubmit,
        handlePreviewPDF,
        checkSubmissionStatus,
        testEmailConfiguration,
        validateFormWithBackend,
        closeModal
    };
};