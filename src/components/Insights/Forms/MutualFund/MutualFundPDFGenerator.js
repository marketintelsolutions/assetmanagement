// MutualFundPDFGenerator.js
import jsPDF from 'jspdf';

export const MutualFundPDFGenerator = {
    generateFilledPDF: (formData) => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        let yPosition = 20;
        const pageWidth = 210;
        const pageHeight = 297;
        const leftMargin = 15;
        const rightMargin = 15;
        const bottomMargin = 30; // Increased bottom margin
        const contentWidth = pageWidth - leftMargin - rightMargin;

        const checkNewPage = (requiredSpace = 25) => {
            if (yPosition + requiredSpace > pageHeight - bottomMargin) {
                doc.addPage();
                yPosition = 20;
                return true;
            }
            return false;
        };

        // Header
        doc.setFontSize(18);
        doc.setFont('helvetica', 'bold');
        doc.text('PAC ASSET MANAGEMENT', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 6;

        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('A member of PanAfrican Capital Holdings', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 10;

        doc.setFontSize(16);
        doc.setFont('helvetica', 'bold');
        doc.text('MUTUAL FUND (INDIVIDUAL/JOINT ACCOUNT)', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Investment Information
        checkNewPage(35);
        MutualFundPDFGenerator.addSectionHeader(doc, 'INVESTMENT INFORMATION', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        // Fund Selection
        const fundOptions = [
            { key: 'pacam_money_market', label: 'PACAM MONEY MARKET FUND (N)' },
            { key: 'pacam_fixed_income', label: 'PACAM FIXED INCOME FUND (N)' },
            { key: 'pacam_balanced', label: 'PACAM BALANCED FUND (N)' },
            { key: 'pacam_equity', label: 'PACAM EQUITY FUND (N)' },
            { key: 'pacam_eurobond', label: 'PACAM EUROBOND FUND ($)' }
        ];

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        // Fund options - 3 per row
        for (let i = 0; i < fundOptions.length; i += 3) {
            checkNewPage(10);
            let xPos = leftMargin;
            for (let j = 0; j < 3 && (i + j) < fundOptions.length; j++) {
                const fund = fundOptions[i + j];
                const isChecked = formData.fundType === fund.key;
                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isChecked) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }
                doc.text(fund.label, xPos + 5, yPosition);
                xPos += 60;
            }
            yPosition += 8;
        }

        // Dividend Mandate and Investment Value
        yPosition += 5;
        checkNewPage(15);
        doc.text('DIVIDEND MANDATE:', leftMargin, yPosition);

        const reinvestChecked = formData.dividendMandate === 'reinvest';
        const payoutChecked = formData.dividendMandate === 'payout';

        doc.rect(leftMargin + 50, yPosition - 3, 3, 3);
        if (reinvestChecked) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 50, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('RE-INVEST', leftMargin + 55, yPosition);

        doc.rect(leftMargin + 90, yPosition - 3, 3, 3);
        if (payoutChecked) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 90, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('PAY OUT', leftMargin + 95, yPosition);

        // Investment Value
        doc.text('INVESTMENT VALUE', leftMargin + 130, yPosition);
        doc.rect(leftMargin + 165, yPosition - 6, 25, 8);
        doc.text(formData.investmentValue || '', leftMargin + 167, yPosition - 1);

        yPosition += 15;

        // Investor Type
        checkNewPage(30);
        MutualFundPDFGenerator.addSectionHeader(doc, 'INVESTOR TYPE', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const investorTypes = [
            { key: 'retail_domestic', label: 'RETAIL INVESTORS (DOMESTIC)' },
            { key: 'retail_foreign', label: 'RETAIL INVESTORS (FOREIGN)' },
            { key: 'institutional_domestic', label: 'INSTITUTIONAL INVESTORS (DOMESTIC)' },
            { key: 'institutional_foreign', label: 'INSTITUTIONAL INVESTORS (FOREIGN)' }
        ];

        for (let i = 0; i < investorTypes.length; i += 2) {
            checkNewPage(10);
            let xPos = leftMargin;
            for (let j = 0; j < 2 && (i + j) < investorTypes.length; j++) {
                const type = investorTypes[i + j];
                const isChecked = formData.investorType === type.key;
                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isChecked) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }
                doc.text(type.label, xPos + 5, yPosition);
                xPos += 90;
            }
            yPosition += 8;
        }
        yPosition += 15;

        checkNewPage(50);

        // Individual Applicant Details
        MutualFundPDFGenerator.addSectionHeader(doc, 'INDIVIDUAL APPLICANT DETAILS', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        // Name fields
        MutualFundPDFGenerator.addFormRowTriple(doc,
            'SURNAME:', formData.primaryApplicant.surname || '',
            'NAME:', formData.primaryApplicant.name || '',
            'OTHER NAME:', formData.primaryApplicant.otherName || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);
        // Residential Address
        MutualFundPDFGenerator.addFormRow(doc, 'RESIDENTIAL ADDRESS:', formData.primaryApplicant.residentialAddress || '', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        checkNewPage(15);
        // Personal Details Row 1
        MutualFundPDFGenerator.addFormRowTriple(doc,
            'NATIONALITY:', formData.primaryApplicant.nationality || '',
            'DATE OF BIRTH:', formData.primaryApplicant.dateOfBirth || '',
            'OCCUPATION:', formData.primaryApplicant.occupation || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);
        // Personal Details Row 2
        let genderText = '';
        if (formData.primaryApplicant.gender === 'male') {
            genderText = '☑ Male ☐ Female';
        } else if (formData.primaryApplicant.gender === 'female') {
            genderText = '☐ Male ☑ Female';
        } else {
            genderText = '☐ Male ☐ Female';
        }

        MutualFundPDFGenerator.addFormRowQuad(doc,
            'GENDER:', genderText,
            'STATE OF ORIGIN:', formData.primaryApplicant.stateOfOrigin || '',
            'TOWN/CITY:', formData.primaryApplicant.townCity || '',
            'MOBILE NUMBER:', formData.primaryApplicant.mobileNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);
        // Email and TIN
        MutualFundPDFGenerator.addFormRowDouble(doc,
            'EMAIL ADDRESS:', formData.primaryApplicant.emailAddress || '',
            'TAX IDENTIFICATION NUMBER (TIN):', formData.primaryApplicant.taxId || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(40);
        // Enhanced signature section
        MutualFundPDFGenerator.addSignatureSection(doc,
            'SIGNATURE:',
            formData.primaryApplicant.signature,
            formData.primaryApplicant.signatureDate || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 35;

        checkNewPage(40);

        // Means of Identification
        MutualFundPDFGenerator.addSectionHeader(doc, 'MEANS OF IDENTIFICATION', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        MutualFundPDFGenerator.addFormRowQuad(doc,
            'ID TYPE:', formData.primaryApplicant.idType || '',
            'ID NUMBER:', formData.primaryApplicant.idNumber || '',
            'ID ISSUED DATE:', formData.primaryApplicant.idIssuedDate || '',
            'ID EXPIRY DATE:', formData.primaryApplicant.idExpiryDate || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        checkNewPage(20);
        // BVN
        MutualFundPDFGenerator.addFormRow(doc, 'BVN:', formData.primaryApplicant.bvn || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(30);
        // Bank Account Details
        MutualFundPDFGenerator.addSectionHeader(doc, 'BANK ACCOUNT DETAILS', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        MutualFundPDFGenerator.addFormRowTriple(doc,
            'ACCOUNT NAME:', formData.primaryApplicant.accountName || '',
            'ACCOUNT NUMBER:', formData.primaryApplicant.accountNumber || '',
            'BANK NAME:', formData.primaryApplicant.bankName || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 20;

        // Joint Account Section (if applicable)
        if (formData.isJointAccount) {
            checkNewPage(70);

            MutualFundPDFGenerator.addSectionHeader(doc, 'MUTUAL FUND JOINT ACCOUNT OPENING (INVESTOR 2)', leftMargin, yPosition, contentWidth);
            yPosition += 12;

            // Joint applicant details (similar to primary but condensed)
            MutualFundPDFGenerator.addFormRowTriple(doc,
                'SURNAME:', formData.jointApplicant?.surname || '',
                'NAME:', formData.jointApplicant?.name || '',
                'OTHER NAME:', formData.jointApplicant?.otherName || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 12;

            checkNewPage(15);
            MutualFundPDFGenerator.addFormRowDouble(doc,
                'EMAIL ADDRESS:', formData.jointApplicant?.emailAddress || '',
                'MOBILE NUMBER:', formData.jointApplicant?.mobileNumber || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 12;

            checkNewPage(40);
            // Enhanced joint signature section
            MutualFundPDFGenerator.addSignatureSection(doc,
                'SIGNATURE:',
                formData.jointApplicant?.signature,
                formData.jointApplicant?.signatureDate || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 35;
        }

        // New page for additional sections
        doc.addPage();
        yPosition = 20;

        // PEP/FEP Information
        MutualFundPDFGenerator.addSectionHeader(doc, 'AUTHENTICATION FOR POLITICALLY EXPOSED AND FINANCIALLY EXPOSED PERSONS', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        // PEP Question
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('1. Are you currently / ever been a politically exposed person', leftMargin, yPosition);
        yPosition += 4;
        doc.text('(PEP) or a relative/close associate of a PEP?', leftMargin, yPosition);

        const pepYes = formData.isPep === 'yes';
        const pepNo = formData.isPep === 'no';

        doc.rect(leftMargin + 120, yPosition - 7, 3, 3);
        if (pepYes) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 120, yPosition - 7, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('YES', leftMargin + 125, yPosition - 4);

        doc.rect(leftMargin + 150, yPosition - 7, 3, 3);
        if (pepNo) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 150, yPosition - 7, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('NO', leftMargin + 155, yPosition - 4);
        yPosition += 15;

        checkNewPage(15);
        // Financially Exposed Question
        doc.text('2. Have you currently / ever been a financially exposed person?', leftMargin, yPosition);
        const finYes = formData.isFinanciallyExposed === 'yes';
        const finNo = formData.isFinanciallyExposed === 'no';

        doc.rect(leftMargin + 120, yPosition - 3, 3, 3);
        if (finYes) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 120, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('YES', leftMargin + 125, yPosition);

        doc.rect(leftMargin + 150, yPosition - 3, 3, 3);
        if (finNo) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin + 150, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('NO', leftMargin + 155, yPosition);
        yPosition += 20;

        checkNewPage(40);
        // Attestations
        MutualFundPDFGenerator.addSectionHeader(doc, 'ATTESTATION', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const attestation1 = formData.agreedToTerms;
        const attestation2 = formData.agreedToRisks;

        doc.rect(leftMargin, yPosition - 3, 3, 3);
        if (attestation1) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('On the first investment, I/We agree that if these units are redeemed within 30, 90 and 180 days', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('of the date of purchase, the fund manager shall deduct a handling charge equivalent to 20%', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('of the redemption proceeds.', leftMargin + 5, yPosition);
        yPosition += 12;

        checkNewPage(15);
        doc.rect(leftMargin, yPosition - 3, 3, 3);
        if (attestation2) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('I/We understand that prices fluctuate and losses in the value of my/our investment may occur', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('and the past performance is not necessarily an indication of future performance.', leftMargin + 5, yPosition);
        yPosition += 20;

        checkNewPage(50);
        // Documentation Checklist
        MutualFundPDFGenerator.addSectionHeader(doc, 'DOCUMENTATION CHECKLIST', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const checklistItems = [
            { key: 'passportPhoto', label: 'Passport photograph' },
            { key: 'utilityBill', label: 'Recent Utility Bill' },
            { key: 'validId', label: 'Valid Means of Identification' },
            { key: 'boardResolution', label: 'Board Resolution' },
            { key: 'cacForms', label: 'Copy of CAC Forms' }
        ];

        for (let i = 0; i < checklistItems.length; i += 3) {
            checkNewPage(10);
            let xPos = leftMargin;
            for (let j = 0; j < 3 && (i + j) < checklistItems.length; j++) {
                const item = checklistItems[i + j];
                const isUploaded = formData.uploadedDocuments && formData.uploadedDocuments[item.key];

                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isUploaded) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }

                doc.text(item.label, xPos + 5, yPosition);
                xPos += 60;
            }
            yPosition += 8;
        }
        yPosition += 15;

        checkNewPage(45);
        // Investor Area of Domicile
        MutualFundPDFGenerator.addSectionHeader(doc, 'INVESTORS AREA OF DOMICILE', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const domicileZones = [
            'north_central', 'north_east', 'north_west',
            'south_east', 'south_south', 'south_west', 'diaspora'
        ];
        const domicileLabels = [
            'NORTH - CENTRAL ZONE', 'NORTH - EAST ZONE', 'NORTH - WEST ZONE',
            'SOUTH - EAST ZONE', 'SOUTH - SOUTH ZONE', 'SOUTH - WEST ZONE', 'DIASPORA INVESTORS'
        ];

        for (let i = 0; i < domicileLabels.length; i += 3) {
            checkNewPage(10);
            let xPos = leftMargin;
            for (let j = 0; j < 3 && (i + j) < domicileLabels.length; j++) {
                const index = i + j;
                const isChecked = formData.investorDomicile === domicileZones[index];
                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isChecked) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }
                doc.text(domicileLabels[index], xPos + 5, yPosition);
                xPos += 60;
            }
            yPosition += 8;
        }
        yPosition += 20;

        checkNewPage(60);
        // Account Details Section
        MutualFundPDFGenerator.addSectionHeader(doc, 'ACCOUNT DETAILS TO MUTUAL FUND', leftMargin, yPosition, contentWidth);
        yPosition += 8;

        doc.setFontSize(8);
        doc.text('All underlisted Accounts are with UNITED BANK FOR AFRICA (UBA) PLC', leftMargin, yPosition);
        yPosition += 6;

        const accountDetails = [
            'PACAM MONEY MARKET FUND *1019535675',
            'PACAM FIXED INCOME FUND *1019535682',
            'PACAM BALANCED FUND *1019045402',
            'PACAM EUROBOND FUND *1021941866',
            'PACAM EQUITY FUND *1021941770'
        ];

        accountDetails.forEach(account => {
            checkNewPage(8);
            doc.text(account, leftMargin, yPosition);
            yPosition += 4;
        });
        yPosition += 15;

        checkNewPage(45);
        // For Office Use Only
        MutualFundPDFGenerator.addSectionHeader(doc, 'For Office Use Only', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        const officerBoxWidth = (contentWidth - 10) / 3;
        const officerBoxHeight = 20;

        ['ACCOUNT OFFICER', 'OPERATIONS OFFICER', 'COMPLIANCE OFFICER'].forEach((title, index) => {
            const xPos = leftMargin + index * (officerBoxWidth + 5);
            doc.rect(xPos, yPosition, officerBoxWidth, officerBoxHeight);
            doc.setFontSize(8);
            doc.text(title, xPos + 2, yPosition + officerBoxHeight + 5);
            doc.text('SIGNATURE & DATE', xPos + 2, yPosition + officerBoxHeight + 10);
            doc.setFontSize(9);
        });
        yPosition += 35;

        // Footer
        yPosition = pageHeight - 15;
        doc.setFontSize(8);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, leftMargin, yPosition);
        doc.text(`Reference: PACAM-MF-${Date.now()}`, pageWidth - rightMargin, yPosition, { align: 'right' });

        return doc;
    },

    addSectionHeader: (doc, title, x, y, width) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10);
        doc.setFillColor(52, 73, 94);
        doc.rect(x, y - 6, width, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.text(title, x + 2, y - 1);
        doc.setTextColor(0, 0, 0);
    },

    addSignatureSection: (doc, label, signatureImage, signatureDate, x, y, width) => {
        const signatureBoxWidth = 70;
        const signatureBoxHeight = 25;
        const dateBoxWidth = 50;
        const dateBoxHeight = 8;
        const rightMargin = 15;

        // Position signature box on the right
        const signatureBoxX = x + width - signatureBoxWidth;
        const signatureBoxY = y;

        // Position date box below signature box
        const dateBoxX = signatureBoxX + (signatureBoxWidth - dateBoxWidth) / 2;
        const dateBoxY = signatureBoxY + signatureBoxHeight + 3;

        // Draw label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x, y + 10);

        // Draw signature box
        doc.setFont('helvetica', 'normal');
        doc.rect(signatureBoxX, signatureBoxY, signatureBoxWidth, signatureBoxHeight);

        // Add signature image if provided
        if (signatureImage) {
            try {
                doc.addImage(signatureImage, 'PNG',
                    signatureBoxX + 2, signatureBoxY + 2,
                    signatureBoxWidth - 4, signatureBoxHeight - 4);
            } catch (error) {
                console.log('Could not add signature to PDF:', error);
            }
        }

        // Draw date box and label
        doc.setFontSize(8);
        doc.text('DATE (DD/MM/YYYY):', dateBoxX, dateBoxY - 2);
        doc.rect(dateBoxX, dateBoxY, dateBoxWidth, dateBoxHeight);

        // Add date text
        if (signatureDate) {
            doc.text(signatureDate, dateBoxX + 2, dateBoxY + 5);
        }
    },

    addFormRow: (doc, label, value, x, y, width) => {
        const labelWidth = width * 0.3;
        const fieldHeight = 8;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x, y);

        doc.setFont('helvetica', 'normal');
        doc.rect(x + labelWidth, y - 6, width - labelWidth, fieldHeight);
        const valueText = String(value).substring(0, 50);
        doc.text(valueText, x + labelWidth + 2, y - 1);
    },

    addFormRowDouble: (doc, label1, value1, label2, value2, x, y, width) => {
        const halfWidth = (width - 5) / 2;
        const labelWidth = halfWidth * 0.4;
        const fieldHeight = 8;

        // Left side
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label1, x, y);
        doc.setFont('helvetica', 'normal');
        doc.rect(x + labelWidth, y - 6, halfWidth - labelWidth, fieldHeight);
        doc.text(String(value1).substring(0, 20), x + labelWidth + 2, y - 1);

        // Right side
        const rightX = x + halfWidth + 5;
        doc.setFont('helvetica', 'bold');
        doc.text(label2, rightX, y);
        doc.setFont('helvetica', 'normal');
        doc.rect(rightX + labelWidth, y - 6, halfWidth - labelWidth, fieldHeight);
        doc.text(String(value2).substring(0, 20), rightX + labelWidth + 2, y - 1);
    },

    addFormRowTriple: (doc, label1, value1, label2, value2, label3, value3, x, y, width) => {
        const thirdWidth = (width - 10) / 3;
        const labelWidth = thirdWidth * 0.4;
        const fieldHeight = 8;

        [
            { label: label1, value: value1, x: x },
            { label: label2, value: value2, x: x + thirdWidth + 5 },
            { label: label3, value: value3, x: x + 2 * (thirdWidth + 5) }
        ].forEach(item => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text(item.label, item.x, y);
            doc.setFont('helvetica', 'normal');
            doc.rect(item.x + labelWidth, y - 6, thirdWidth - labelWidth, fieldHeight);
            doc.text(String(item.value).substring(0, 12), item.x + labelWidth + 1, y - 1);
        });
    },

    addFormRowQuad: (doc, label1, value1, label2, value2, label3, value3, label4, value4, x, y, width) => {
        const quarterWidth = (width - 15) / 4;
        const labelWidth = quarterWidth * 0.35;
        const fieldHeight = 8;

        [
            { label: label1, value: value1, x: x },
            { label: label2, value: value2, x: x + quarterWidth + 5 },
            { label: label3, value: value3, x: x + 2 * (quarterWidth + 5) },
            { label: label4, value: value4, x: x + 3 * (quarterWidth + 5) }
        ].forEach(item => {
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.text(item.label, item.x, y);
            doc.setFont('helvetica', 'normal');
            doc.rect(item.x + labelWidth, y - 6, quarterWidth - labelWidth, fieldHeight);
            doc.text(String(item.value).substring(0, 8), item.x + labelWidth + 1, y - 1);
        });
    }
};