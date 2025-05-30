// EurobondFundRedemptionForm.jsx
import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle, Globe } from 'lucide-react';
import { EmailTemplateGenerator } from './EmailTemplateGenerator';
import { EmailService } from './EmailService';

const EurobondFundRedemptionForm = ({
    apiKey = `${process.env.REACT_APP_PLUNK_API_KEY}`,
    fundManagerEmail = `${process.env.REACT_APP_SUBMISSION_EMAIL}`,
}) => {
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
        userEmail: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        const required = ['fullName', 'clientId', 'email', 'unitsToRedeemFigures', 'unitsToRedeemWords',
            'bank', 'branch', 'sortCode', 'accountNumber', 'accountName'];

        for (let field of required) {
            if (!formData[field]) {
                return false;
            }
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return false;
        }

        if (formData.userEmail && !emailRegex.test(formData.userEmail)) {
            return false;
        }

        return true;
    };

    const createEmailTemplates = () => {
        const commonContactInfo = {
            email: 'info@pacassetmanagement.com',
            phone: '+234-XXX-XXXX',
            website: 'www.pacassetmanagement.com'
        };

        // Fund Manager Email Template
        const fundManagerSections = [
            EmailTemplateGenerator.createFormDataSection(
                'Personal Information',
                {
                    'Full Name': formData.fullName,
                    'Client ID': formData.clientId,
                    'Email': formData.email,
                    'Telephone': formData.telephoneNumber || 'Not provided',
                    'Form Date': formData.date ? new Date(formData.date).toLocaleDateString() : 'Not provided'
                }
            ),
            EmailTemplateGenerator.createFormDataSection(
                'Redemption Details',
                {
                    'Units to Redeem (Figures)': formData.unitsToRedeemFigures,
                    'Units to Redeem (Words)': formData.unitsToRedeemWords
                }
            ),
            EmailTemplateGenerator.createFormDataSection(
                'Payment Details',
                {
                    'Bank': formData.bank,
                    'Branch': formData.branch,
                    'Sort Code': formData.sortCode,
                    'Account Number': formData.accountNumber,
                    'Account Name': formData.accountName
                }
            ),
            EmailTemplateGenerator.createFormDataSection(
                'Unit Certificate Details',
                {
                    'Certificate Numbers': formData.certificateNumbers || 'Not provided',
                    'Total Number of Units': formData.totalUnits || 'Not provided',
                    'Previous Redemption': formData.previousRedemption || 'Not provided',
                    'Balance': formData.balance || 'Not provided',
                    'Current Redemption': formData.currentRedemption || 'Not provided'
                }
            )
        ];

        const fundManagerImportantNotes = `
      <ul>
        <li><strong>PACAM Eurobond Fund Redemption:</strong> For redemptions within 90 days, 10% of the positive total returns of the units being redeemed will be charged on the date of redemption.</li>
        <li>Upon redemption, payment will only be made in the name of the unit holder(s).</li>
        <li>In the case of partial redemption, the balance Fund Statement will be sent to the email address provided.</li>
        <li>Please ensure you have received the relevant unit Certificate evidencing the unit holding.</li>
        <li>Process this Eurobond fund redemption request according to standard procedures and maintain all documentation as required.</li>
        <li><strong>Fund Type:</strong> PACAM Eurobond Fund - International bond exposure with foreign currency diversification.</li>
        <li><strong>Currency Consideration:</strong> Eurobond fund investments are exposed to foreign exchange fluctuations.</li>
      </ul>
    `;

        const fundManagerTemplate = EmailTemplateGenerator.createTemplate({
            title: 'PACAM Eurobond Fund Redemption Request',
            subtitle: 'New Eurobond fund redemption submission',
            greeting: 'A new PACAM Eurobond Fund redemption request has been submitted through the online portal. Please review the details below and process accordingly.',
            sections: fundManagerSections,
            importantNotes: fundManagerImportantNotes,
            isUserCopy: false,
            brandName: 'PACAM Eurobond Fund',
            brandColor: '#1e40af', // Blue for international/bonds
            contactInfo: commonContactInfo
        });

        // User Email Template
        const userSections = [
            {
                title: 'Eurobond Fund Redemption Confirmation',
                content: `
          <p>Thank you for submitting your PACAM Eurobond Fund redemption request. We have received your application and will process it according to our standard procedures.</p>
          <div class="info-grid">
            <div class="info-label">Units to Redeem:</div>
            <div class="info-value">${formData.unitsToRedeemFigures} (${formData.unitsToRedeemWords})</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Payment Account:</div>
            <div class="info-value">${formData.accountName} - ${formData.bank}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Client ID:</div>
            <div class="info-value">${formData.clientId}</div>
          </div>
          <div class="info-grid">
            <div class="info-label">Fund Type:</div>
            <div class="info-value">PACAM Eurobond Fund (International Bonds)</div>
          </div>
        `
            }
        ];

        const userTemplate = EmailTemplateGenerator.createTemplate({
            title: 'PACAM Eurobond Fund Redemption Confirmation',
            subtitle: 'Your Eurobond fund redemption request has been received',
            greeting: `Dear ${formData.fullName},`,
            sections: userSections,
            importantNotes: `
        <ul>
          <li>Your Eurobond fund redemption request is being processed and you will receive confirmation once completed.</li>
          <li><strong>Important:</strong> For redemptions within 90 days, 10% of positive returns will be charged as stated in your fund agreement.</li>
          <li>Payment will be made to the account details you provided within 3-5 business days after processing.</li>
          <li>PACAM Eurobond Fund provides exposure to international bond markets and foreign currency diversification.</li>
          <li>Please note that Eurobond investments are subject to foreign exchange rate fluctuations.</li>
          <li>If you have any questions about your Eurobond fund investment, please contact our customer service team.</li>
        </ul>
      `,
            isUserCopy: true,
            brandName: 'PACAM Eurobond Fund',
            brandColor: '#1e40af',
            contactInfo: commonContactInfo
        });

        return { fundManagerTemplate, userTemplate };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            setSubmitStatus({ type: 'error', message: 'Please fill in all required fields with valid information.' });
            return;
        }

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            const { fundManagerTemplate, userTemplate } = createEmailTemplates();

            // Send to fund manager
            await EmailService.sendEmail(
                fundManagerEmail,
                'New PACAM Eurobond Fund Redemption Request',
                fundManagerTemplate,
                apiKey
            );

            // Send copy to user if email provided
            if (formData.userEmail) {
                await EmailService.sendEmail(
                    formData.userEmail,
                    'Copy: Your PACAM Eurobond Fund Redemption Request',
                    userTemplate,
                    apiKey
                );
            }

            setSubmitStatus({
                type: 'success',
                message: 'PACAM Eurobond Fund redemption request submitted successfully! You should receive confirmation shortly.'
            });

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
                    userEmail: ''
                });
                setSubmitStatus(null);
            }, 3000);

        } catch (error) {
            setSubmitStatus({
                type: 'error',
                message: 'Failed to submit redemption request. Please check your API key configuration and try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="bg-white rounded-t-lg shadow-lg p-6 border-b-4 border-blue-600">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md flex items-center gap-2">
                            <Globe size={24} />
                            <h1 className="text-xl font-bold">PACAM Eurobond Fund</h1>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">REDEMPTION FORM</h2>
                    <p className="text-center text-blue-600 mt-2 font-medium">International Bond Fund Unit Redemption</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-b-lg p-8 space-y-8">

                    {/* Status Messages */}
                    {submitStatus && (
                        <div className={`flex items-center gap-3 p-4 rounded-lg ${submitStatus.type === 'success'
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-red-50 text-red-800 border border-red-200'
                            }`}>
                            {submitStatus.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span>{submitStatus.message}</span>
                        </div>
                    )}

                    {/* Date */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-start-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name (as printed on Fund Statement) *
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your full name as on fund statement"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Client ID *</label>
                                <input
                                    type="text"
                                    name="clientId"
                                    value={formData.clientId}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your client ID"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Telephone Number</label>
                                <input
                                    type="tel"
                                    name="telephoneNumber"
                                    value={formData.telephoneNumber}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email address"
                            />
                        </div>
                    </div>

                    {/* Redemption Details */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">REDEMPTION DETAILS</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Value/Number of Units to be redeemed (in figures) *
                                </label>
                                <input
                                    type="text"
                                    name="unitsToRedeemFigures"
                                    value={formData.unitsToRedeemFigures}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., 1000"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Value/Number of Units to be redeemed (in words) *
                                </label>
                                <input
                                    type="text"
                                    name="unitsToRedeemWords"
                                    value={formData.unitsToRedeemWords}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="e.g., One Thousand Only"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">PAYMENT DETAILS</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bank *</label>
                                    <input
                                        type="text"
                                        name="bank"
                                        value={formData.bank}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter bank name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Branch *</label>
                                    <input
                                        type="text"
                                        name="branch"
                                        value={formData.branch}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter branch name"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Code *</label>
                                    <input
                                        type="text"
                                        name="sortCode"
                                        value={formData.sortCode}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter sort code"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Account Number *</label>
                                    <input
                                        type="text"
                                        name="accountNumber"
                                        value={formData.accountNumber}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter account number"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Account Name *</label>
                                <input
                                    type="text"
                                    name="accountName"
                                    value={formData.accountName}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter account name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Unit Certificate Details */}
                    <div className="border-t pt-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">DETAILS OF ATTACHED UNIT CERTIFICATE</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Certificate Numbers</label>
                                <input
                                    type="text"
                                    name="certificateNumbers"
                                    value={formData.certificateNumbers}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter certificate numbers"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Redemption</label>
                                <input
                                    type="text"
                                    name="previousRedemption"
                                    value={formData.previousRedemption}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter previous redemption amount"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Total Number of Units</label>
                                <input
                                    type="text"
                                    name="totalUnits"
                                    value={formData.totalUnits}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter total units"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Balance</label>
                                <input
                                    type="text"
                                    name="balance"
                                    value={formData.balance}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter balance"
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Current Redemption</label>
                                <input
                                    type="text"
                                    name="currentRedemption"
                                    value={formData.currentRedemption}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter current redemption amount"
                                />
                            </div>
                        </div>
                    </div>

                    {/* User Email for Copy */}
                    <div className="border-t pt-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Mail className="text-blue-600" size={20} />
                            <h3 className="text-lg font-semibold text-gray-800">EMAIL COPY (OPTIONAL)</h3>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Your Email (to receive a copy of this redemption request)
                            </label>
                            <input
                                type="email"
                                name="userEmail"
                                value={formData.userEmail}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter your email to receive a copy"
                            />
                        </div>
                    </div>

                    {/* Important Notes */}
                    <div className="border-t pt-6">
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 className="font-semibold text-blue-800 mb-2">Important Notes for PACAM Eurobond Fund:</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                                <li>• <strong>Early Redemption Charge:</strong> For redemptions within 90 days, 10% of the positive total returns of the units being redeemed will be charged on the date of redemption.</li>
                                <li>• Upon redemption, payment will only be made in the name of the unit holder(s).</li>
                                <li>• In the case of partial redemption, the balance Fund Statement will be sent to the email address provided by the client and copied to the fund manager.</li>
                                <li>• Please ensure you have attached the relevant unit Certificate evidencing your unit holding.</li>
                                <li>• <strong>International Exposure:</strong> This fund invests in international bonds and is subject to foreign exchange rate fluctuations.</li>
                                <li>• <strong>Currency Risk:</strong> Eurobond investments provide diversification but carry currency conversion risks.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="border-t pt-6">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Send size={20} />
                                    Submit Eurobond Fund Redemption
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EurobondFundRedemptionForm;