// EurobondPDFGenerator.js
import jsPDF from 'jspdf';

export const EurobondPDFGenerator = {
    generateFilledPDF: (formData) => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        let yPosition = 20;
        const pageWidth = 210;
        const pageHeight = 297;
        const leftMargin = 20;
        const rightMargin = 20;
        const bottomMargin = 25;
        const contentWidth = pageWidth - leftMargin - rightMargin;

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
        doc.text('PACAM EUROBOND FUND', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 8;

        doc.setFontSize(16);
        doc.text('REDEMPTION FORM', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Date
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        const currentDate = formData.date || new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, pageWidth - rightMargin, yPosition, { align: 'right' });
        yPosition += 15;

        checkNewPage(25);

        // Personal Information Section
        EurobondPDFGenerator.addFormRow(doc, 'FULL NAME (as printed on Fund Statement):', formData.fullName || '', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        checkNewPage(15);

        // Client ID and Phone (side by side)
        EurobondPDFGenerator.addFormRowSplit(doc,
            'CLIENT ID:', formData.clientId || '',
            'TELEPHONE NUMBER:', formData.telephoneNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);

        // Email
        EurobondPDFGenerator.addFormRow(doc, 'EMAIL:', formData.email || '', leftMargin, yPosition, contentWidth);
        yPosition += 20;

        checkNewPage(30);

        // Redemption Details Section
        EurobondPDFGenerator.addSectionHeader(doc, 'REDEMPTION DETAILS (TO BE COMPLETED BY ALL CLIENTS)', leftMargin, yPosition);
        yPosition += 12;

        EurobondPDFGenerator.addFormRow(doc, 'Value/Number of Units to be redeemed (in figures):', formData.unitsToRedeemFigures || '', leftMargin, yPosition, contentWidth);
        yPosition += 12;

        checkNewPage(15);

        EurobondPDFGenerator.addFormRow(doc, 'Value/Number of Units to be redeemed (in words):', formData.unitsToRedeemWords || '', leftMargin, yPosition, contentWidth);
        yPosition += 20;

        checkNewPage(30);

        // Payment Details Section
        EurobondPDFGenerator.addSectionHeader(doc, 'PAYMENT DETAILS', leftMargin, yPosition);
        yPosition += 12;

        // Bank and Branch
        EurobondPDFGenerator.addFormRowSplit(doc,
            'BANK:', formData.bank || '',
            'BRANCH:', formData.branch || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);

        // Sort Code and Account Number
        EurobondPDFGenerator.addFormRowSplit(doc,
            'SORT CODE:', formData.sortCode || '',
            'A/C No.:', formData.accountNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);

        // Account Name
        EurobondPDFGenerator.addFormRow(doc, 'ACCOUNT NAME:', formData.accountName || '', leftMargin, yPosition, contentWidth);
        yPosition += 20;

        checkNewPage(20);

        // Statement text
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Kindly effect the redemption of the above stated number of units held in my/our name(s)', leftMargin, yPosition);
        yPosition += 5;
        doc.text('at the bid price prevailing on the date of redemption.', leftMargin, yPosition);
        yPosition += 5;
        doc.text('Please find attached the relevant unit Certificate evidencing my/our unit holding.', leftMargin, yPosition);
        yPosition += 20;

        checkNewPage(50);

        // Enhanced Signature Section
        const signatureWidth = (contentWidth - 10) / 2;
        const signatureHeight = 30;

        // Primary signature box
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text('Signature of Redeeming Unit Holder', leftMargin + (signatureWidth / 2), yPosition, { align: 'center' });
        yPosition += 5;

        doc.rect(leftMargin, yPosition, signatureWidth, signatureHeight);
        if (formData.primarySignature) {
            try {
                doc.addImage(formData.primarySignature, 'PNG', leftMargin + 2, yPosition + 2, signatureWidth - 4, signatureHeight - 4);
            } catch (error) {
                console.log('Could not add primary signature to PDF:', error);
            }
        }

        // Joint signature box
        doc.text('Signature of Joint Redeeming Unit Holder', leftMargin + signatureWidth + 10 + (signatureWidth / 2), yPosition - 5, { align: 'center' });
        doc.rect(leftMargin + signatureWidth + 10, yPosition, signatureWidth, signatureHeight);
        if (formData.jointSignature) {
            try {
                doc.addImage(formData.jointSignature, 'PNG', leftMargin + signatureWidth + 12, yPosition + 2, signatureWidth - 4, signatureHeight - 4);
            } catch (error) {
                console.log('Could not add joint signature to PDF:', error);
            }
        }
        yPosition += signatureHeight + 15;

        checkNewPage(60);

        // Fund Manager and Registrar sections side by side
        const halfWidth = (contentWidth - 10) / 2;

        // Fund Manager Use Only Section
        EurobondPDFGenerator.addSectionHeader(doc, 'FOR FUND MANAGER\'S USE ONLY', leftMargin, yPosition);
        EurobondPDFGenerator.addSectionHeader(doc, 'FOR REGISTRAR\'S USE ONLY', leftMargin + halfWidth + 10, yPosition);
        yPosition += 12;

        // Fund Manager fields
        const fundManagerFields = [
            'Total Number of Redeemed Units:',
            'Applicable Bid Price:',
            'Gross Value of Redeemed Units:',
            'Less: Charges (if applicable):',
            'Net Amount Payable:'
        ];

        fundManagerFields.forEach((field, index) => {
            checkNewPage(12);
            EurobondPDFGenerator.addFormRowSmall(doc, field, '', leftMargin, yPosition, halfWidth);
            yPosition += 10;
        });

        // Reset position for registrar box
        yPosition -= (fundManagerFields.length * 10);

        // Registrar box
        const registrarBoxHeight = fundManagerFields.length * 10 + 5;
        doc.rect(leftMargin + halfWidth + 10, yPosition, halfWidth, registrarBoxHeight);

        // Processed by field at bottom of registrar section
        yPosition += registrarBoxHeight + 10;
        EurobondPDFGenerator.addFormRow(doc, 'Processed by:', '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(50);

        // Company Seal Section
        EurobondPDFGenerator.addSectionHeader(doc, 'AFFIX COMPANY SEAL', leftMargin, yPosition);
        yPosition += 10;

        const sealWidth = contentWidth;
        const sealHeight = 30;
        doc.rect(leftMargin, yPosition, sealWidth, sealHeight);
        yPosition += sealHeight + 15;

        checkNewPage(60);

        // Certificate Details Section
        EurobondPDFGenerator.addSectionHeader(doc, 'DETAILS OF ATTACHED UNIT CERTIFICATE', leftMargin, yPosition);
        yPosition += 12;

        EurobondPDFGenerator.addFormRowSplit(doc,
            'Certificate Nos:', formData.certificateNumbers || '',
            'Previous Redemption:', formData.previousRedemption || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);

        EurobondPDFGenerator.addFormRowSplit(doc,
            'Total Number of Units:', formData.totalUnits || '',
            'Balance:', formData.balance || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 12;

        checkNewPage(15);

        EurobondPDFGenerator.addFormRow(doc, 'Current Redemption:', formData.currentRedemption || '', leftMargin, yPosition, contentWidth);
        yPosition += 20;

        checkNewPage(40);

        // Important Notes
        EurobondPDFGenerator.addSectionHeader(doc, 'Note:', leftMargin, yPosition);
        yPosition += 10;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        const notes = [
            '- For redemptions within 90 days, 10% of the positive total returns of the units being redeemed will be charged on the date of redemption.',
            '- Upon redemption, payment will only be made in the name of the unit holder(s)',
            '- In the case of partial redemption, the balance Fund Statement will be sent to the email address provided by the client and copied to the fund manager.'
        ];

        notes.forEach(note => {
            checkNewPage(15);
            const lines = doc.splitTextToSize(note, contentWidth - 5);
            doc.text(lines, leftMargin, yPosition);
            yPosition += lines.length * 4 + 2;
        });

        yPosition += 10;

        // Footer
        checkNewPage(15);
        doc.setFontSize(8);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, leftMargin, yPosition);
        doc.text(`Reference: PACAM-EUROBOND-${Date.now()}`, pageWidth - rightMargin, yPosition, { align: 'right' });

        return doc;
    },

    addSectionHeader: (doc, title, x, y) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(title, x, y);
        doc.setFont('helvetica', 'normal');
    },

    addFormRow: (doc, label, value, x, y, width) => {
        const labelWidth = width * 0.4;
        const fieldHeight = 8;

        // Draw border
        doc.rect(x, y - 6, width, fieldHeight);
        doc.rect(x, y - 6, labelWidth, fieldHeight);

        // Add text with proper positioning
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        const valueText = String(value).substring(0, 50);
        doc.text(valueText, x + labelWidth + 2, y - 1);
    },

    addFormRowSmall: (doc, label, value, x, y, width) => {
        const labelWidth = width * 0.6;
        const fieldHeight = 8;

        // Draw border
        doc.rect(x, y - 6, width, fieldHeight);
        doc.rect(x, y - 6, labelWidth, fieldHeight);

        // Add text with proper positioning
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        doc.text(label, x + 2, y - 1);

        const valueText = String(value).substring(0, 20);
        doc.text(valueText, x + labelWidth + 2, y - 1);
    },

    addFormRowSplit: (doc, label1, value1, label2, value2, x, y, width) => {
        const halfWidth = (width - 5) / 2;
        const labelWidth = halfWidth * 0.45;
        const fieldHeight = 8;

        // Left side
        doc.rect(x, y - 6, halfWidth, fieldHeight);
        doc.rect(x, y - 6, labelWidth, fieldHeight);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label1, x + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        const value1Text = String(value1).substring(0, 15);
        doc.text(value1Text, x + labelWidth + 2, y - 1);

        // Right side
        const rightX = x + halfWidth + 5;
        doc.rect(rightX, y - 6, halfWidth, fieldHeight);
        doc.rect(rightX, y - 6, labelWidth, fieldHeight);

        doc.setFont('helvetica', 'bold');
        doc.text(label2, rightX + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        const value2Text = String(value2).substring(0, 15);
        doc.text(value2Text, rightX + labelWidth + 2, y - 1);
    }
};