// FixedIncomeFundRedemptionForm.jsx - Modular structure with PDF generation
import React from 'react';
import { useFixedIncomeFormLogic } from './useFixedIncomeFormLogic';
import FixedIncomeFormHeader from './FixedIncomeFormHeader';
import PersonalInfoSection from './PersonalInfoSection';
import RedemptionDetailsSection from '../PacamRedemption/RedemptionDetailsSection';
import PaymentDetailsSection from '../PacamRedemption/PaymentDetailsSection';
import CertificateDetailsSection from '../PacamRedemption/CertificateDetailsSection';
import SignatureSection from '../PacamRedemption/SignatureSection';
import EmailCopySection from '../PacamRedemption/EmailCopySection';
import ImportantNotesSection from './ImportantNotesSection';
import SubmitSection from './SubmitSection';
import Modal from '../PacamRedemption/Modal';

const FixedIncomeFundRedemptionForm = ({
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
    } = useFixedIncomeFormLogic(fundManagerEmail);

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-violet-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <FixedIncomeFormHeader />

                <div className="bg-white shadow-lg rounded-b-lg p-8 space-y-8">
                    <PersonalInfoSection formData={formData} onInputChange={handleInputChange} />
                    <RedemptionDetailsSection formData={formData} onInputChange={handleInputChange} />
                    <PaymentDetailsSection formData={formData} onInputChange={handleInputChange} />
                    <CertificateDetailsSection formData={formData} onInputChange={handleInputChange} />
                    <SignatureSection
                        formData={formData}
                        signatureMode={signatureMode}
                        onSignatureChange={handleSignatureChange}
                        onSignatureModeChange={handleSignatureModeChange}
                    />
                    <EmailCopySection formData={formData} onInputChange={handleInputChange} />
                    <ImportantNotesSection />
                    <SubmitSection
                        onSubmit={handleSubmit}
                        onPreviewPDF={handlePreviewPDF}
                        isSubmitting={isSubmitting}
                        hasPrimarySignature={!!formData.primarySignature}
                    />
                </div>
            </div>

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

export default FixedIncomeFundRedemptionForm;