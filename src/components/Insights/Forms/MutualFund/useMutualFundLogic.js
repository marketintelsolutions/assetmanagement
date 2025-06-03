// useMutualFundLogic.js
import { useState } from 'react';
import { MutualFundPDFGenerator } from './MutualFundPDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useMutualFundLogic = (adminEmail) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        type: null,
        message: '',
        title: ''
    });

    const [formData, setFormData] = useState({
        // Investment Information
        fundType: '',
        dividendMandate: '',
        investmentValue: '',
        investorType: '',

        // Account Type
        isJointAccount: false,

        // Primary Applicant
        primaryApplicant: {
            surname: '',
            name: '',
            otherName: '',
            residentialAddress: '',
            nationality: '',
            dateOfBirth: '',
            occupation: '',
            gender: '',
            stateOfOrigin: '',
            townCity: '',
            mobileNumber: '',
            emailAddress: '',
            taxId: '',
            idType: '',
            idNumber: '',
            idIssuedDate: '',
            idExpiryDate: '',
            bvn: '',
            accountName: '',
            accountNumber: '',
            bankName: '',
            signature: null,
            signatureDate: ''
        },

        // Joint Applicant (optional)
        jointApplicant: {
            surname: '',
            name: '',
            otherName: '',
            residentialAddress: '',
            nationality: '',
            dateOfBirth: '',
            occupation: '',
            gender: '',
            stateOfOrigin: '',
            townCity: '',
            mobileNumber: '',
            emailAddress: '',
            taxId: '',
            idType: '',
            idNumber: '',
            idIssuedDate: '',
            idExpiryDate: '',
            bvn: '',
            signature: null,
            signatureDate: ''
        },

        // Minor Investment (optional)
        minorInvestment: {
            isForMinor: false,
            surname: '',
            name: '',
            otherName: '',
            residentialAddress: '',
            nationality: '',
            stateOfOrigin: '',
            relationship: '',
            mobileNumber: '',
            dateOfBirth: '',
            relationshipToApplicant: '',
            emailAddress: ''
        },

        // Next of Kin
        nextOfKin: {
            surname: '',
            name: '',
            otherName: '',
            residentialAddress: '',
            nationality: '',
            stateOfOrigin: '',
            relationship: '',
            mobileNumber: '',
            emailAddress: ''
        },

        // PEP Information
        isPep: '',
        pepDetails: '',
        isFinanciallyExposed: '',
        financiallyExposedDetails: '',

        // Investor Domicile
        investorDomicile: '',

        // Attestations
        agreedToTerms: false,
        agreedToRisks: false,

        // Document uploads
        uploadedDocuments: {},
        attachments: []
    });

    const [signatureMode, setSignatureMode] = useState({
        primary: 'draw',
        joint: 'draw'
    });

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

    const handleInputChange = (field, value, section = null) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: {
                    ...prev[section],
                    [field]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSignatureChange = (type, signatureData) => {
        if (type === 'primarySignature') {
            setFormData(prev => ({
                ...prev,
                primaryApplicant: {
                    ...prev.primaryApplicant,
                    signature: signatureData
                }
            }));
        } else if (type === 'jointSignature') {
            setFormData(prev => ({
                ...prev,
                jointApplicant: {
                    ...prev.jointApplicant,
                    signature: signatureData
                }
            }));
        }
    };

    const handleSignatureModeChange = (type, mode) => {
        setSignatureMode(prev => ({ ...prev, [type]: mode }));
    };

    const handleDocumentUpload = (documentKey, fileData) => {
        setFormData(prev => ({
            ...prev,
            uploadedDocuments: {
                ...prev.uploadedDocuments,
                [documentKey]: fileData
            }
        }));
    };

    const removeDocument = (documentKey) => {
        setFormData(prev => {
            const newUploadedDocuments = { ...prev.uploadedDocuments };
            delete newUploadedDocuments[documentKey];
            return {
                ...prev,
                uploadedDocuments: newUploadedDocuments
            };
        });
    };

    const validateStep = (step) => {
        switch (step) {
            case 0: // Investment Info
                return formData.fundType && formData.investmentValue && formData.investorType;
            case 1: // Applicant Details
                return formData.primaryApplicant.surname &&
                    formData.primaryApplicant.name &&
                    formData.primaryApplicant.emailAddress;
            case 2: // Joint Account
                return !formData.isJointAccount ||
                    (formData.jointApplicant.surname && formData.jointApplicant.name);
            case 3: // Documents & PEP
                return formData.isPep !== '' && formData.isFinanciallyExposed !== '';
            case 4: // Signatures
                return formData.primaryApplicant.signature &&
                    formData.primaryApplicant.signatureDate &&
                    (!formData.isJointAccount ||
                        (formData.jointApplicant?.signature && formData.jointApplicant?.signatureDate));
            case 5: // Review
                return formData.agreedToTerms && formData.agreedToRisks;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep) && currentStep < 5) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const generatePDF = () => {
        try {
            const pdfDoc = MutualFundPDFGenerator.generateFilledPDF(formData);
            const pdfBase64 = pdfDoc.output('datauristring');
            return pdfBase64.split(',')[1];
        } catch (error) {
            console.error('PDF generation error:', error);
            throw new Error('Failed to generate PDF: ' + error.message);
        }
    };

    const handlePreviewPDF = () => {
        try {
            const pdfDoc = MutualFundPDFGenerator.generateFilledPDF(formData);
            pdfDoc.save(`Mutual_Fund_Preview_${Date.now()}.pdf`);
        } catch (error) {
            console.error('PDF preview error:', error);
            showModal('error', 'Error generating PDF preview: ' + error.message, 'PDF Generation Error');
        }
    };

    const convertDocumentsToBase64 = async (uploadedDocuments) => {
        const conversions = Object.entries(uploadedDocuments).map(([key, fileObj]) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve({
                        documentType: key,
                        filename: fileObj.name,
                        content: base64,
                        type: fileObj.type,
                        size: fileObj.size
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(fileObj.file);
            });
        });

        return Promise.all(conversions);
    };

    const validateFormCompletely = () => {
        const errors = [];

        // Investment Information validation
        if (!formData.fundType) errors.push('Fund type is required');
        if (!formData.investmentValue) errors.push('Investment value is required');
        if (!formData.investorType) errors.push('Investor type is required');

        // Primary Applicant validation
        if (!formData.primaryApplicant.surname) errors.push('Primary applicant surname is required');
        if (!formData.primaryApplicant.name) errors.push('Primary applicant name is required');
        if (!formData.primaryApplicant.emailAddress) errors.push('Primary applicant email is required');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.primaryApplicant.emailAddress && !emailRegex.test(formData.primaryApplicant.emailAddress)) {
            errors.push('Invalid primary applicant email format');
        }

        // Joint applicant validation (if joint account)
        if (formData.isJointAccount) {
            if (!formData.jointApplicant.surname) errors.push('Joint applicant surname is required');
            if (!formData.jointApplicant.name) errors.push('Joint applicant name is required');
        }

        // Signature validation
        if (!formData.primaryApplicant.signature) errors.push('Primary applicant signature is required');
        if (!formData.primaryApplicant.signatureDate) errors.push('Primary applicant signature date is required');

        if (formData.isJointAccount) {
            if (!formData.jointApplicant?.signature) errors.push('Joint applicant signature is required');
            if (!formData.jointApplicant?.signatureDate) errors.push('Joint applicant signature date is required');
        }

        // PEP validation
        if (!formData.isPep) errors.push('PEP declaration is required');
        if (!formData.isFinanciallyExposed) errors.push('Financial exposure declaration is required');

        // Attestations validation
        if (!formData.agreedToTerms) errors.push('Agreement to terms is required');
        if (!formData.agreedToRisks) errors.push('Agreement to risks is required');

        return {
            valid: errors.length === 0,
            errors
        };
    };

    const handleSubmit = async () => {
        const validation = validateFormCompletely();
        if (!validation.valid) {
            showModal('error',
                `Please correct the following errors:\n\n${validation.errors.map(err => `• ${err}`).join('\n')}`,
                'Validation Error'
            );
            return;
        }

        setIsSubmitting(true);

        try {
            let pdfContent;
            try {
                pdfContent = generatePDF();
            } catch (pdfError) {
                throw new Error('Failed to generate PDF: ' + pdfError.message);
            }

            let attachments = [];
            if (formData.uploadedDocuments && Object.keys(formData.uploadedDocuments).length > 0) {
                try {
                    attachments = await convertDocumentsToBase64(formData.uploadedDocuments);
                } catch (attachError) {
                    throw new Error('Failed to process document attachments: ' + attachError.message);
                }
            }

            const result = await apiUtils.retry(
                () => apiService.mutualFund.submit(
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments
                ),
                3,
                2000
            );

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit application');
            }

            showModal(
                'success',
                `Mutual fund application submitted successfully!\n\nReference: ${result.referenceId}\n\nYou will receive email confirmations with the complete application.`,
                'Application Submitted Successfully!'
            );

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    fundType: '',
                    dividendMandate: '',
                    investmentValue: '',
                    investorType: '',
                    isJointAccount: false,
                    primaryApplicant: {
                        surname: '',
                        name: '',
                        otherName: '',
                        residentialAddress: '',
                        nationality: '',
                        dateOfBirth: '',
                        occupation: '',
                        gender: '',
                        stateOfOrigin: '',
                        townCity: '',
                        mobileNumber: '',
                        emailAddress: '',
                        taxId: '',
                        idType: '',
                        idNumber: '',
                        idIssuedDate: '',
                        idExpiryDate: '',
                        bvn: '',
                        accountName: '',
                        accountNumber: '',
                        bankName: '',
                        signature: null,
                        signatureDate: ''
                    },
                    jointApplicant: {
                        surname: '',
                        name: '',
                        otherName: '',
                        residentialAddress: '',
                        nationality: '',
                        dateOfBirth: '',
                        occupation: '',
                        gender: '',
                        stateOfOrigin: '',
                        townCity: '',
                        mobileNumber: '',
                        emailAddress: '',
                        taxId: '',
                        idType: '',
                        idNumber: '',
                        idIssuedDate: '',
                        idExpiryDate: '',
                        bvn: '',
                        signature: null,
                        signatureDate: ''
                    },
                    minorInvestment: {
                        isForMinor: false,
                        surname: '',
                        name: '',
                        otherName: '',
                        residentialAddress: '',
                        nationality: '',
                        stateOfOrigin: '',
                        relationship: '',
                        mobileNumber: '',
                        dateOfBirth: '',
                        relationshipToApplicant: '',
                        emailAddress: ''
                    },
                    nextOfKin: {
                        surname: '',
                        name: '',
                        otherName: '',
                        residentialAddress: '',
                        nationality: '',
                        stateOfOrigin: '',
                        relationship: '',
                        mobileNumber: '',
                        emailAddress: ''
                    },
                    isPep: '',
                    pepDetails: '',
                    isFinanciallyExposed: '',
                    financiallyExposedDetails: '',
                    investorDomicile: '',
                    agreedToTerms: false,
                    agreedToRisks: false,
                    uploadedDocuments: {},
                    attachments: []
                });
                setSignatureMode({
                    primary: 'draw',
                    joint: 'draw'
                });
                setCurrentStep(0);
            }, 3000);

        } catch (error) {
            console.error('Submission error:', error);

            const errorDetails = apiUtils.getErrorDetails(error);
            let errorMessage = 'Failed to submit application.\n\n';

            if (error.response?.status === 400 && error.response?.data?.errors) {
                errorMessage = 'Application validation failed:\n\n';
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
        currentStep,
        isSubmitting,
        modal,
        signatureMode,
        handleInputChange,
        handleSignatureChange,
        handleSignatureModeChange,
        handleDocumentUpload,
        removeDocument,
        validateStep,
        nextStep,
        prevStep,
        handleSubmit,
        handlePreviewPDF,
        showModal,
        closeModal
    };
};