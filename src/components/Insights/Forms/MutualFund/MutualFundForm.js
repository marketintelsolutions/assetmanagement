// MutualFundForm.jsx
import React from 'react';
import { User, Users, FileText, CheckCircle, ArrowLeft, ArrowRight, Send, PenTool, DollarSign } from 'lucide-react';
import Modal from '../PacamRedemption/Modal';
import DocumentUploadSection from '../CorporateInvestmentForm/DocumentUploadSection';
import MutualFundSignatureSection from './MutualFundSignatureSection';
import { useMutualFundLogic } from './useMutualFundLogic';

const MutualFundForm = ({
    adminEmail = process.env.REACT_APP_SUBMISSION_EMAIL
}) => {
    const {
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
        addJointApplicant,
        removeJointApplicant,
        validateStep,
        nextStep,
        prevStep,
        handleSubmit,
        handlePreviewPDF,
        closeModal
    } = useMutualFundLogic(adminEmail);

    const fundOptions = [
        { value: 'pacam_money_market', label: 'PACAM Money Market Fund (N)' },
        { value: 'pacam_fixed_income', label: 'PACAM Fixed Income Fund (N)' },
        { value: 'pacam_balanced', label: 'PACAM Balanced Fund (N)' },
        { value: 'pacam_equity', label: 'PACAM Equity Fund (N)' },
        { value: 'pacam_eurobond', label: 'PACAM Eurobond Fund ($)' }
    ];

    const investorTypes = [
        { value: 'retail_domestic', label: 'Retail Investors (Domestic)' },
        { value: 'retail_foreign', label: 'Retail Investors (Foreign)' }
    ];

    const domicileZones = [
        { value: 'north_central', label: 'North - Central Zone' },
        { value: 'north_east', label: 'North - East Zone' },
        { value: 'north_west', label: 'North - West Zone' },
        { value: 'south_east', label: 'South - East Zone' },
        { value: 'south_south', label: 'South - South Zone' },
        { value: 'south_west', label: 'South - West Zone' },
        { value: 'diaspora', label: 'Diaspora Investors' }
    ];

    const idTypes = [
        { value: 'national_id', label: 'National ID' },
        { value: 'drivers_license', label: "Driver's License" },
        { value: 'international_passport', label: 'International Passport' },
        { value: 'voters_card', label: "Voter's Card" }
    ];

    const hearAboutOptions = [
        { value: 'referral', label: 'Referral' },
        { value: 'social_media', label: 'Social Media' },
        { value: 'google', label: 'Google' },
        { value: 'media', label: 'Media' },
        { value: 'others', label: 'Others' }
    ];

    const steps = [
        { title: 'Investment Info', icon: DollarSign },
        { title: 'Applicant Details', icon: User },
        { title: 'Joint Account', icon: Users },
        { title: 'Documents & PEP', icon: CheckCircle },
        { title: 'Signatures', icon: PenTool },
        { title: 'Review & Submit', icon: Send }
    ];

    const showExpiryDate = () => {
        return formData.primaryApplicant.idType === 'drivers_license' ||
            formData.primaryApplicant.idType === 'international_passport';
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Information</h3>

                        {/* Fund Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Select Mutual Fund *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {fundOptions.map((option) => (
                                    <label key={option.value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="fundType"
                                            value={option.value}
                                            checked={formData.fundType === option.value}
                                            onChange={(e) => handleInputChange('fundType', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Dividend Mandate */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Dividend Mandate *
                            </label>
                            <div className="flex gap-6">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="dividendMandate"
                                        value="reinvest"
                                        checked={formData.dividendMandate === 'reinvest'}
                                        onChange={(e) => handleInputChange('dividendMandate', e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">Re-invest</span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="dividendMandate"
                                        value="payout"
                                        checked={formData.dividendMandate === 'payout'}
                                        onChange={(e) => handleInputChange('dividendMandate', e.target.value)}
                                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700">Pay Out</span>
                                </label>
                            </div>
                        </div>

                        {/* Investment Value */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Investment Value
                            </label>
                            <input
                                type="text"
                                value={formData.investmentValue}
                                onChange={(e) => handleInputChange('investmentValue', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter investment amount"
                            />
                        </div>

                        {/* Investor Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Investor Type *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {investorTypes.map((type) => (
                                    <label key={type.value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="investorType"
                                            value={type.value}
                                            checked={formData.investorType === type.value}
                                            onChange={(e) => handleInputChange('investorType', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{type.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* How did you hear about us */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                How did you hear about PAC Asset Management? *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {hearAboutOptions.map((option) => (
                                    <label key={option.value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="hearAbout"
                                            value={option.value}
                                            checked={formData.hearAbout === option.value}
                                            onChange={(e) => handleInputChange('hearAbout', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Additional details for referral or others */}
                        {(formData.hearAbout === 'referral' || formData.hearAbout === 'others') && (
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Please provide additional details *
                                </label>
                                <input
                                    type="text"
                                    value={formData.hearAboutDetails}
                                    onChange={(e) => handleInputChange('hearAboutDetails', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder={formData.hearAbout === 'referral' ? "Who referred you?" : "Please specify"}
                                    required
                                />
                            </div>
                        )}
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Individual Applicant Details</h3>

                        {/* Name fields */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Surname *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.surname}
                                    onChange={(e) => handleInputChange('surname', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter surname"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.name}
                                    onChange={(e) => handleInputChange('name', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Other Name *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.otherName}
                                    onChange={(e) => handleInputChange('otherName', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter other name"
                                    required
                                />
                            </div>
                        </div>

                        {/* Residential Address */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Residential Address *</label>
                            <textarea
                                value={formData.primaryApplicant.residentialAddress}
                                onChange={(e) => handleInputChange('residentialAddress', e.target.value, 'primaryApplicant')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter residential address"
                                rows="3"
                                required
                            />
                        </div>

                        {/* Personal Details Row 1 */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.nationality}
                                    onChange={(e) => handleInputChange('nationality', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter nationality"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                                <input
                                    type="date"
                                    value={formData.primaryApplicant.dateOfBirth}
                                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Occupation</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.occupation}
                                    onChange={(e) => handleInputChange('occupation', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter occupation"
                                />
                            </div>
                        </div>

                        {/* Personal Details Row 2 */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Gender *</label>
                                <select
                                    value={formData.primaryApplicant.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.stateOfOrigin}
                                    onChange={(e) => handleInputChange('stateOfOrigin', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter state"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Town/City *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.townCity}
                                    onChange={(e) => handleInputChange('townCity', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter town/city"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number *</label>
                                <input
                                    type="tel"
                                    value={formData.primaryApplicant.mobileNumber}
                                    onChange={(e) => handleInputChange('mobileNumber', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter mobile number"
                                    required
                                />
                            </div>
                        </div>

                        {/* Contact & Identification */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    value={formData.primaryApplicant.emailAddress}
                                    onChange={(e) => handleInputChange('emailAddress', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Identification Number (TIN) *</label>
                                <input
                                    type="text"
                                    value={formData.primaryApplicant.taxId}
                                    onChange={(e) => handleInputChange('taxId', e.target.value, 'primaryApplicant')}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter TIN"
                                    required
                                />
                            </div>
                        </div>

                        {/* ID Information */}
                        <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Means of Identification</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type *</label>
                                    <select
                                        value={formData.primaryApplicant.idType}
                                        onChange={(e) => handleInputChange('idType', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Select ID Type</option>
                                        {idTypes.map(type => (
                                            <option key={type.value} value={type.value}>{type.label}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number *</label>
                                    <input
                                        type="text"
                                        value={formData.primaryApplicant.idNumber}
                                        onChange={(e) => handleInputChange('idNumber', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter ID number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">ID Issued Date *</label>
                                    <input
                                        type="date"
                                        value={formData.primaryApplicant.idIssuedDate}
                                        onChange={(e) => handleInputChange('idIssuedDate', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                {showExpiryDate() && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">ID Expiry Date *</label>
                                        <input
                                            type="date"
                                            value={formData.primaryApplicant.idExpiryDate}
                                            onChange={(e) => handleInputChange('idExpiryDate', e.target.value, 'primaryApplicant')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            required
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BVN */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">BVN *</label>
                            <input
                                type="text"
                                value={formData.primaryApplicant.bvn}
                                onChange={(e) => handleInputChange('bvn', e.target.value, 'primaryApplicant')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter BVN"
                                required
                            />
                        </div>

                        {/* Bank Details */}
                        <div className="border-t border-gray-200 pt-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Name *</label>
                                    <input
                                        type="text"
                                        value={formData.primaryApplicant.accountName}
                                        onChange={(e) => handleInputChange('accountName', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter account name"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                                    <input
                                        type="text"
                                        value={formData.primaryApplicant.accountNumber}
                                        onChange={(e) => handleInputChange('accountNumber', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter account number"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name *</label>
                                    <input
                                        type="text"
                                        value={formData.primaryApplicant.bankName}
                                        onChange={(e) => handleInputChange('bankName', e.target.value, 'primaryApplicant')}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter bank name"
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-800">Joint Account (Optional)</h3>
                            {!formData.isJointAccount && (
                                <button
                                    type="button"
                                    onClick={() => handleInputChange('isJointAccount', true)}
                                    disabled={isSubmitting}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Add Joint Applicant
                                </button>
                            )}
                        </div>

                        {!formData.isJointAccount ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                <p className="text-gray-600">This will be an individual account. Click "Add Joint Applicant" to make it a joint account.</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold text-gray-700">Joint Applicant Details</h4>
                                    <button
                                        type="button"
                                        onClick={() => handleInputChange('isJointAccount', false)}
                                        disabled={isSubmitting}
                                        className="text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                                    >
                                        Remove Joint Applicant
                                    </button>
                                </div>

                                {/* Joint Applicant form fields - similar to primary applicant */}
                                <div className="border border-gray-200 rounded-lg p-6 space-y-4">
                                    {/* Name fields */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Other Name</label>
                                            <input
                                                type="text"
                                                value={formData.jointApplicant?.otherName || ''}
                                                onChange={(e) => handleInputChange('otherName', e.target.value, 'jointApplicant')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter other name"
                                            />
                                        </div>
                                    </div>

                                    {/* Continue with similar fields as primary applicant but condensed for space */}
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={formData.jointApplicant?.emailAddress || ''}
                                            onChange={(e) => handleInputChange('emailAddress', e.target.value, 'jointApplicant')}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter email address"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                            <input
                                                type="tel"
                                                value={formData.jointApplicant?.mobileNumber || ''}
                                                onChange={(e) => handleInputChange('mobileNumber', e.target.value, 'jointApplicant')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter mobile number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">BVN</label>
                                            <input
                                                type="text"
                                                value={formData.jointApplicant?.bvn || ''}
                                                onChange={(e) => handleInputChange('bvn', e.target.value, 'jointApplicant')}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter BVN"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Documents & Additional Information</h3>

                        {/* Document Upload Section */}
                        <DocumentUploadSection
                            formData={formData}
                            onDocumentUpload={handleDocumentUpload}
                            onRemoveDocument={removeDocument}
                            documentContext="mutualFund"
                        />

                        {/* PEP Information */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">PEP/FEP Declaration</h4>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Are you currently / ever been a politically exposed person (PEP) or a relative/close associate of a PEP? *
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="isPep"
                                                value="yes"
                                                checked={formData.isPep === 'yes'}
                                                onChange={(e) => handleInputChange('isPep', e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="isPep"
                                                value="no"
                                                checked={formData.isPep === 'no'}
                                                onChange={(e) => handleInputChange('isPep', e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Have you currently / ever been a financially exposed person? *
                                    </label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="isFinanciallyExposed"
                                                value="yes"
                                                checked={formData.isFinanciallyExposed === 'yes'}
                                                onChange={(e) => handleInputChange('isFinanciallyExposed', e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Yes</span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="isFinanciallyExposed"
                                                value="no"
                                                checked={formData.isFinanciallyExposed === 'no'}
                                                onChange={(e) => handleInputChange('isFinanciallyExposed', e.target.value)}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">No</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Investor Domicile */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Investor Area of Domicile *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {domicileZones.map((zone) => (
                                    <label key={zone.value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="investorDomicile"
                                            value={zone.value}
                                            checked={formData.investorDomicile === zone.value}
                                            onChange={(e) => handleInputChange('investorDomicile', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{zone.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Signatures & Date</h3>
                        <MutualFundSignatureSection
                            formData={formData}
                            signatureMode={signatureMode}
                            onSignatureChange={handleSignatureChange}
                            onSignatureModeChange={handleSignatureModeChange}
                            handleInputChange={handleInputChange}
                        />
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Review & Submit</h3>

                        {/* Application Summary */}
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Application Summary</h4>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="font-semibold text-gray-700">Fund Type:</span>
                                    <span className="ml-2">{fundOptions.find(opt => opt.value === formData.fundType)?.label || 'Not selected'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Investment Value:</span>
                                    <span className="ml-2">{formData.investmentValue || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Account Type:</span>
                                    <span className="ml-2">{formData.isJointAccount ? 'Joint Account' : 'Individual Account'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Primary Applicant:</span>
                                    <span className="ml-2">{formData.primaryApplicant.surname} {formData.primaryApplicant.name}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Email:</span>
                                    <span className="ml-2">{formData.primaryApplicant.emailAddress || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Documents Uploaded:</span>
                                    <span className="ml-2">{Object.keys(formData.uploadedDocuments || {}).length} files</span>
                                </div>
                            </div>
                        </div>

                        {/* Attestations */}
                        <div className="space-y-4">
                            <h4 className="text-lg font-semibold text-gray-800">Attestations</h4>

                            <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="agreedToTerms"
                                    checked={formData.agreedToTerms}
                                    onChange={(e) => handleInputChange('agreedToTerms', e.target.checked)}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agreedToTerms" className="text-sm text-gray-700">
                                    <span className="font-semibold">On the first investment, I/We agree that if these units are redeemed within 30, 90 and 180 days of the date of purchase, the fund manager shall deduct a handling charge equivalent to 20% of the redemption proceeds.</span>
                                </label>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <input
                                    type="checkbox"
                                    id="agreedToRisks"
                                    checked={formData.agreedToRisks}
                                    onChange={(e) => handleInputChange('agreedToRisks', e.target.checked)}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agreedToRisks" className="text-sm text-gray-700">
                                    <span className="font-semibold">I/We understand that prices fluctuate and losses in the value of my/our investment may occur and the past performance is not necessarily an indication of future performance.</span>
                                </label>
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-blue-600">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md">
                            <h1 className="text-xl font-bold">PAC Asset Management</h1>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">MUTUAL FUND APPLICATION</h2>
                    <p className="text-center text-gray-600 mt-2">Individual/Joint Account</p>
                </div>

                {/* Step Indicator */}
                <div className="bg-white border-b border-gray-200 px-2 py-4">
                    <div className="flex items-center justify-between ">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <div key={index} className="flex items-center">
                                    <div className={`flex items-center justify-center w-8 h-8 rounded-full ${isActive ? 'bg-blue-600 text-white' :
                                        isCompleted ? 'bg-green-600 text-white' :
                                            'bg-gray-300 text-gray-600'
                                        }`}>
                                        <IconComponent size={17} />
                                    </div>
                                    <div className="ml-3 hidden sm:block">
                                        <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden sm:block w-12 h-0.5 bg-gray-300 mx-4"></div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Form Content */}
                <div className="bg-white shadow-lg rounded-b-lg p-8">
                    {/* Step Content */}
                    {renderStepContent()}

                    {/* Navigation Buttons */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                        <button
                            onClick={prevStep}
                            disabled={currentStep === 0 || isSubmitting}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Previous
                        </button>

                        <div className="flex gap-4">
                            <button
                                onClick={handlePreviewPDF}
                                disabled={isSubmitting}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <FileText size={20} />
                                Preview PDF
                            </button>

                            {currentStep < steps.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={!validateStep(currentStep) || isSubmitting}
                                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    Next
                                    <ArrowRight size={20} />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || !validateStep(5)}
                                    className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Submitting...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            Submit Application
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </div>
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

export default MutualFundForm;