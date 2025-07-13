// EmailIndemnityPDFGenerator.js
import jsPDF from 'jspdf';

export const EmailIndemnityPDFGenerator = {
    generateFilledPDF: (formData, variant = 'individual') => {
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
        doc.text('PAC ASSET MANAGEMENT LIMITED', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 8;

        doc.setFontSize(16);
        doc.text('EMAIL INDEMNITY AGREEMENT', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 5;

        doc.setFontSize(12);
        doc.setFont('helvetica', 'normal');
        doc.text(`(${variant.charAt(0).toUpperCase() + variant.slice(1)} Form)`, pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Date
        doc.setFontSize(10);
        const currentDate = formData.signatureDate || new Date().toLocaleDateString();
        doc.text(`Date: ${currentDate}`, pageWidth - rightMargin, yPosition, { align: 'right' });
        yPosition += 15;

        checkNewPage(25);

        // Main Agreement Text
        doc.setFontSize(11);
        doc.setFont('helvetica', 'bold');
        doc.text('Email Indemnity', leftMargin, yPosition);
        yPosition += 10;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        const agreementText = `You hereby consent to the use of electronic communication (which includes but is not limited to written communication by email, SMS, WhatsApp, etc.). By this consent, you unequivocally agree that instructions transmitted by electronic communication be binding for all purposes, including for purposes of evidence. You irrevocably undertake and warrant that you shall not make any demand or claim or institute any action against PAC Asset Management Limited should you suffer any loss or liability as a result of your consent to the use of electronic communication.

You agree to irrevocably indemnify and hold PAC Asset Management Limited harmless against all costs, claims, demands, actions, and proceedings that may be made or instituted against PAC Asset Management Limited; and all liabilities, losses, and damages which may be suffered by PAC Asset Management Limited in connection with, or arising as a result of your consent to electronic communication or PAC Asset Management's reliance on electronic communication issued from your email account or other electronic communication account indicated herein or subsequently communicated to PAC Asset Management limited by you or your nominated investment adviser or any other person you authorize to manage your account.

You acknowledge that there are certain risks associated with conveying instructions via electronic means, including, but not limited to the risk of delay, non-receipt (due to technical malfunction, disruption, connectivity issues, etc. of your system or PAC Asset Management Limited's system or any other reason), third party interception/interference, data corruption, etc., and hereby fully waive, discharge and indemnify PAC Asset Management in respect of any loss or damages resulting from any of the risks identified above/from the use of electronic communication with respect to your account.

You hereby authorize PAC Asset Management Limited to rely upon and act in accordance with any notice, demand or other communication which may from time to time be, or purport to be, given by email by you or on your behalf by any authorized persons, without inquiry on PAC Asset Management Limited's part as to the authority or identity of the person making or purporting to make such notice or demand from your email account. PAC Asset Management Limited shall be entitled to treat such notice, demand, or other communication as fully authorized by and binding upon you and shall be entitled to take such steps in connection with or in reliance upon such communication as PAC Asset Management Limited may in good faith consider appropriate.`;

        // Split text into lines that fit within the page width
        const splitText = doc.splitTextToSize(agreementText, contentWidth);

        splitText.forEach(line => {
            checkNewPage(6);
            doc.text(line, leftMargin, yPosition);
            yPosition += 4;
        });

        yPosition += 10;
        checkNewPage(40);

        // Form Fields Section
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(variant === 'corporate' ? 'COMPANY INFORMATION' : 'CONTACT INFORMATION', leftMargin, yPosition);
        yPosition += 10;

        if (variant === 'corporate') {
            // Company Name
            EmailIndemnityPDFGenerator.addFormRow(
                doc,
                'COMPANY NAME:',
                formData.companyName || '',
                leftMargin,
                yPosition,
                contentWidth
            );
            yPosition += 12;

            checkNewPage(15);

            // Official Email Address
            EmailIndemnityPDFGenerator.addFormRow(
                doc,
                'OFFICIAL EMAIL ADDRESS:',
                formData.preferredEmail || '',
                leftMargin,
                yPosition,
                contentWidth
            );
            yPosition += 20;

            checkNewPage(40);

            // Corporate Signature Section - Two signatures side by side
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(11);
            doc.text('AUTHORIZED SIGNATORIES', leftMargin, yPosition);
            yPosition += 10;

            const signatureWidth = (contentWidth - 10) / 2;
            const signatureHeight = 25;

            // First signature box
            doc.rect(leftMargin, yPosition, signatureWidth, signatureHeight);
            if (formData.primarySignature) {
                try {
                    console.log('Adding primary signature to PDF');
                    doc.addImage(formData.primarySignature, 'PNG', leftMargin + 2, yPosition + 2, signatureWidth - 4, signatureHeight - 8);
                } catch (error) {
                    console.log('Could not add primary signature to PDF:', error);
                }
            } else {
                console.log('No primary signature found');
            }

            // Second signature box
            doc.rect(leftMargin + signatureWidth + 10, yPosition, signatureWidth, signatureHeight);
            if (formData.secondarySignature) {
                try {
                    console.log('Adding secondary signature to PDF');
                    doc.addImage(formData.secondarySignature, 'PNG', leftMargin + signatureWidth + 12, yPosition + 2, signatureWidth - 4, signatureHeight - 8);
                } catch (error) {
                    console.log('Could not add secondary signature to PDF:', error);
                }
            } else {
                console.log('No secondary signature found');
            }
            yPosition += signatureHeight + 5;

            // Signature labels
            doc.setFontSize(9);
            doc.text('AUTHORIZED SIGNATORY', leftMargin + (signatureWidth / 2), yPosition, { align: 'center' });
            doc.text('AUTHORIZED SIGNATORY', leftMargin + signatureWidth + 10 + (signatureWidth / 2), yPosition, { align: 'center' });
            yPosition += 15;
        } else {
            // Individual form fields
            // Preferred Email Address
            EmailIndemnityPDFGenerator.addFormRow(
                doc,
                'PREFERRED EMAIL ADDRESS:',
                formData.preferredEmail || '',
                leftMargin,
                yPosition,
                contentWidth
            );
            yPosition += 12;

            checkNewPage(15);

            // Preferred Phone Number
            EmailIndemnityPDFGenerator.addFormRow(
                doc,
                'PREFERRED PHONE NUMBER:',
                formData.preferredPhone || '',
                leftMargin,
                yPosition,
                contentWidth
            );
            yPosition += 12;

            checkNewPage(15);

            // Name of Account Holder
            EmailIndemnityPDFGenerator.addFormRow(
                doc,
                'NAME OF ACCOUNT HOLDER:',
                formData.accountHolderName || '',
                leftMargin,
                yPosition,
                contentWidth
            );
            yPosition += 12;

            checkNewPage(15);

            // Signature and Date
            // yPosition += 10;
            // checkNewPage(30);

            // Create signature area
            const signatureHeight = 25;
            doc.rect(leftMargin, yPosition, contentWidth, signatureHeight);

            // Add signature if available
            if (formData.signature) {
                try {
                    console.log('Adding signature to PDF:', formData.signature ? 'signature present' : 'no signature');
                    doc.addImage(formData.signature, 'PNG', leftMargin + 2, yPosition + 2, contentWidth - 4, signatureHeight - 8);
                } catch (error) {
                    console.log('Could not add signature to PDF:', error);
                }
            } else {
                console.log('No signature found in formData:', formData);
            }
            yPosition += signatureHeight + 5;

            // Signature label
            doc.text('SIGNATURE & DATE:', leftMargin, yPosition);
            doc.text(currentDate, leftMargin + 60, yPosition);
            yPosition += 15;
        }

        // checkNewPage(30);

        // Footer
        doc.setFontSize(8);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated on: ${new Date().toLocaleString()}`, leftMargin, yPosition);
        doc.text(`Reference: PACAM-INDEMNITY-${Date.now()}`, pageWidth - rightMargin, yPosition, { align: 'right' });

        return doc;
    },

    addFormRow: (doc, label, value, x, y, width) => {
        const fieldHeight = 8;

        // Draw main border
        doc.rect(x, y - 6, width, fieldHeight);

        // Add label
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(9);
        doc.text(label, x + 2, y - 1);

        // Add value
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);

        // Position value text to avoid overlap with label
        const labelWidth = doc.getTextWidth(label) + 10;
        const valueX = Math.max(x + labelWidth, x + width * 0.3);

        // Ensure value fits within the field
        const availableWidth = width - (valueX - x) - 5;
        const truncatedValue = doc.splitTextToSize(value, availableWidth)[0] || '';

        doc.text(truncatedValue, valueX, y - 1);
    }
};