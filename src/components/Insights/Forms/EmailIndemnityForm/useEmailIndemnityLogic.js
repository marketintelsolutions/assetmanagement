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
        signature: null, // For individual variant
        primarySignature: null, // For corporate variant (first signatory)
        secondarySignature: null, // For corporate variant (second signatory)
    });

    const [signatureMode, setSignatureMode] = useState(
        variant === 'corporate'
            ? { primary: 'draw', secondary: 'draw' }
            : 'draw'
    );

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

    const handleSignatureChange = (type, signatureData) => {
        console.log('Signature changed:', type, signatureData ? 'signature present' : 'signature null');
        if (variant === 'individual') {
            if (type === 'signature') {
                setFormData(prev => ({ ...prev, signature: signatureData }));
            } else {
                // Backwards compatibility - if called without type parameter
                setFormData(prev => ({ ...prev, signature: type })); // type is actually signatureData in this case
            }
        } else {
            setFormData(prev => ({ ...prev, [type]: signatureData }));
        }
    };

    const handleSignatureModeChange = (type, mode) => {
        console.log('Signature mode changed:', type, mode);
        if (variant === 'individual') {
            if (type === 'signature') {
                setSignatureMode(mode);
            } else {
                // Backwards compatibility - if called without type parameter
                setSignatureMode(type); // type is actually mode in this case
            }
        } else {
            setSignatureMode(prev => ({ ...prev, [type]: mode }));
        }
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
        console.log('Validating form:', formData);
        const required = ['preferredEmail', 'agreedToTerms'];

        if (variant === 'corporate') {
            required.push('companyName', 'primarySignature');
        } else {
            required.push('accountHolderName', 'signature');
        }

        for (let field of required) {
            if (!formData[field]) {
                const fieldName = field === 'agreedToTerms' ? 'Agreement to terms' :
                    field === 'signature' || field === 'primarySignature' ? 'Signature' :
                        field === 'preferredEmail' ? 'Email address' :
                            field === 'companyName' ? 'Company name' :
                                field === 'accountHolderName' ? 'Account holder name' : field;
                console.log('Validation failed for field:', field, 'Value:', formData[field]);
                return {
                    valid: false,
                    message: `${fieldName} is required`
                };
            }
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.preferredEmail)) {
            return { valid: false, message: 'Invalid email format' };
        }

        console.log('Form validation passed');
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
                    primarySignature: null,
                    secondarySignature: null,
                });
                setSignatureMode(
                    variant === 'corporate'
                        ? { primary: 'draw', secondary: 'draw' }
                        : 'draw'
                );
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