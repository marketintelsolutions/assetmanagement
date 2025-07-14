// useCorporateInvestmentLogic.js - Updated with Signature Support and new validation rules
import { useState } from 'react';
import { CorporateInvestmentPDFGenerator } from './CorporateInvestmentPDFGenerator';
import { apiService, apiUtils } from '../../../../services/apiClient';

export const useCorporateInvestmentLogic = (adminEmail) => {
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
        investmentType: '',
        investmentValue: '',
        tenor: '',
        otherTenor: '',
        investorType: '',

        // Company Information
        date: '',
        cacNumber: '',
        typeOfBusiness: '',
        companyName: '',
        registeredAddress: '',
        country: '',
        stateOfOrigin: '',
        townCity: '',
        emailAddress: '',
        phoneNumber: '',
        taxId: '',
        companySignatureDate: '',
        companySignature: null,

        // Signatories (up to 3)
        signatories: [
            {
                surname: '',
                name: '',
                otherName: '',
                residentialAddress: '',
                nationality: '',
                stateOfOrigin: '',
                dateOfBirth: '',
                gender: '',
                employmentDetails: '',
                townCity: '',
                bvn: '',
                emailAddress: '',
                mobileNumber: '',
                taxId: '',
                signatureDate: '',
                signature: null,
                idType: '',
                idNumber: '',
                idIssuedDate: '',
                idExpiryDate: ''
            }
        ],

        // PEP Information
        isPep: '',
        pepDetails: '',
        isFinanciallyExposed: '',
        financiallyExposedDetails: '',

        // Bank Details
        accountName: '',
        accountNumber: '',
        bankName: '',

        // Investor Domicile
        investorDomicile: '',

        // Attestations
        agreedToTerms: false,
        agreedToRisks: false,

        // Copy email
        userEmail: '',

        // File attachments - Initialize as empty array
        attachments: [],

        // Document uploads (individual documents)
        uploadedDocuments: {}
    });

    const [signatureMode, setSignatureMode] = useState({
        company: 'draw',
        signatories: ['draw', 'draw', 'draw'] // For up to 3 signatories
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

    const handleInputChange = (field, value, signatoryIndex = null) => {
        if (signatoryIndex !== null) {
            setFormData(prev => ({
                ...prev,
                signatories: prev.signatories.map((sig, index) =>
                    index === signatoryIndex ? { ...sig, [field]: value } : sig
                )
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleSignatureChange = (type, signatureData, index = null) => {
        if (type === 'companySignature') {
            setFormData(prev => ({ ...prev, companySignature: signatureData }));
        } else if (type === 'companySignatureDate') {
            setFormData(prev => ({ ...prev, companySignatureDate: signatureData }));
        } else if (type === 'signatorySignature' && index !== null) {
            setFormData(prev => ({
                ...prev,
                signatories: prev.signatories.map((sig, i) =>
                    i === index ? { ...sig, signature: signatureData } : sig
                )
            }));
        } else if (type === 'signatorySignatureDate' && index !== null) {
            setFormData(prev => ({
                ...prev,
                signatories: prev.signatories.map((sig, i) =>
                    i === index ? { ...sig, signatureDate: signatureData } : sig
                )
            }));
        }
    };

    const handleSignatureModeChange = (type, mode, index = null) => {
        if (type === 'company') {
            setSignatureMode(prev => ({ ...prev, company: mode }));
        } else if (type === 'signatory' && index !== null) {
            setSignatureMode(prev => ({
                ...prev,
                signatories: prev.signatories.map((sigMode, i) =>
                    i === index ? mode : sigMode
                )
            }));
        }
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

    const handleFileUpload = (files) => {
        // Legacy support for general file upload
        const newAttachments = Array.from(files).map(file => ({
            file,
            name: file.name,
            size: file.size,
            type: file.type
        }));

        setFormData(prev => ({
            ...prev,
            attachments: [...(prev.attachments || []), ...newAttachments]
        }));
    };

    const removeAttachment = (index) => {
        setFormData(prev => ({
            ...prev,
            attachments: (prev.attachments || []).filter((_, i) => i !== index)
        }));
    };

    const addSignatory = () => {
        if (formData.signatories.length < 3) {
            setFormData(prev => ({
                ...prev,
                signatories: [...prev.signatories, {
                    surname: '',
                    name: '',
                    otherName: '',
                    residentialAddress: '',
                    nationality: '',
                    stateOfOrigin: '',
                    dateOfBirth: '',
                    gender: '',
                    employmentDetails: '',
                    townCity: '',
                    bvn: '',
                    emailAddress: '',
                    mobileNumber: '',
                    taxId: '',
                    signatureDate: '',
                    signature: null,
                    idType: '',
                    idNumber: '',
                    idIssuedDate: '',
                    idExpiryDate: ''
                }]
            }));

            // Add signature mode for new signatory
            setSignatureMode(prev => ({
                ...prev,
                signatories: [...prev.signatories, 'draw']
            }));
        }
    };

    const removeSignatory = (index) => {
        if (formData.signatories.length > 1) {
            setFormData(prev => ({
                ...prev,
                signatories: prev.signatories.filter((_, i) => i !== index)
            }));

            // Remove signature mode for removed signatory
            setSignatureMode(prev => ({
                ...prev,
                signatories: prev.signatories.filter((_, i) => i !== index)
            }));
        }
    };

    const validateStep = (step) => {
        switch (step) {
            case 0: // Investment Info - Updated validation
                // Investment Type is required
                if (!formData.investmentType) return false;

                // Tenor is required - either from predefined options or custom
                if (!formData.tenor && !formData.otherTenor) return false;

                // Investor Type is required
                if (!formData.investorType) return false;

                // Investment Value is optional, so we don't check for it
                return true;

            case 1: // Company Details - All fields required
                return formData.companyName &&
                    formData.emailAddress &&
                    formData.cacNumber &&
                    formData.date &&
                    formData.typeOfBusiness &&
                    formData.registeredAddress &&
                    formData.country &&
                    formData.stateOfOrigin &&
                    formData.townCity &&
                    formData.phoneNumber &&
                    formData.taxId;

            case 2: // Signatories - All fields required
                return formData.signatories.every(signatory =>
                    signatory.surname &&
                    signatory.name &&
                    signatory.otherName &&
                    signatory.residentialAddress &&
                    signatory.nationality &&
                    signatory.stateOfOrigin &&
                    signatory.dateOfBirth &&
                    signatory.gender &&
                    signatory.employmentDetails &&
                    signatory.townCity &&
                    signatory.bvn &&
                    signatory.emailAddress &&
                    signatory.mobileNumber &&
                    signatory.taxId &&
                    signatory.idType &&
                    signatory.idNumber &&
                    signatory.idIssuedDate &&
                    // ID Expiry Date only required for driver's license and passport
                    (signatory.idType === 'drivers_license' || signatory.idType === 'international_passport'
                        ? signatory.idExpiryDate
                        : true)
                );

            case 3: // Documents & PEP Info - All fields required
                // PEP declaration required
                if (!formData.isPep) return false;

                // If PEP is 'yes', details are required
                if (formData.isPep === 'yes' && !formData.pepDetails) return false;

                // Financially exposed declaration required
                if (!formData.isFinanciallyExposed) return false;

                // If financially exposed is 'yes', details are required
                if (formData.isFinanciallyExposed === 'yes' && !formData.financiallyExposedDetails) return false;

                // Bank details required
                if (!formData.accountName || !formData.accountNumber || !formData.bankName) return false;

                // Investor domicile required
                if (!formData.investorDomicile) return false;

                // User email required
                if (!formData.userEmail) return false;

                return true;

            case 4: // Signatures - Required signatures and dates
                return formData.companySignature &&
                    formData.companySignatureDate &&
                    formData.signatories[0]?.signature &&
                    formData.signatories[0]?.signatureDate;

            case 5: // Review - Attestations required
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
            const pdfDoc = CorporateInvestmentPDFGenerator.generateFilledPDF(formData);
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
            const pdfDoc = CorporateInvestmentPDFGenerator.generateFilledPDF(formData);
            pdfDoc.save(`Corporate_Investment_Preview_${Date.now()}.pdf`);
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
                    const base64 = reader.result.split(',')[1]; // Remove data:mime;base64, prefix
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
        if (!formData.investmentType) errors.push('Investment type is required');
        if (!formData.tenor && !formData.otherTenor) errors.push('Tenor is required');
        if (!formData.investorType) errors.push('Investor type is required');
        // Investment value is optional

        // Company Information validation - all required
        if (!formData.companyName) errors.push('Company name is required');
        if (!formData.emailAddress) errors.push('Company email address is required');
        if (!formData.cacNumber) errors.push('CAC/RC number is required');
        if (!formData.date) errors.push('Date is required');
        if (!formData.typeOfBusiness) errors.push('Type of business is required');
        if (!formData.registeredAddress) errors.push('Registered address is required');
        if (!formData.country) errors.push('Country is required');
        if (!formData.stateOfOrigin) errors.push('State of origin is required');
        if (!formData.townCity) errors.push('Town/City is required');
        if (!formData.phoneNumber) errors.push('Phone number is required');
        if (!formData.taxId) errors.push('Tax ID is required');

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.emailAddress && !emailRegex.test(formData.emailAddress)) {
            errors.push('Invalid company email format');
        }
        if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
            errors.push('Invalid user email format');
        }

        // Signatory validation - all fields required
        if (!formData.signatories || formData.signatories.length === 0) {
            errors.push('At least one signatory is required');
        } else {
            formData.signatories.forEach((signatory, index) => {
                if (!signatory.surname) errors.push(`Signatory ${index + 1}: Surname is required`);
                if (!signatory.name) errors.push(`Signatory ${index + 1}: First name is required`);
                if (!signatory.otherName) errors.push(`Signatory ${index + 1}: Other name is required`);
                if (!signatory.residentialAddress) errors.push(`Signatory ${index + 1}: Residential address is required`);
                if (!signatory.nationality) errors.push(`Signatory ${index + 1}: Nationality is required`);
                if (!signatory.stateOfOrigin) errors.push(`Signatory ${index + 1}: State of origin is required`);
                if (!signatory.dateOfBirth) errors.push(`Signatory ${index + 1}: Date of birth is required`);
                if (!signatory.gender) errors.push(`Signatory ${index + 1}: Gender is required`);
                if (!signatory.employmentDetails) errors.push(`Signatory ${index + 1}: Employment details is required`);
                if (!signatory.townCity) errors.push(`Signatory ${index + 1}: Town/City is required`);
                if (!signatory.bvn) errors.push(`Signatory ${index + 1}: BVN is required`);
                if (!signatory.emailAddress) errors.push(`Signatory ${index + 1}: Email address is required`);
                if (!signatory.mobileNumber) errors.push(`Signatory ${index + 1}: Mobile number is required`);
                if (!signatory.taxId) errors.push(`Signatory ${index + 1}: Tax ID is required`);
                if (!signatory.idType) errors.push(`Signatory ${index + 1}: ID type is required`);
                if (!signatory.idNumber) errors.push(`Signatory ${index + 1}: ID number is required`);
                if (!signatory.idIssuedDate) errors.push(`Signatory ${index + 1}: ID issued date is required`);

                // ID Expiry Date only required for driver's license and passport
                if ((signatory.idType === 'drivers_license' || signatory.idType === 'international_passport') && !signatory.idExpiryDate) {
                    errors.push(`Signatory ${index + 1}: ID expiry date is required for ${signatory.idType}`);
                }

                if (index === 0) {
                    if (!signatory.signature) errors.push(`Signatory ${index + 1}: Signature is required`);
                    if (!signatory.signatureDate) errors.push(`Signatory ${index + 1}: Signature date is required`);
                }
            });
        }

        // Company signature validation
        if (!formData.companySignature) errors.push('Company signature is required');
        if (!formData.companySignatureDate) errors.push('Company signature date is required');

        // PEP validation - all required
        if (!formData.isPep) errors.push('PEP declaration is required');
        if (formData.isPep === 'yes' && !formData.pepDetails) errors.push('PEP details are required when PEP is Yes');
        if (!formData.isFinanciallyExposed) errors.push('Financial exposure declaration is required');
        if (formData.isFinanciallyExposed === 'yes' && !formData.financiallyExposedDetails) errors.push('Financial exposure details are required when financially exposed is Yes');

        // Bank details validation - all required
        if (!formData.accountName) errors.push('Account name is required');
        if (!formData.accountNumber) errors.push('Account number is required');
        if (!formData.bankName) errors.push('Bank name is required');

        // Investor domicile validation - required
        if (!formData.investorDomicile) errors.push('Investor domicile is required');

        // User email validation - required
        if (!formData.userEmail) errors.push('User email is required');

        // Attestations validation
        if (!formData.agreedToTerms) errors.push('Agreement to terms is required');
        if (!formData.agreedToRisks) errors.push('Agreement to risks is required');

        return {
            valid: errors.length === 0,
            errors
        };
    };

    const handleSubmit = async () => {
        // Complete form validation
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
            // Generate PDF
            let pdfContent;
            try {
                pdfContent = generatePDF();
            } catch (pdfError) {
                throw new Error('Failed to generate PDF: ' + pdfError.message);
            }

            // Convert uploaded documents to base64
            let attachments = [];
            if (formData.uploadedDocuments && Object.keys(formData.uploadedDocuments).length > 0) {
                try {
                    attachments = await convertDocumentsToBase64(formData.uploadedDocuments);
                } catch (attachError) {
                    throw new Error('Failed to process document attachments: ' + attachError.message);
                }
            }

            // Add legacy file attachments if any
            if (formData.attachments && formData.attachments.length > 0) {
                try {
                    const legacyAttachments = await convertFilesToBase64(formData.attachments);
                    attachments = [...attachments, ...legacyAttachments];
                } catch (attachError) {
                    throw new Error('Failed to process file attachments: ' + attachError.message);
                }
            }

            // Submit to backend
            const result = await apiUtils.retry(
                () => apiService.corporateInvestment.submit(
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments
                ),
                3, // 3 retries
                2000 // 2 second delay
            );

            if (!result.success) {
                throw new Error(result.message || 'Failed to submit application');
            }

            showModal(
                'success',
                `Corporate investment application submitted successfully!\n\nReference: ${result.referenceId}\n\nYou and the fund manager will receive emails with the complete application and attachments.`,
                'Application Submitted Successfully!'
            );

            // Reset form after successful submission
            setTimeout(() => {
                setFormData({
                    investmentType: '',
                    investmentValue: '',
                    tenor: '',
                    otherTenor: '',
                    investorType: '',
                    date: '',
                    cacNumber: '',
                    typeOfBusiness: '',
                    companyName: '',
                    registeredAddress: '',
                    country: '',
                    stateOfOrigin: '',
                    townCity: '',
                    emailAddress: '',
                    phoneNumber: '',
                    taxId: '',
                    companySignatureDate: '',
                    companySignature: null,
                    signatories: [{
                        surname: '',
                        name: '',
                        otherName: '',
                        residentialAddress: '',
                        nationality: '',
                        stateOfOrigin: '',
                        dateOfBirth: '',
                        gender: '',
                        employmentDetails: '',
                        townCity: '',
                        bvn: '',
                        emailAddress: '',
                        mobileNumber: '',
                        taxId: '',
                        signatureDate: '',
                        signature: null,
                        idType: '',
                        idNumber: '',
                        idIssuedDate: '',
                        idExpiryDate: ''
                    }],
                    isPep: '',
                    pepDetails: '',
                    isFinanciallyExposed: '',
                    financiallyExposedDetails: '',
                    accountName: '',
                    accountNumber: '',
                    bankName: '',
                    investorDomicile: '',
                    agreedToTerms: false,
                    agreedToRisks: false,
                    userEmail: '',
                    attachments: [], // Initialize as empty array
                    uploadedDocuments: {}
                });
                setSignatureMode({
                    company: 'draw',
                    signatories: ['draw', 'draw', 'draw']
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

    const validateFormWithBackend = async () => {
        try {
            const result = await apiService.corporateInvestment.validate(formData);
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

    const checkSubmissionStatus = async (companyName, referenceId = null) => {
        try {
            const status = await apiService.corporateInvestment.getStatus(companyName, referenceId);
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

    // Add missing convertFilesToBase64 function for legacy support
    const convertFilesToBase64 = async (files) => {
        const conversions = files.map(fileObj => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1]; // Remove data:mime;base64, prefix
                    resolve({
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
        handleFileUpload,
        removeAttachment,
        addSignatory,
        removeSignatory,
        validateStep,
        nextStep,
        prevStep,
        handleSubmit,
        handlePreviewPDF,
        validateFormWithBackend,
        checkSubmissionStatus,
        testEmailConfiguration,
        showModal,
        closeModal
    };
};