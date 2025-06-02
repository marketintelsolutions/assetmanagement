// PDFGenerator.js
import jsPDF from 'jspdf';

export const PDFGenerator = {
    generateFilledPDF: (formData) => {
        const doc = new jsPDF('portrait', 'mm', 'a4');

        let yPosition = 20;
        const pageWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
        const leftMargin = 20;
        const rightMargin = 20;
        const bottomMargin = 20;
        const contentWidth = pageWidth - leftMargin - rightMargin;

        // Function to check if we need a new page
        const checkNewPage = (requiredSpace = 15) => {
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
        doc.text('PACAM Balanced Fund', pageWidth / 2, yPosition, { align: 'center' });
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
        PDFGenerator.addSectionHeader(doc, 'PERSONAL INFORMATION', leftMargin, yPosition);
        yPosition += 10;

        // Full Name - Fixed the overlay issue
        PDFGenerator.addFormRow(doc, 'Full Name (as on Fund Statement):', formData.fullName || '', leftMargin, yPosition, contentWidth);
        yPosition += 10; // Increased spacing

        checkNewPage(15);

        // Client ID and Phone (side by side)
        PDFGenerator.addFormRowSplit(doc,
            'Client ID:', formData.clientId || '',
            'Telephone:', formData.telephoneNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 10; // Increased spacing

        checkNewPage(15);

        // Email
        PDFGenerator.addFormRow(doc, 'Email:', formData.email || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(25);

        // Redemption Details Section
        PDFGenerator.addSectionHeader(doc, 'REDEMPTION DETAILS', leftMargin, yPosition);
        yPosition += 10;

        PDFGenerator.addFormRow(doc, 'Units to Redeem (Figures):', formData.unitsToRedeemFigures || '', leftMargin, yPosition, contentWidth);
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRow(doc, 'Units to Redeem (Words):', formData.unitsToRedeemWords || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(30);

        // Payment Details Section
        PDFGenerator.addSectionHeader(doc, 'PAYMENT DETAILS', leftMargin, yPosition);
        yPosition += 10;

        // Bank and Branch
        PDFGenerator.addFormRowSplit(doc,
            'Bank:', formData.bank || '',
            'Branch:', formData.branch || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 10;

        checkNewPage(15);

        // Sort Code and Account Number
        PDFGenerator.addFormRowSplit(doc,
            'Sort Code:', formData.sortCode || '',
            'Account No.:', formData.accountNumber || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 10;

        checkNewPage(15);

        // Account Name
        PDFGenerator.addFormRow(doc, 'Account Name:', formData.accountName || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(20);

        // Statement text
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');
        doc.text('Kindly effect the redemption of the above stated number of units held in my/our name(s)', leftMargin, yPosition);
        yPosition += 5;
        doc.text('at the bid price prevailing on the date of redemption.', leftMargin, yPosition);
        yPosition += 5;
        doc.text('Please find attached the relevant unit Certificate evidencing my/our unit holding.', leftMargin, yPosition);
        yPosition += 15;

        checkNewPage(40);

        // Signature Section
        PDFGenerator.addSectionHeader(doc, 'SIGNATURES', leftMargin, yPosition);
        yPosition += 10;

        const signatureWidth = (contentWidth - 10) / 2;
        const signatureHeight = 25;

        // Primary signature box
        doc.rect(leftMargin, yPosition, signatureWidth, signatureHeight);
        if (formData.primarySignature) {
            try {
                doc.addImage(formData.primarySignature, 'PNG', leftMargin + 2, yPosition + 2, signatureWidth - 4, signatureHeight - 8);
            } catch (error) {
                console.log('Could not add primary signature to PDF:', error);
            }
        }

        // Joint signature box
        doc.rect(leftMargin + signatureWidth + 10, yPosition, signatureWidth, signatureHeight);
        if (formData.jointSignature) {
            try {
                doc.addImage(formData.jointSignature, 'PNG', leftMargin + signatureWidth + 12, yPosition + 2, signatureWidth - 4, signatureHeight - 8);
            } catch (error) {
                console.log('Could not add joint signature to PDF:', error);
            }
        }
        yPosition += signatureHeight + 5;

        // Signature labels
        doc.setFontSize(9);
        doc.text('Signature of Redeeming Unit Holder', leftMargin + (signatureWidth / 2), yPosition, { align: 'center' });
        doc.text('Signature of Joint Redeeming Unit Holder', leftMargin + signatureWidth + 10 + (signatureWidth / 2), yPosition, { align: 'center' });
        yPosition += 15;

        checkNewPage(40);

        PDFGenerator.addSectionHeader(doc, 'AFFIX COMPANY SEAL', leftMargin, yPosition);
        yPosition += 5;

        const sealWidth = contentWidth;
        const sealHeight = 25;

        // registrar box
        doc.rect(leftMargin, yPosition, sealWidth, sealHeight);
        yPosition += sealHeight + 15;
        checkNewPage(40);

        // Certificate Details Section
        PDFGenerator.addSectionHeader(doc, 'DETAILS OF ATTACHED UNIT CERTIFICATE', leftMargin, yPosition);
        yPosition += 10;

        PDFGenerator.addFormRowSplit(doc,
            'Certificate Nos:', formData.certificateNumbers || '',
            'Previous Redemption:', formData.previousRedemption || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRowSplit(doc,
            'Total Units:', formData.totalUnits || '',
            'Balance:', formData.balance || '',
            leftMargin, yPosition, contentWidth
        );
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRow(doc, 'Current Redemption:', formData.currentRedemption || '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(35);

        // Fund Manager Use Only Section
        PDFGenerator.addSectionHeader(doc, 'FOR FUND MANAGER USE ONLY', leftMargin, yPosition);
        yPosition += 10;


        PDFGenerator.addFormRow(doc, 'Total Number of Redeemed Units:', '', leftMargin, yPosition, contentWidth);
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRow(doc, 'Applicable Bid Price:', '', leftMargin, yPosition, contentWidth);
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRow(doc, 'Gross Value of Redeemed Units:', '', leftMargin, yPosition, contentWidth);
        yPosition += 10;

        checkNewPage(15);

        PDFGenerator.addFormRow(doc, 'Less: Charges (if applicable):', '', leftMargin, yPosition, contentWidth);
        yPosition += 10;

        checkNewPage(15);



        PDFGenerator.addFormRow(doc, 'Net Amount Payable:', '', leftMargin, yPosition, contentWidth);
        yPosition += 15;

        checkNewPage(35);

        PDFGenerator.addSectionHeader(doc, 'FOR REGISTRAR USE ONLY', leftMargin, yPosition);
        yPosition += 5;

        const registrarWidth = contentWidth;
        const registrarHeight = 25;

        // registrar box
        doc.rect(leftMargin, yPosition, registrarWidth, registrarHeight);
        yPosition += registrarHeight + 15;
        checkNewPage(40);



        // Important Notes
        PDFGenerator.addSectionHeader(doc, 'IMPORTANT NOTES', leftMargin, yPosition);
        yPosition += 8;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8);
        const notes = [
            '• 10% of the positive total returns of the units being redeemed will be charged on the date of redemption.',
            '• Upon redemption, payment will only be made in the name of the unit holder(s).',
            '• In the case of partial redemption, the balance Fund Statement will be sent to the email address provided.'
        ];

        notes.forEach(note => {
            checkNewPage(8);
            doc.text(note, leftMargin, yPosition);
            yPosition += 4;
        });

        yPosition += 10;

        checkNewPage(15);

        // Footer
        doc.setFontSize(8);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, leftMargin, yPosition);
        doc.text(`Reference: PACAM-${Date.now()}`, pageWidth - rightMargin, yPosition, { align: 'right' });

        return doc;
    },

    addSectionHeader: (doc, title, x, y) => {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(title, x, y);
    },

    addFormRow: (doc, label, value, x, y, width) => {
        const labelWidth = width * 0.35; // Increased label width
        const fieldHeight = 8;

        // Draw border
        doc.rect(x, y - 6, width, fieldHeight);
        doc.rect(x, y - 6, labelWidth, fieldHeight);

        // Add text with proper positioning
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        // Ensure value text doesn't overlap with label
        const valueText = String(value).substring(0, 40); // Limit text length
        doc.text(valueText, x + labelWidth + 2, y - 1);
    },

    addFormRowSplit: (doc, label1, value1, label2, value2, x, y, width) => {
        const halfWidth = (width - 5) / 2;
        const labelWidth = halfWidth * 0.45; // Increased label width
        const fieldHeight = 8;

        // Left side
        doc.rect(x, y - 6, halfWidth, fieldHeight);
        doc.rect(x, y - 6, labelWidth, fieldHeight);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label1, x + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        const value1Text = String(value1).substring(0, 15); // Limit text length
        doc.text(value1Text, x + labelWidth + 2, y - 1);

        // Right side
        const rightX = x + halfWidth + 5;
        doc.rect(rightX, y - 6, halfWidth, fieldHeight);
        doc.rect(rightX, y - 6, labelWidth, fieldHeight);

        doc.setFont('helvetica', 'bold');
        doc.text(label2, rightX + 2, y - 1);

        doc.setFont('helvetica', 'normal');
        const value2Text = String(value2).substring(0, 15); // Limit text length
        doc.text(value2Text, rightX + labelWidth + 2, y - 1);
    },

    createSignatureAttachment: (signatureData, filename) => {
        if (!signatureData) return null;

        // Extract base64 data from data URL
        const base64Data = signatureData.split(',')[1];

        return {
            filename: filename,
            content: base64Data,
            type: 'image/png',
            disposition: 'attachment'
        };
    }
};