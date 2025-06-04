// useMoneyMarketFormLogic.js
import { useState } from 'react';
import { MoneyMarketPDFGenerator } from './MoneyMarketPDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useMoneyMarketFormLogic = (fundManagerEmail) => {
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
        const signatureField = signatureType === 'primary' ? 'primarySignature' : 'jointSignature';
        setFormData(prev => ({ ...prev, [signatureField]: null }));
    };

    const showModal = (type, message, title = '') => {
        setModal({ isOpen: true, type, message, title });
    };

    const closeModal = () => {
        setModal({ isOpen: false, type: null, message: '', title: '' });
    };

    const validateFormLocally = () => {
        const required = ['fullName', 'clientId', 'email', 'unitsToRedeemFigures', 'unitsToRedeemWords',
            'bank', 'branch', 'sortCode', 'accountNumber', 'accountName'];

        for (let field of required) {
            if (!formData[field]) {
                return { valid: false, message: `${field} is required` };
            }
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return { valid: false, message: 'Invalid email format' };
        }

        if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
            return { valid: false, message: 'Invalid user email format' };
        }

        return { valid: true };
    };

    const generatePDF = () => {
        try {
            const pdfDoc = MoneyMarketPDFGenerator.generateFilledPDF(formData);
            const pdfBase64 = pdfDoc.output('datauristring');
            return pdfBase64.split(',')[1];
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        }
    };

    const handleSubmit = async () => {
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
            const pdfContent = generatePDF();

            const result = await apiUtils.retry(
                () => apiService.moneyMarketFund.submit(formData, pdfContent, fundManagerEmail),
                3,
                2000
            );

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit form');
            }

            showModal(
                'success',
                `Money Market Fund redemption form submitted successfully!\n\nReference: ${result.referenceId}\n\nYou and the fund manager will receive emails with the complete PDF form.`,
                'Form Submitted Successfully!'
            );

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
                setSignatureMode({ primary: 'draw', joint: 'draw' });
                closeModal();
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
            const errorDetails = apiUtils.getErrorDetails(error);
            let errorMessage = 'Failed to submit Money Market fund redemption form.\n\n';

            if (errorDetails.isNetworkError) {
                errorMessage += 'Please check your internet connection and try again.';
            } else if (errorDetails.isServerError) {
                errorMessage += 'Server error occurred. Please try again in a few minutes.';
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
            const pdfDoc = MoneyMarketPDFGenerator.generateFilledPDF(formData);
            pdfDoc.save(`PACAM_MoneyMarket_Redemption_Preview_${Date.now()}.pdf`);
        } catch (error) {
            console.error('PDF preview error:', error);
            showModal('error', 'Error generating PDF preview: ' + error.message, 'PDF Generation Error');
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