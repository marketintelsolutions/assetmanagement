// CorporateInvestmentPDFGenerator.js - Updated for institutional investors only
import jsPDF from 'jspdf';

export const CorporateInvestmentPDFGenerator = {
    generateFilledPDF: (formData) => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        let yPosition = 20;
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const leftMargin = 15;
        const rightMargin = 15;
        const bottomMargin = 25;
        const contentWidth = pageWidth - leftMargin - rightMargin;

        // Function to check if we need a new page
        const checkNewPage = (requiredSpace = 20) => {
            if (yPosition + requiredSpace > pageHeight - bottomMargin) {
                doc.addPage();
                yPosition = 20;
                return true;
            }
            return false;
        };

        // Header Section
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
        doc.text('INVESTMENT APPLICATION (CORPORATE ACCOUNT)', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 20;

        // Investment Information Section
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'INVESTMENT INFORMATION', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        // Investment Type Checkboxes - Max 2 per row
        const investmentTypes = [
            { key: 'pacam_high_yield', label: 'PACAM HIGH YIELD NOTE' },
            { key: 'pacam_fixed_income', label: 'PACAM FIXED INCOME NOTE' },
            { key: 'treasury_bill', label: 'TREASURY BILL' },
            { key: 'others', label: 'OTHERS' }
        ];

        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        // Investment types - 2 per row
        for (let i = 0; i < investmentTypes.length; i += 2) {
            let xPos = leftMargin;
            for (let j = 0; j < 2 && (i + j) < investmentTypes.length; j++) {
                const type = investmentTypes[i + j];
                const isChecked = formData.investmentType === type.key;
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
        yPosition += 8;

        // Tenor - Max 2 per row
        doc.text('TENOR (DAYS):', leftMargin, yPosition);
        yPosition += 8;

        const tenorOptions = ['30', '60', '90', '180', '365'];
        for (let i = 0; i < tenorOptions.length; i += 2) {
            let xPos = leftMargin;
            for (let j = 0; j < 2 && (i + j) < tenorOptions.length; j++) {
                const tenor = tenorOptions[i + j];
                const isChecked = formData.tenor === tenor;
                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isChecked) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }
                doc.text(tenor, xPos + 5, yPosition);
                xPos += 90;
            }
            yPosition += 8;
        }

        if (formData.otherTenor) {
            doc.text(`Other: ${formData.otherTenor}`, leftMargin, yPosition);
            yPosition += 8;
        }
        yPosition += 8;

        // Investment Value
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'INVESTMENT VALUE:', formData.investmentValue || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(40);

        // Investor Type Section - Updated to only show institutional investors
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'INVESTOR TYPE', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const investorTypes = [
            { key: 'institutional_domestic', label: 'INSTITUTIONAL INVESTORS (DOMESTIC)' },
            { key: 'institutional_foreign', label: 'INSTITUTIONAL INVESTORS (FOREIGN)' }
        ];

        // Only 2 investor types now, display in one row
        let xPos = leftMargin;
        for (let i = 0; i < investorTypes.length; i++) {
            const type = investorTypes[i];
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
        yPosition += 15;

        checkNewPage(60);

        // Investment Account Opening Section
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'INVESTMENT ACCOUNT OPENING (CORPORATE)', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        // Date and CAC Number - 2 items per row
        CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
            'DATE:', formData.date || '',
            'CAC / RC NUMBER:', formData.cacNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        // Type of Business - full width
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'TYPE OF BUSINESS:', formData.typeOfBusiness || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(25);

        // Company Name - full width
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'COMPANY NAME:', formData.companyName || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        // Registered Address - full width, larger
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'REGISTERED ADDRESS:', formData.registeredAddress || '', leftMargin, yPosition, contentWidth, true);
        yPosition += 20;

        checkNewPage(25);

        // Country and State - 2 per row
        CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
            'COUNTRY:', formData.country || '',
            'STATE OF ORIGIN:', formData.stateOfOrigin || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        // Town/City - full width
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'TOWN/CITY:', formData.townCity || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        // Email and Phone - 2 per row
        CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
            'EMAIL ADDRESS:', formData.emailAddress || '',
            'OFFICE LINE:', formData.phoneNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        // TIN - full width
        CorporateInvestmentPDFGenerator.addFormRow(doc,
            'TAX IDENTIFICATION NO.:', formData.taxId || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        // Company Signature
        CorporateInvestmentPDFGenerator.addFormRow(doc,
            'SIGNATURE & DATE:', formData.companySignatureDate || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 25;

        // Add company signature box and signature
        const companySignatureBoxWidth = 60;
        const companySignatureBoxHeight = 20;
        const companySignatureBoxX = leftMargin + contentWidth - companySignatureBoxWidth - 5;
        const companySignatureBoxY = yPosition - 30;

        // Draw signature box
        doc.rect(companySignatureBoxX, companySignatureBoxY, companySignatureBoxWidth, companySignatureBoxHeight);

        // Add signature if available
        if (formData.companySignature) {
            try {
                doc.addImage(formData.companySignature, 'PNG', companySignatureBoxX + 2, companySignatureBoxY + 2, companySignatureBoxWidth - 4, companySignatureBoxHeight - 4);
            } catch (error) {
                console.log('Could not add company signature to PDF:', error);
            }
        }

        yPosition += 20;
        checkNewPage(70);

        // Account Signatories
        formData.signatories.forEach((signatory, index) => {
            if (index > 0) checkNewPage(80);

            CorporateInvestmentPDFGenerator.addSectionHeader(doc, `ACCOUNT SIGNATORY'S (DETAIL ${index + 1})`, leftMargin, yPosition, contentWidth);
            yPosition += 12;

            // Name fields - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'SURNAME:', signatory.surname || '',
                'FIRST NAME:', signatory.name || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // Other Name - full width
            CorporateInvestmentPDFGenerator.addFormRow(doc, 'OTHER NAME:', signatory.otherName || '', leftMargin, yPosition, contentWidth);
            yPosition += 15;

            checkNewPage(25);

            // Address - full width, larger
            CorporateInvestmentPDFGenerator.addFormRow(doc, 'RESIDENTIAL ADDRESS:', signatory.residentialAddress || '', leftMargin, yPosition, contentWidth, true);
            yPosition += 20;

            // Nationality and State - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'NATIONALITY:', signatory.nationality || '',
                'STATE OF ORIGIN:', signatory.stateOfOrigin || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            checkNewPage(25);

            // Date of Birth and Gender - 2 per row
            let genderText = '';
            if (signatory.gender === 'male') {
                genderText = 'Male';
            } else if (signatory.gender === 'female') {
                genderText = 'Female';
            }

            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'DATE OF BIRTH:', signatory.dateOfBirth || '',
                'GENDER:', genderText,
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // Employment and Town/City - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'EMPLOYMENT DETAIL:', signatory.employmentDetails || '',
                'TOWN/CITY:', signatory.townCity || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            checkNewPage(25);

            // BVN and Email - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'BVN:', signatory.bvn || '',
                'EMAIL ADDRESS:', signatory.emailAddress || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // Mobile Number and TIN - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'MOBILE NUMBER:', signatory.mobileNumber || '',
                'TAX ID NUMBER:', signatory.taxId || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // Signature Date - full width
            CorporateInvestmentPDFGenerator.addFormRow(doc,
                'SIGNATURE & DATE:', signatory.signatureDate || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // Add signatory signature box and signature
            const signatorySignatureBoxWidth = 60;
            const signatorySignatureBoxHeight = 20;
            const signatorySignatureBoxX = leftMargin + contentWidth - signatorySignatureBoxWidth - 5;
            const signatorySignatureBoxY = yPosition - 30;

            // Draw signature box
            doc.rect(signatorySignatureBoxX, signatorySignatureBoxY, signatorySignatureBoxWidth, signatorySignatureBoxHeight);

            // Add signature if available
            if (signatory.signature) {
                try {
                    doc.addImage(signatory.signature, 'PNG', signatorySignatureBoxX + 2, signatorySignatureBoxY + 2, signatorySignatureBoxWidth - 4, signatorySignatureBoxHeight - 4);
                } catch (error) {
                    console.log(`Could not add signatory ${index + 1} signature to PDF:`, error);
                }
            }

            checkNewPage(35);

            // Means of Identification
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(9);
            doc.text('MEANS OF IDENTIFICATION', leftMargin, yPosition);
            yPosition += 8;

            // ID Type and Number - 2 per row
            CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                'ID TYPE:', signatory.idType || '',
                'ID NUMBER:', signatory.idNumber || '',
                leftMargin, yPosition, contentWidth
            );
            yPosition += 15;

            // ID Dates - 2 per row (show expiry only if it exists)
            if (signatory.idExpiryDate) {
                CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
                    'ID ISSUED DATE:', signatory.idIssuedDate || '',
                    'ID EXPIRY DATE:', signatory.idExpiryDate || '',
                    leftMargin, yPosition, contentWidth
                );
            } else {
                CorporateInvestmentPDFGenerator.addFormRow(doc,
                    'ID ISSUED DATE:', signatory.idIssuedDate || '',
                    leftMargin, yPosition, contentWidth
                );
            }
            yPosition += 20;
        });

        checkNewPage(35);
        // Start new page for additional information
        // doc.addPage();
        yPosition = 20;

        // PEP Information
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'AUTHENTICATION FOR POLITICALLY EXPOSED AND FINANCIALLY EXPOSED PERSONS', leftMargin, yPosition, contentWidth);
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

        if (formData.pepDetails) {
            doc.text('IF YES, PLEASE PROVIDE DETAILS BELOW:', leftMargin, yPosition);
            yPosition += 8;
            const pepDetailsLines = doc.splitTextToSize(formData.pepDetails, contentWidth - 20);
            doc.text(pepDetailsLines, leftMargin + 5, yPosition);
            yPosition += Math.max(pepDetailsLines.length * 4, 15);
        }

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
        yPosition += 15;

        if (formData.financiallyExposedDetails) {
            doc.text('IF YES, PLEASE PROVIDE DETAILS BELOW:', leftMargin, yPosition);
            yPosition += 8;
            const finDetailsLines = doc.splitTextToSize(formData.financiallyExposedDetails, contentWidth - 20);
            doc.text(finDetailsLines, leftMargin + 5, yPosition);
            yPosition += Math.max(finDetailsLines.length * 4, 15);
        }

        yPosition += 20;
        checkNewPage(40);

        // Bank Account Details
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'BANK ACCOUNT DETAILS', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        // Account Name and Number - 2 per row
        CorporateInvestmentPDFGenerator.addFormRowDouble(doc,
            'ACCOUNT NAME:', formData.accountName || '',
            'ACCOUNT NUMBER:', formData.accountNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 15;

        // Bank Name - full width
        CorporateInvestmentPDFGenerator.addFormRow(doc, 'BANK NAME:', formData.bankName || '', leftMargin, yPosition, contentWidth);
        yPosition += 25;

        checkNewPage(50);

        // Investor Area of Domicile
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'INVESTORS AREA OF DOMICILE', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const domicileZones = [
            'north_central', 'north_east', 'north_west',
            'south_east', 'south_south', 'south_west', 'diaspora'
        ];
        const domicileLabels = [
            'NORTH - CENTRAL ZONE', 'NORTH - EAST ZONE', 'NORTH - WEST ZONE',
            'SOUTH - EAST ZONE', 'SOUTH - SOUTH ZONE', 'SOUTH - WEST ZONE', 'DIASPORA INVESTORS'
        ];

        // Max 2 per row
        for (let i = 0; i < domicileLabels.length; i += 2) {
            let xPos = leftMargin;
            for (let j = 0; j < 2 && (i + j) < domicileLabels.length; j++) {
                const index = i + j;
                const isChecked = formData.investorDomicile === domicileZones[index];
                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isChecked) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }
                doc.text(domicileLabels[index], xPos + 5, yPosition);
                xPos += 90;
            }
            yPosition += 8;
        }
        yPosition += 20;

        checkNewPage(60);

        // Documentation Checklist
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'DOCUMENTATION CHECKLIST', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const checklistItems = [
            { key: 'passportPhoto', label: 'Passport photograph' },
            { key: 'utilityBill', label: 'Recent Utility Bill\n(Not more than 3 months old)' },
            { key: 'validId', label: 'Valid Means of Identification\n(National ID, Driver\'s Licence, etc.)' },
            { key: 'cacForms', label: 'Copy of CAC Forms\n(C07, C02)' },
            { key: 'boardResolution', label: 'Board Resolution' }
        ];

        // Max 2 per row
        for (let i = 0; i < checklistItems.length; i += 2) {
            let xPos = leftMargin;
            for (let j = 0; j < 2 && (i + j) < checklistItems.length; j++) {
                const item = checklistItems[i + j];
                const isUploaded = formData.uploadedDocuments && formData.uploadedDocuments[item.key];

                doc.rect(xPos, yPosition - 3, 3, 3);
                if (isUploaded) {
                    doc.setFillColor(0, 0, 0);
                    doc.rect(xPos, yPosition - 3, 3, 3, 'F');
                    doc.setFillColor(255, 255, 255);
                }

                const itemLines = item.label.split('\n');
                doc.text(itemLines[0], xPos + 5, yPosition);
                if (itemLines[1]) {
                    doc.text(itemLines[1], xPos + 5, yPosition + 4);
                }
                xPos += 90;
            }
            yPosition += 12;
        }
        yPosition += 20;

        checkNewPage(40);

        // Attestations
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'ATTESTATIONS', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        const attestation1 = formData.agreedToTerms;
        const attestation2 = formData.agreedToRisks;

        doc.rect(leftMargin, yPosition - 3, 3, 3);
        if (attestation1) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('I/We agree that there will be a pre-liquidation charge of 25% of accrued returns', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('if investment(s) are liquidated before maturity.', leftMargin + 5, yPosition);
        yPosition += 12;

        doc.rect(leftMargin, yPosition - 3, 3, 3);
        if (attestation2) {
            doc.setFillColor(0, 0, 0);
            doc.rect(leftMargin, yPosition - 3, 3, 3, 'F');
            doc.setFillColor(255, 255, 255);
        }
        doc.text('I/We understand that prices fluctuate and losses in the value of my/our', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('investment may occur and the past performance is not necessarily an indication', leftMargin + 5, yPosition);
        yPosition += 4;
        doc.text('of future performance.', leftMargin + 5, yPosition);
        yPosition += 25;

        checkNewPage(50);

        // For Office Use Only
        CorporateInvestmentPDFGenerator.addSectionHeader(doc, 'For Office Use Only', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        // Account Officer, Operations Officer, Compliance Officer signatures
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

        // Footer
        yPosition = pageHeight - 15;
        doc.setFontSize(8);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, leftMargin, yPosition);
        doc.text(`Reference: PACAM-CORP-${Date.now()}`, pageWidth - rightMargin, yPosition, { align: 'right' });

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

    addFormRow: (doc, label, value, x, y, width, isLarge = false) => {
        const labelWidth = width * 0.25;
        const fieldHeight = isLarge ? 12 : 8;

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x, y);

        doc.setFont('helvetica', 'normal');
        doc.rect(x + labelWidth, y - 6, width - labelWidth, fieldHeight);

        if (isLarge && value) {
            const lines = doc.splitTextToSize(value, width - labelWidth - 4);
            doc.text(lines, x + labelWidth + 2, y - 1);
        } else {
            const valueText = String(value).substring(0, 60);
            doc.text(valueText, x + labelWidth + 2, y - 1);
        }
    },

    addFormRowDouble: (doc, label1, value1, label2, value2, x, y, width) => {
        const halfWidth = (width - 5) / 2;
        const labelWidth1 = halfWidth * 0.4;
        const labelWidth2 = halfWidth * 0.4;
        const fieldHeight = 8;

        // Left side
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label1, x, y);
        doc.setFont('helvetica', 'normal');
        doc.rect(x + labelWidth1, y - 6, halfWidth - labelWidth1, fieldHeight);
        doc.text(String(value1).substring(0, 25), x + labelWidth1 + 2, y - 1);

        // Right side
        const rightX = x + halfWidth + 5;
        doc.setFont('helvetica', 'bold');
        doc.text(label2, rightX, y);
        doc.setFont('helvetica', 'normal');
        doc.rect(rightX + labelWidth2, y - 6, halfWidth - labelWidth2, fieldHeight);
        doc.text(String(value2).substring(0, 25), rightX + labelWidth2 + 2, y - 1);
    }
};