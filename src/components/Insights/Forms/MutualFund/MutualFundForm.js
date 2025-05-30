// MutualFundForm.jsx - Main Component
import React, { useState } from 'react';
import { User, Users, FileText, CheckCircle, AlertCircle, ArrowLeft, ArrowRight, Send } from 'lucide-react';
import { EmailTemplateGenerator } from '../EmailTemplateGenerator';
import { EmailService } from '../EmailService';
import InvestmentInfoStep from './InvestmentInfoStep';
import PersonalDetailsStep from './PersonalDetailsStep';
import MinorNextOfKinStep from './MinorNextOfKinStep';
import ComplianceStep from './ComplianceStep';
import ReviewSubmitStep from './ReviewSubmitStep';

const MutualFundForm = ({
    apiKey = `${process.env.REACT_APP_PLUNK_API_KEY}`,
    adminEmail = `${process.env.REACT_APP_SUBMISSION_EMAIL}`,
}) => {
    const [accountType, setAccountType] = useState('individual');
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const [formData, setFormData] = useState({
        // Investment Information
        fundType: '',
        dividendMandate: 'reinvest',
        investmentValue: '',
        investorType: '',


        // Primary Applicant
        primaryApplicant: {
            surname: '', name: '', otherName: '', residentialAddress: '',
            nationality: '', dateOfBirth: '', occupation: '', gender: '',
            stateOfOrigin: '', townCity: '', mobileNumber: '', emailAddress: '',
            taxId: '', signatureDate: '', idType: '', idNumber: '',
            idIssuedDate: '', idExpiryDate: '', bvn: '',
            accountName: '', accountNumber: '', bankName: ''
        },

        // Secondary Applicant (Joint only)
        secondaryApplicant: {
            surname: '', name: '', otherName: '', residentialAddress: '',
            nationality: '', dateOfBirth: '', occupation: '', gender: '',
            stateOfOrigin: '', townCity: '', mobileNumber: '', emailAddress: '',
            taxId: '', signatureDate: '', idType: '', idNumber: '',
            idIssuedDate: '', idExpiryDate: '', bvn: '',
            accountName: '', accountNumber: '', bankName: ''
        },

        // Minor Investment Details
        minorDetails: {
            isForMinor: false, surname: '', name: '', otherName: '',
            residentialAddress: '', dateOfBirth: '', relationshipToApplicant: '',
            mobileNumber: '', emailAddress: ''
        },

        // Next of Kin
        nextOfKin: {
            surname: '', name: '', otherName: '', residentialAddress: '',
            nationality: '', stateOfOrigin: '', relationship: '',
            mobileNumber: '', emailAddress: ''
        },

        // PEP/FEP Information
        pepInformation: {
            investor1: { isPep: '', pepDetails: '', isFinanciallyExposed: '', fepDetails: '' },
            investor2: { isPep: '', pepDetails: '', isFinanciallyExposed: '', fepDetails: '' }
        },

        // Other fields
        investorDomicile: '',
        agreedToCharges: false,
        agreedToRisks: false,
        userEmail: ''
    });

    const steps = accountType === 'individual'
        ? [
            { title: 'Investment Info', icon: FileText },
            { title: 'Personal Details', icon: User },
            { title: 'Minor/Next of Kin', icon: Users },
            { title: 'Compliance', icon: CheckCircle },
            { title: 'Review & Submit', icon: Send }
        ]
        : [
            { title: 'Investment Info', icon: FileText },
            { title: 'Investor 1', icon: User },
            { title: 'Investor 2', icon: Users },
            { title: 'Additional Info', icon: Users },
            { title: 'Compliance', icon: CheckCircle },
            { title: 'Review & Submit', icon: Send }
        ];

    const handleInputChange = (section, field, value) => {
        if (section) {
            setFormData(prev => ({
                ...prev,
                [section]: { ...prev[section], [field]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    };

    const handleNestedInputChange = (section, subsection, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [subsection]: { ...prev[section][subsection], [field]: value }
            }
        }));
    };

    const validateStep = (step) => {
        switch (step) {
            case 0: return formData.fundType && formData.investmentValue && formData.investorType;
            case 1: return formData.primaryApplicant.surname && formData.primaryApplicant.name && formData.primaryApplicant.emailAddress;
            case 2:
                if (accountType === 'individual') {
                    return formData.nextOfKin.surname && formData.nextOfKin.name;
                } else {
                    return formData.secondaryApplicant.surname && formData.secondaryApplicant.name && formData.secondaryApplicant.emailAddress;
                }
            case 3:
                if (accountType === 'joint') {
                    return formData.nextOfKin.surname && formData.nextOfKin.name;
                } else {
                    return formData.pepInformation.investor1.isPep !== '' && formData.pepInformation.investor1.isFinanciallyExposed !== '';
                }
            case 4:
                if (accountType === 'joint') {
                    return formData.pepInformation.investor1.isPep !== '' && formData.pepInformation.investor1.isFinanciallyExposed !== '' &&
                        formData.pepInformation.investor2.isPep !== '' && formData.pepInformation.investor2.isFinanciallyExposed !== '';
                } else {
                    return formData.agreedToCharges && formData.agreedToRisks;
                }
            case 5: return formData.agreedToCharges && formData.agreedToRisks;
            default: return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep) && currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const createEmailTemplates = () => {
        const fundTypes = [
            { value: 'money_market', label: 'PACAM Money Market Fund (₦)', account: '*1019535675' },
            { value: 'fixed_income', label: 'PACAM Fixed Income Fund (₦)', account: '*1019535682' },
            { value: 'balanced', label: 'PACAM Balanced Fund (₦)', account: '*1019045402' },
            { value: 'equity', label: 'PACAM Equity Fund (₦)', account: '*1021941770' },
            { value: 'eurobond', label: 'PACAM Eurobond Fund ($)', account: '*1021941866' }
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

        const commonContactInfo = {
            email: 'info@pacassetmanagement.com',
            phone: '+234-XXX-XXXX',
            website: 'www.pacassetmanagement.com'
        };

        const selectedFund = fundTypes.find(fund => fund.value === formData.fundType);

        const adminSections = [
            EmailTemplateGenerator.createFormDataSection('Investment Information', {
                'Account Type': accountType === 'individual' ? 'Individual Account' : 'Joint Account',
                'Fund Type': selectedFund?.label || formData.fundType,
                'UBA Account': selectedFund?.account || 'N/A',
                'Investment Value': formData.investmentValue,
                'Dividend Mandate': formData.dividendMandate === 'reinvest' ? 'Re-invest' : 'Pay Out',
                'Investor Type': investorTypes.find(type => type.value === formData.investorType)?.label || formData.investorType
            }),
            {
                title: 'Primary Applicant Details',
                content: `
          <div class="info-grid">
            <div class="info-label">Full Name:</div>
            <div class="info-value">${formData.primaryApplicant.surname} ${formData.primaryApplicant.name} ${formData.primaryApplicant.otherName}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Email:</div>
            <div class="info-value">${formData.primaryApplicant.emailAddress}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Mobile:</div>
            <div class="info-value">${formData.primaryApplicant.mobileNumber}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Date of Birth:</div>
            <div class="info-value">${formData.primaryApplicant.dateOfBirth}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Occupation:</div>
            <div class="info-value">${formData.primaryApplicant.occupation}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">BVN:</div>
            <div class="info-value">${formData.primaryApplicant.bvn}</div>
          </div>
        `
            }
        ];

        if (accountType === 'joint') {
            adminSections.push({
                title: 'Secondary Applicant Details (Joint Account)',
                content: `
          <div class="info-grid">
            <div class="info-label">Full Name:</div>
            <div class="info-value">${formData.secondaryApplicant.surname} ${formData.secondaryApplicant.name} ${formData.secondaryApplicant.otherName}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Email:</div>
            <div class="info-value">${formData.secondaryApplicant.emailAddress}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Mobile:</div>
            <div class="info-value">${formData.secondaryApplicant.mobileNumber}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Date of Birth:</div>
            <div class="info-value">${formData.secondaryApplicant.dateOfBirth}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Occupation:</div>
            <div class="info-value">${formData.secondaryApplicant.occupation}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">BVN:</div>
            <div class="info-value">${formData.secondaryApplicant.bvn}</div>
          </div>
        `
            });
        }

        if (formData.minorDetails.isForMinor) {
            adminSections.push({
                title: 'Minor Investment Details',
                content: `
          <div class="info-grid">
            <div class="info-label">Minor Name:</div>
            <div class="info-value">${formData.minorDetails.surname} ${formData.minorDetails.name} ${formData.minorDetails.otherName}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Date of Birth:</div>
            <div class="info-value">${formData.minorDetails.dateOfBirth}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Relationship to Applicant:</div>
            <div class="info-value">${formData.minorDetails.relationshipToApplicant}</div>
          </div>
        `
            });
        }

        adminSections.push(
            EmailTemplateGenerator.createFormDataSection('Next of Kin Information', {
                'Full Name': `${formData.nextOfKin.surname} ${formData.nextOfKin.name} ${formData.nextOfKin.otherName}`,
                'Relationship': formData.nextOfKin.relationship,
                'Mobile Number': formData.nextOfKin.mobileNumber,
                'Email': formData.nextOfKin.emailAddress,
                'Nationality': formData.nextOfKin.nationality,
                'State of Origin': formData.nextOfKin.stateOfOrigin
            }),
            EmailTemplateGenerator.createFormDataSection('Compliance Information', {
                'Investor 1 - PEP Status': formData.pepInformation.investor1.isPep === 'yes' ? 'Yes' : 'No',
                'Investor 1 - PEP Details': formData.pepInformation.investor1.pepDetails || 'N/A',
                'Investor 1 - Financially Exposed': formData.pepInformation.investor1.isFinanciallyExposed === 'yes' ? 'Yes' : 'No',
                'Investor 1 - FEP Details': formData.pepInformation.investor1.fepDetails || 'N/A',
                ...(accountType === 'joint' && {
                    'Investor 2 - PEP Status': formData.pepInformation.investor2.isPep === 'yes' ? 'Yes' : 'No',
                    'Investor 2 - PEP Details': formData.pepInformation.investor2.pepDetails || 'N/A',
                    'Investor 2 - Financially Exposed': formData.pepInformation.investor2.isFinanciallyExposed === 'yes' ? 'Yes' : 'No',
                    'Investor 2 - FEP Details': formData.pepInformation.investor2.fepDetails || 'N/A'
                }),
                'Investor Domicile': domicileZones.find(zone => zone.value === formData.investorDomicile)?.label || 'Not specified'
            })
        );

        const adminImportantNotes = `
      <ul>
        <li>Please verify all documentation as per the checklist: Passport photograph, Recent utility bill, Valid ID${accountType === 'joint' ? ', Board Resolution, CAC Forms (if applicable)' : ''}.</li>
        <li>20% handling charge applies if units are redeemed within 30, 90, and 180 days of purchase.</li>
        <li>All investor details must be verified and cross-checked with provided documentation.</li>
        <li>Enhanced due diligence required if any investor is marked as PEP or financially exposed.</li>
        <li>Fund Account Details: All mutual funds are held with United Bank for Africa (UBA) PLC.</li>
        <li>${accountType === 'joint' ? 'Joint account requires both investors to sign all future transactions.' : 'Individual account setup - single signatory required.'}</li>
      </ul>
    `;

        const adminTemplate = EmailTemplateGenerator.createTemplate({
            title: 'Mutual Fund Application',
            subtitle: `New ${accountType} account opening request`,
            greeting: `A new mutual fund application has been submitted. Please review and process according to standard procedures.`,
            sections: adminSections,
            importantNotes: adminImportantNotes,
            isUserCopy: false,
            brandName: 'PAC Asset Management',
            contactInfo: commonContactInfo
        });

        const userSections = [
            {
                title: 'Application Summary',
                content: `
          <p>Thank you for your mutual fund investment application. We have received your ${accountType} account opening request and will process it within 3-5 business days.</p>
          <div class="info-grid">
            <div class="info-label">Account Type:</div>
            <div class="info-value">${accountType === 'individual' ? 'Individual Account' : 'Joint Account'}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Fund Type:</div>
            <div class="info-value">${selectedFund?.label}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Investment Value:</div>
            <div class="info-value">${formData.investmentValue}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Dividend Mandate:</div>
            <div class="info-value">${formData.dividendMandate === 'reinvest' ? 'Re-invest Dividends' : 'Pay Out Dividends'}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Primary Contact:</div>
            <div class="info-value">${formData.primaryApplicant.emailAddress}</div>
          </div>
        `
            }
        ];

        const userTemplate = EmailTemplateGenerator.createTemplate({
            title: 'Mutual Fund Application Received',
            subtitle: 'Thank you for choosing PAC Asset Management',
            greeting: `Dear ${formData.primaryApplicant.surname} ${formData.primaryApplicant.name},`,
            sections: userSections,
            importantNotes: `
        <ul>
          <li>Our team will review your application and contact you within 3-5 business days.</li>
          <li>Please ensure all required documentation is submitted for faster processing.</li>
          <li>You will receive account details and investment confirmation once processing is complete.</li>
          <li>Your selected fund: ${selectedFund?.label} (UBA Account: ${selectedFund?.account})</li>
          <li>For any inquiries, please contact our customer service team.</li>
        </ul>
      `,
            isUserCopy: true,
            brandName: 'PAC Asset Management',
            contactInfo: commonContactInfo
        });

        return { adminTemplate, userTemplate };
    };

    const handleSubmit = async () => {
        const finalStep = accountType === 'individual' ? 4 : 5;
        if (!validateStep(finalStep)) {
            setSubmitStatus({ type: 'error', message: 'Please complete all required fields and agree to the terms.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const { adminTemplate, userTemplate } = createEmailTemplates();

            await EmailService.sendEmail(adminEmail, 'New Mutual Fund Application', adminTemplate, apiKey);
            await EmailService.sendEmail(formData.primaryApplicant.emailAddress, 'Mutual Fund Application Confirmation', userTemplate, apiKey);

            if (accountType === 'joint' && formData.secondaryApplicant.emailAddress) {
                await EmailService.sendEmail(formData.secondaryApplicant.emailAddress, 'Joint Mutual Fund Application Confirmation', userTemplate, apiKey);
            }

            if (formData.userEmail && formData.userEmail !== formData.primaryApplicant.emailAddress && formData.userEmail !== formData.secondaryApplicant.emailAddress) {
                await EmailService.sendEmail(formData.userEmail, 'Copy: Mutual Fund Application', userTemplate, apiKey);
            }

            setSubmitStatus({ type: 'success', message: 'Mutual fund application submitted successfully! You will receive confirmation shortly.' });

            setTimeout(() => {
                window.location.reload();
            }, 3000);

        } catch (error) {
            setSubmitStatus({ type: 'error', message: 'Failed to submit application. Please check your configuration and try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 0:
                return <InvestmentInfoStep formData={formData} handleInputChange={handleInputChange} />;
            case 1:
                return <PersonalDetailsStep
                    applicant={formData.primaryApplicant}
                    applicantKey="primaryApplicant"
                    title="Personal Details"
                    handleInputChange={handleInputChange}
                />;
            case 2:
                if (accountType === 'individual') {
                    return <MinorNextOfKinStep formData={formData} handleInputChange={handleInputChange} />;
                } else {
                    return <PersonalDetailsStep
                        applicant={formData.secondaryApplicant}
                        applicantKey="secondaryApplicant"
                        title="Secondary Investor Details"
                        handleInputChange={handleInputChange}
                    />;
                }
            case 3:
                if (accountType === 'joint') {
                    return <MinorNextOfKinStep formData={formData} handleInputChange={handleInputChange} />;
                } else {
                    return <ComplianceStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleNestedInputChange={handleNestedInputChange}
                        accountType={accountType}
                    />;
                }
            case 4:
                if (accountType === 'joint') {
                    return <ComplianceStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                        handleNestedInputChange={handleNestedInputChange}
                        accountType={accountType}
                    />;
                } else {
                    return <ReviewSubmitStep
                        formData={formData}
                        handleInputChange={handleInputChange}
                        accountType={accountType}
                    />;
                }
            case 5:
                return <ReviewSubmitStep
                    formData={formData}
                    handleInputChange={handleInputChange}
                    accountType={accountType}
                />;
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
                    <p className="text-center text-gray-600 mt-2">Individual/Joint Account Opening</p>
                </div>

                {/* Account Type Selection */}
                {currentStep === 0 && (
                    <div className="bg-white border-b border-gray-200 px-6 py-4">
                        <div className="flex items-center justify-center gap-6">
                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="individual"
                                    checked={accountType === 'individual'}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <User className="text-blue-600" size={24} />
                                <div>
                                    <div className="font-semibold text-gray-800">Individual Account</div>
                                    <div className="text-sm text-gray-600">Single investor account</div>
                                </div>
                            </label>

                            <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                <input
                                    type="radio"
                                    name="accountType"
                                    value="joint"
                                    checked={accountType === 'joint'}
                                    onChange={(e) => setAccountType(e.target.value)}
                                    className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <Users className="text-blue-600" size={24} />
                                <div>
                                    <div className="font-semibold text-gray-800">Joint Account</div>
                                    <div className="text-sm text-gray-600">Two investors account</div>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

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

                    {/* Status Messages */}
                    {submitStatus && (
                        <div className={`flex items-center gap-3 p-4 rounded-lg mb-6 ${submitStatus.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{submitStatus.message}</span>
                        </div>
                    )}

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
                                disabled={isSubmitting || !validateStep(accountType === 'individual' ? 4 : 5)}
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
    );
};

export default MutualFundForm;