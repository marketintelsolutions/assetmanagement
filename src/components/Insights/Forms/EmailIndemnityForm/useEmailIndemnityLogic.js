// useEmailIndemnityLogic.js
import { useState } from 'react';
import { EmailIndemnityPDFGenerator } from './EmailIndemnityPDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useEmailIndemnityLogic = (variant, adminEmail) => {
    const [formData, setFormData] = useState({
        preferredEmail: '',
        preferredPhone: '',
        accountHolderName: '',
        companyName: '',
        signatureDate: '',
        agreedToTerms: false,
        signature: null,
    });

    const [signatureMode, setSignatureMode] = useState('draw');

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        message: '',
        title: ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSignatureChange = (signatureData) => {
        setFormData(prev => ({ ...prev, signature: signatureData }));
    };

    const handleSignatureModeChange = (mode) => {
        setSignatureMode(mode);
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
        const required = ['preferredEmail', 'accountHolderName', 'agreedToTerms', 'signature'];
        if (variant === 'corporate') {
            required.push('companyName');
        }

        for (let field of required) {
            if (!formData[field]) {
                return {
                    valid: false,
                    message: `${field === 'agreedToTerms' ? 'Agreement to terms' :
                        field === 'signature' ? 'Signature' : field} is required`
                };
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.preferredEmail)) {
            return { valid: false, message: 'Invalid email format' };
        }

        return { valid: true };
    };

    const generatePDF = () => {
        try {
            const pdfDoc = EmailIndemnityPDFGenerator.generateFilledPDF(formData, variant);
            const pdfBase64 = pdfDoc.output('datauristring');
            // Remove the data:application/pdf;base64, prefix
            return pdfBase64.split(',')[1];
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        }
    };

    const handlePreviewPDF = () => {
        try {
            const pdfDoc = EmailIndemnityPDFGenerator.generateFilledPDF(formData, variant);
            pdfDoc.save(`Email_Indemnity_${variant}_Preview_${Date.now()}.pdf`);
        } catch (error) {
            console.error('PDF preview error:', error);
            showModal('error', 'Error generating PDF preview: ' + error.message, 'PDF Generation Error');
        }
    };

    const handleSubmit = async () => {
        // Local validation first
        const localValidation = validateFormLocally();
        if (!localValidation.valid) {
            showModal('error', localValidation.message, 'Validation Error');
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
                () => apiService.emailIndemnity.submit(
                    { ...formData, variant },
                    pdfContent,
                    adminEmail
                ),
                3, // 3 retries
                2000 // 2 second delay
            );

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit form');
            }

            showModal(
                'success',
                `Email Indemnity Agreement submitted successfully!\n\nReference: ${result.referenceId}\n\nYou and the admin will receive emails with the complete PDF form.`,
                'Form Submitted Successfully!'
            );

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    preferredEmail: '',
                    preferredPhone: '',
                    accountHolderName: '',
                    companyName: '',
                    signatureDate: '',
                    agreedToTerms: false,
                    signature: null,
                });
                setSignatureMode('draw'); // Reset signature mode to default
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
        closeModal
    };
};