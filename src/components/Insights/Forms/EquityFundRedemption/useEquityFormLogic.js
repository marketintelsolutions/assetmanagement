// useEquityFormLogic.js
import { useState } from 'react';
import { EquityPDFGenerator } from './EquityPDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useEquityFormLogic = (fundManagerEmail) => {
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
        // Clear signature when mode changes
        const signatureField = signatureType === 'primary' ? 'primarySignature' : 'jointSignature';
        setFormData(prev => ({ ...prev, [signatureField]: null }));
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

        // Email validation
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
            const pdfDoc = EquityPDFGenerator.generateFilledPDF(formData);
            const pdfBase64 = pdfDoc.output('datauristring');
            return pdfBase64.split(',')[1];
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        }
    };

    const createEmailTemplates = () => {
        // Enhanced email templates for equity fund
        const fundManagerTemplate = `
            <h2>PACAM Equity Fund Redemption Request</h2>
            <p>A new equity fund redemption request has been submitted.</p>
            
            <h3>Personal Information</h3>
            <ul>
                <li>Full Name: ${formData.fullName}</li>
                <li>Client ID: ${formData.clientId}</li>
                <li>Email: ${formData.email}</li>
                <li>Phone: ${formData.telephoneNumber || 'Not provided'}</li>
            </ul>
            
            <h3>Redemption Details</h3>
            <ul>
                <li>Units to Redeem (Figures): ${formData.unitsToRedeemFigures}</li>
                <li>Units to Redeem (Words): ${formData.unitsToRedeemWords}</li>
            </ul>
            
            <h3>Payment Details</h3>
            <ul>
                <li>Bank: ${formData.bank}</li>
                <li>Branch: ${formData.branch}</li>
                <li>Account: ${formData.accountNumber} - ${formData.accountName}</li>
            </ul>
            
            <h3>Important Notes</h3>
            <ul>
                <li>PACAM Equity Fund: Early redemption within 90 days incurs 10% charge on positive returns</li>
                <li>Payment will only be made to the unit holder(s)</li>
                <li>For partial redemption, balance statement will be emailed</li>
            </ul>
        `;

        const userTemplate = `
            <h2>PACAM Equity Fund Redemption Confirmation</h2>
            <p>Dear ${formData.fullName},</p>
            <p>Your equity fund redemption request has been received and is being processed.</p>
            
            <h3>Request Details</h3>
            <ul>
                <li>Units to Redeem: ${formData.unitsToRedeemFigures} (${formData.unitsToRedeemWords})</li>
                <li>Payment Account: ${formData.accountName} - ${formData.bank}</li>
                <li>Fund Type: PACAM Equity Fund</li>
            </ul>
            
            <p><strong>Important:</strong> For redemptions within 90 days, 10% of positive returns will be charged.</p>
        `;

        return { fundManagerTemplate, userTemplate };
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

            // Create email content
            const { fundManagerTemplate, userTemplate } = createEmailTemplates();

            // Submit via API using equity fund routes
            const result = await apiUtils.retry(
                () => apiService.equityFund.submit(formData, pdfContent, fundManagerEmail),
                3,
                2000
            );

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit form');
            }

            showModal(
                'success',
                `Equity Fund redemption form submitted successfully!\n\nReference: ${result.referenceId}\n\nYou and the fund manager will receive emails with the complete PDF form.`,
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
                setSignatureMode({
                    primary: 'draw',
                    joint: 'draw'
                });
                closeModal();
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);
            const errorDetails = apiUtils.getErrorDetails(error);
            let errorMessage = 'Failed to submit equity fund redemption form.\n\n';

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
            const pdfDoc = EquityPDFGenerator.generateFilledPDF(formData);
            pdfDoc.save(`PACAM_Equity_Redemption_Preview_${Date.now()}.pdf`);
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