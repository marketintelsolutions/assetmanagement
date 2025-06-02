// PacamRedemptionForm.jsx
import React from 'react';
import FormHeader from './FormHeader';
import Modal from './Modal';
import PersonalInfoSection from './PersonalInfoSection';
import RedemptionDetailsSection from './RedemptionDetailsSection';
import PaymentDetailsSection from './PaymentDetailsSection';
import CertificateDetailsSection from './CertificateDetailsSection';
import SignatureSection from './SignatureSection';
import EmailCopySection from './EmailCopySection';
import ImportantNotesSection from './ImportantNotesSection';
import SubmitSection from './SubmitSection';
import { useFormLogic } from './useFormLogic';

const PacamRedemptionForm = ({
    apiKey = process.env.REACT_APP_PLUNK_API_KEY,
    fundManagerEmail = process.env.REACT_APP_SUBMISSION_EMAIL
}) => {
    const {
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
    } = useFormLogic(fundManagerEmail);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <FormHeader />

                {/* Form Content */}
                <div className="bg-white shadow-lg rounded-b-lg p-8 space-y-8">
                    {/* Personal Information */}
                    <PersonalInfoSection
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* Redemption Details */}
                    <RedemptionDetailsSection
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* Payment Details */}
                    <PaymentDetailsSection
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* Certificate Details */}
                    <CertificateDetailsSection
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* Signature Section */}
                    <SignatureSection
                        formData={formData}
                        signatureMode={signatureMode}
                        onSignatureChange={handleSignatureChange}
                        onSignatureModeChange={handleSignatureModeChange}
                    />

                    {/* Email Copy Section */}
                    <EmailCopySection
                        formData={formData}
                        onInputChange={handleInputChange}
                    />

                    {/* Important Notes */}
                    <ImportantNotesSection />

                    {/* Submit Section */}
                    <SubmitSection
                        onSubmit={handleSubmit}
                        onPreviewPDF={handlePreviewPDF}
                        isSubmitting={isSubmitting}
                        hasPrimarySignature={!!formData.primarySignature}
                    />
                </div>
            </div>

            {/* Modal for success/error messages */}
            <Modal
                isOpen={modal.isOpen}
                onClose={closeModal}
                type={modal.type}
                message={modal.message}
                title={modal.title}
            />
        </div>
    );
};

export default PacamRedemptionForm;