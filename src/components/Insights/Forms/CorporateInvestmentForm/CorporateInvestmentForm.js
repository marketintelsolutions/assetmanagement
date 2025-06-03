// CorporateInvestmentForm.jsx - Enhanced with Signatures and Document Uploads
import React from 'react';
import { Building, Users, FileText, CheckCircle, ArrowLeft, ArrowRight, Send, PenTool } from 'lucide-react';
import Modal from '../PacamRedemption/Modal';
import DocumentUploadSection from './DocumentUploadSection';
import CorporateSignatureSection from './CorporateSignatureSection';
import { useCorporateInvestmentLogic } from './useCorporateInvestmentLogic';

const CorporateInvestmentForm = ({
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
        addSignatory,
        removeSignatory,
        validateStep,
        nextStep,
        prevStep,
        handleSubmit,
        handlePreviewPDF,
        closeModal
    } = useCorporateInvestmentLogic(adminEmail);

    const investmentOptions = [
        { value: 'pacam_high_yield', label: 'PACAM High Yield Note' },
        { value: 'pacam_fixed_income', label: 'PACAM Fixed Income Note' },
        { value: 'treasury_bill', label: 'Treasury Bill' },
        { value: 'others', label: 'Others' }
    ];

    const tenorOptions = [
        { value: '30', label: '30 Days' },
        { value: '60', label: '60 Days' },
        { value: '90', label: '90 Days' },
        { value: '180', label: '180 Days' },
        { value: '365', label: '365 Days' }
    ];

    const investorTypes = [
        { value: 'retail_domestic', label: 'Retail Investors (Domestic)' },
        { value: 'retail_foreign', label: 'Retail Investors (Foreign)' },
        { value: 'institutional_domestic', label: 'Institutional Investors (Domestic)' },
        { value: 'institutional_foreign', label: 'Institutional Investors (Foreign)' }
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

    const steps = [
        { title: 'Investment Info', icon: FileText },
        { title: 'Company Details', icon: Building },
        { title: 'Signatories', icon: Users },
        { title: 'Documents & PEP', icon: CheckCircle },
        { title: 'Signatures', icon: PenTool },
        { title: 'Review & Submit', icon: Send }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Investment Information</h3>

                        {/* Investment Type */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Select Investment Type *
                            </label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {investmentOptions.map((option) => (
                                    <label key={option.value} className="flex items-center p-3 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="investmentType"
                                            value={option.value}
                                            checked={formData.investmentType === option.value}
                                            onChange={(e) => handleInputChange('investmentType', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Tenor */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Tenor (Days)
                            </label>
                            <div className="grid grid-cols-5 gap-3 mb-3">
                                {tenorOptions.map((option) => (
                                    <label key={option.value} className="flex items-center p-2 border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="tenor"
                                            value={option.value}
                                            checked={formData.tenor === option.value}
                                            onChange={(e) => handleInputChange('tenor', e.target.value)}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <span className="ml-2 text-sm font-medium text-gray-700">{option.label}</span>
                                    </label>
                                ))}
                            </div>
                            <input
                                type="text"
                                placeholder="Other tenor (specify days)"
                                value={formData.otherTenor}
                                onChange={(e) => handleInputChange('otherTenor', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Investment Value */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Investment Value *
                            </label>
                            <input
                                type="text"
                                value={formData.investmentValue}
                                onChange={(e) => handleInputChange('investmentValue', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter investment amount"
                                required
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
                    </div>
                );

            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Company Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                                <input
                                    type="date"
                                    value={formData.date}
                                    onChange={(e) => handleInputChange('date', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">CAC/RC Number *</label>
                                <input
                                    type="text"
                                    value={formData.cacNumber}
                                    onChange={(e) => handleInputChange('cacNumber', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter CAC/RC number"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Type of Business</label>
                                <input
                                    type="text"
                                    value={formData.typeOfBusiness}
                                    onChange={(e) => handleInputChange('typeOfBusiness', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter business type"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name *</label>
                            <input
                                type="text"
                                value={formData.companyName}
                                onChange={(e) => handleInputChange('companyName', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter company name"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Registered Address</label>
                            <textarea
                                value={formData.registeredAddress}
                                onChange={(e) => handleInputChange('registeredAddress', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter registered address"
                                rows="3"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Country</label>
                                <input
                                    type="text"
                                    value={formData.country}
                                    onChange={(e) => handleInputChange('country', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter country"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin</label>
                                <input
                                    type="text"
                                    value={formData.stateOfOrigin}
                                    onChange={(e) => handleInputChange('stateOfOrigin', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter state"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Town/City</label>
                                <input
                                    type="text"
                                    value={formData.townCity}
                                    onChange={(e) => handleInputChange('townCity', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter town/city"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                <input
                                    type="email"
                                    value={formData.emailAddress}
                                    onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter email address"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Office Line / Mobile Number</label>
                                <input
                                    type="tel"
                                    value={formData.phoneNumber}
                                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Identification Number (TIN)</label>
                            <input
                                type="text"
                                value={formData.taxId}
                                onChange={(e) => handleInputChange('taxId', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter TIN"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-gray-800">Account Signatories</h3>
                            {formData.signatories.length < 3 && (
                                <button
                                    type="button"
                                    onClick={addSignatory}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                >
                                    Add Signatory
                                </button>
                            )}
                        </div>

                        {formData.signatories.map((signatory, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-semibold text-gray-700">Signatory {index + 1}</h4>
                                    {formData.signatories.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => removeSignatory(index)}
                                            className="text-red-600 hover:text-red-800 text-sm"
                                        >
                                            Remove
                                        </button>
                                    )}
                                </div>

                                {/* Name fields */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Surname *</label>
                                        <input
                                            type="text"
                                            value={signatory.surname}
                                            onChange={(e) => handleInputChange('surname', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter surname"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                                        <input
                                            type="text"
                                            value={signatory.name}
                                            onChange={(e) => handleInputChange('name', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Other Name</label>
                                        <input
                                            type="text"
                                            value={signatory.otherName}
                                            onChange={(e) => handleInputChange('otherName', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter other name"
                                        />
                                    </div>
                                </div>

                                {/* Address */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Residential / Mailing Address</label>
                                    <textarea
                                        value={signatory.residentialAddress}
                                        onChange={(e) => handleInputChange('residentialAddress', e.target.value, index)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter address"
                                        rows="2"
                                    />
                                </div>

                                {/* Personal Details */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nationality</label>
                                        <input
                                            type="text"
                                            value={signatory.nationality}
                                            onChange={(e) => handleInputChange('nationality', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter nationality"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">State of Origin</label>
                                        <input
                                            type="text"
                                            value={signatory.stateOfOrigin}
                                            onChange={(e) => handleInputChange('stateOfOrigin', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter state"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth</label>
                                        <input
                                            type="date"
                                            value={signatory.dateOfBirth}
                                            onChange={(e) => handleInputChange('dateOfBirth', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>
                                </div>

                                {/* Gender and Employment */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                                        <select
                                            value={signatory.gender}
                                            onChange={(e) => handleInputChange('gender', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Employment Details</label>
                                        <input
                                            type="text"
                                            value={signatory.employmentDetails}
                                            onChange={(e) => handleInputChange('employmentDetails', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter employment details"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Town/City</label>
                                        <input
                                            type="text"
                                            value={signatory.townCity}
                                            onChange={(e) => handleInputChange('townCity', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter town/city"
                                        />
                                    </div>
                                </div>

                                {/* Contact and ID */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">BVN</label>
                                        <input
                                            type="text"
                                            value={signatory.bvn}
                                            onChange={(e) => handleInputChange('bvn', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter BVN"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                        <input
                                            type="email"
                                            value={signatory.emailAddress}
                                            onChange={(e) => handleInputChange('emailAddress', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter email"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Mobile Number</label>
                                        <input
                                            type="tel"
                                            value={signatory.mobileNumber}
                                            onChange={(e) => handleInputChange('mobileNumber', e.target.value, index)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tax Identification Number (TIN)</label>
                                    <input
                                        type="text"
                                        value={signatory.taxId}
                                        onChange={(e) => handleInputChange('taxId', e.target.value, index)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter TIN"
                                    />
                                </div>

                                {/* ID Information */}
                                <div className="border-t border-gray-200 pt-4">
                                    <h5 className="font-medium text-gray-700 mb-3">Means of Identification</h5>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Type</label>
                                            <select
                                                value={signatory.idType}
                                                onChange={(e) => handleInputChange('idType', e.target.value, index)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            >
                                                <option value="">Select ID Type</option>
                                                {idTypes.map(type => (
                                                    <option key={type.value} value={type.value}>{type.label}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Number</label>
                                            <input
                                                type="text"
                                                value={signatory.idNumber}
                                                onChange={(e) => handleInputChange('idNumber', e.target.value, index)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                placeholder="Enter ID number"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Issued Date</label>
                                            <input
                                                type="date"
                                                value={signatory.idIssuedDate}
                                                onChange={(e) => handleInputChange('idIssuedDate', e.target.value, index)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">ID Expiry Date</label>
                                            <input
                                                type="date"
                                                value={signatory.idExpiryDate}
                                                onChange={(e) => handleInputChange('idExpiryDate', e.target.value, index)}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
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
                        />

                        {/* PEP Information */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Politically Exposed Person (PEP) Declaration</h4>

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

                                {formData.isPep === 'yes' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Please provide details:
                                        </label>
                                        <textarea
                                            value={formData.pepDetails}
                                            onChange={(e) => handleInputChange('pepDetails', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Provide PEP details"
                                            rows="3"
                                        />
                                    </div>
                                )}

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

                                {formData.isFinanciallyExposed === 'yes' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Please provide details:
                                        </label>
                                        <textarea
                                            value={formData.financiallyExposedDetails}
                                            onChange={(e) => handleInputChange('financiallyExposedDetails', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Provide financial exposure details"
                                            rows="3"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Bank Details */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4">Bank Account Details</h4>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Name</label>
                                    <input
                                        type="text"
                                        value={formData.accountName}
                                        onChange={(e) => handleInputChange('accountName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter account name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number</label>
                                    <input
                                        type="text"
                                        value={formData.accountNumber}
                                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter account number"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bank Name</label>
                                    <input
                                        type="text"
                                        value={formData.bankName}
                                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter bank name"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Investor Domicile */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Investor Area of Domicile
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

                        {/* User Email for Copy */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Email (to receive a copy of this application)
                            </label>
                            <input
                                type="email"
                                value={formData.userEmail}
                                onChange={(e) => handleInputChange('userEmail', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email to receive a copy"
                            />
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Signatures & Date</h3>
                        <CorporateSignatureSection
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
                                    <span className="font-semibold text-gray-700">Company Name:</span>
                                    <span className="ml-2">{formData.companyName || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Investment Type:</span>
                                    <span className="ml-2">{investmentOptions.find(opt => opt.value === formData.investmentType)?.label || 'Not selected'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Investment Value:</span>
                                    <span className="ml-2">{formData.investmentValue || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Number of Signatories:</span>
                                    <span className="ml-2">{formData.signatories.length}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Email Address:</span>
                                    <span className="ml-2">{formData.emailAddress || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">CAC Number:</span>
                                    <span className="ml-2">{formData.cacNumber || 'Not provided'}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Documents Uploaded:</span>
                                    <span className="ml-2">{Object.keys(formData.uploadedDocuments || {}).length} files</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-gray-700">Signatures Provided:</span>
                                    <span className="ml-2">
                                        {[formData.companySignature, ...formData.signatories.map(s => s.signature)].filter(Boolean).length} of {1 + formData.signatories.length}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Documentation Checklist */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                            <h4 className="text-lg font-semibold text-blue-800 mb-4">Documentation Checklist</h4>
                            <p className="text-sm text-blue-700 mb-3">Document upload status:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                {[
                                    { key: 'passportPhoto', label: 'Passport photograph' },
                                    { key: 'utilityBill', label: 'Recent utility bill' },
                                    { key: 'validId', label: 'Valid means of identification' },
                                    { key: 'cacForms', label: 'Copy of CAC Forms (C07, C02)' },
                                    { key: 'boardResolution', label: 'Board Resolution' }
                                ].map(doc => (
                                    <div key={doc.key} className="flex items-center">
                                        <span className={`mr-2 ${formData.uploadedDocuments?.[doc.key] ? 'text-green-600' : 'text-red-600'}`}>
                                            {formData.uploadedDocuments?.[doc.key] ? '✓' : '✗'}
                                        </span>
                                        <span className="text-blue-700">{doc.label}</span>
                                    </div>
                                ))}
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
                                    <span className="font-semibold">I/We agree that there will be a pre-liquidation charge of 25% of accrued returns if investment(s) are liquidated before maturity.</span>
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
                    <h2 className="text-2xl font-bold text-center text-gray-800">INVESTMENT APPLICATION (CORPORATE ACCOUNT)</h2>
                    <p className="text-center text-gray-600 mt-2">A member of PanAfrican Capital Holdings</p>
                </div>

                {/* Step Indicator */}
                <div className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const IconComponent = step.icon;
                            const isActive = index === currentStep;
                            const isCompleted = index < currentStep;

                            return (
                                <div key={index} className="flex items-center">
                                    <div className={`flex items-center justify-center w-10 h-10 rounded-full ${isActive ? 'bg-blue-600 text-white' :
                                        isCompleted ? 'bg-green-600 text-white' :
                                            'bg-gray-300 text-gray-600'
                                        }`}>
                                        <IconComponent size={20} />
                                    </div>
                                    <div className="ml-3 hidden sm:block">
                                        <div className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                            {step.title}
                                        </div>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div className="hidden sm:block w-16 h-0.5 bg-gray-300 mx-4"></div>
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
                            disabled={currentStep === 0}
                            className="flex items-center gap-2 px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Previous
                        </button>

                        <div className="flex gap-4">
                            <button
                                onClick={handlePreviewPDF}
                                className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                            >
                                <FileText size={20} />
                                Preview PDF
                            </button>

                            {currentStep < steps.length - 1 ? (
                                <button
                                    onClick={nextStep}
                                    disabled={!validateStep(currentStep)}
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

export default CorporateInvestmentForm;