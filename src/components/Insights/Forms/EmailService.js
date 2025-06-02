// EmailService.js
export const EmailService = {
    // Main email sending function
    sendEmail: async (to, subject, body, apiKey, attachments = []) => {
        try {
            // Validate inputs
            if (!to || !subject || !body || !apiKey) {
                throw new Error('Missing required parameters: to, subject, body, and apiKey are required');
            }

            // Validate email format
            if (!EmailService.validateEmail(to)) {
                throw new Error(`Invalid email address: ${to}`);
            }

            const payload = {
                to: to,
                subject: subject,
                body: body,
                type: 'html'
            };

            // Add attachments if provided
            if (attachments && attachments.length > 0) {
                // Validate attachment structure
                for (const attachment of attachments) {
                    if (!attachment.filename || !attachment.content || !attachment.type) {
                        throw new Error('Invalid attachment structure: filename, content, and type are required');
                    }
                }

                payload.attachments = attachments;
                console.log(`Preparing email with ${attachments.length} attachments:`,
                    attachments.map(att => ({
                        filename: att.filename,
                        type: att.type,
                        size: `${Math.round(att.content.length * 0.75 / 1024)}KB`
                    })));
            }

            // Log email attempt
            console.log(`Sending email to: ${to}`);
            console.log(`Subject: ${subject}`);
            console.log(`Attachments: ${attachments.length}`);

            const response = await fetch('https://api.useplunk.com/v1/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                let errorMessage = `HTTP ${response.status}: ${response.statusText}`;

                try {
                    const errorData = await response.json();
                    errorMessage = `Email sending failed: ${errorData.message || errorData.error || errorMessage}`;
                } catch (parseError) {
                    errorMessage = `Email sending failed: ${errorMessage}`;
                }

                throw new Error(errorMessage);
            }

            const result = await response.json();
            console.log('Email sent successfully:', {
                to,
                subject,
                attachmentCount: attachments.length,
                messageId: result.id || 'unknown'
            });

            return result;
        } catch (error) {
            console.error('Email sending error:', {
                error: error.message,
                to,
                subject,
                attachmentCount: attachments.length
            });
            throw error;
        }
    },

    // Batch email sending for multiple recipients
    sendBatchEmails: async (emails, apiKey) => {
        if (!Array.isArray(emails) || emails.length === 0) {
            throw new Error('Emails must be a non-empty array');
        }

        const results = [];
        const batchSize = 5; // Process in batches to avoid overwhelming the API

        for (let i = 0; i < emails.length; i += batchSize) {
            const batch = emails.slice(i, i + batchSize);
            const batchPromises = batch.map(async (email) => {
                try {
                    const result = await EmailService.sendEmail(
                        email.to,
                        email.subject,
                        email.body,
                        apiKey,
                        email.attachments || []
                    );
                    return {
                        success: true,
                        email: email.to,
                        result,
                        index: i + batch.indexOf(email)
                    };
                } catch (error) {
                    return {
                        success: false,
                        email: email.to,
                        error: error.message,
                        index: i + batch.indexOf(email)
                    };
                }
            });

            const batchResults = await Promise.all(batchPromises);
            results.push(...batchResults);

            // Add delay between batches to respect rate limits
            if (i + batchSize < emails.length) {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }

        // Sort results by original index to maintain order
        results.sort((a, b) => a.index - b.index);

        const summary = {
            total: emails.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            results: results.map(({ index, ...rest }) => rest) // Remove index from final results
        };

        console.log('Batch email summary:', summary);
        return summary;
    },

    // Send email with PDF attachment specifically
    sendEmailWithPDF: async (to, subject, body, pdfData, filename, apiKey, additionalAttachments = []) => {
        try {
            const pdfAttachment = EmailService.createPDFAttachment(pdfData, filename);
            const allAttachments = [pdfAttachment, ...additionalAttachments];

            return await EmailService.sendEmail(to, subject, body, apiKey, allAttachments);
        } catch (error) {
            console.error('Email with PDF sending error:', error);
            throw error;
        }
    },

    // Send email with signature attachments
    sendEmailWithSignatures: async (to, subject, body, signatures, apiKey, additionalAttachments = []) => {
        try {
            const signatureAttachments = [];

            if (signatures.primary) {
                signatureAttachments.push(EmailService.createImageAttachment(
                    signatures.primary,
                    'primary_signature.png'
                ));
            }

            if (signatures.joint) {
                signatureAttachments.push(EmailService.createImageAttachment(
                    signatures.joint,
                    'joint_signature.png'
                ));
            }

            const allAttachments = [...signatureAttachments, ...additionalAttachments];

            return await EmailService.sendEmail(to, subject, body, apiKey, allAttachments);
        } catch (error) {
            console.error('Email with signatures sending error:', error);
            throw error;
        }
    },

    // Validate email address using comprehensive regex
    validateEmail: (email) => {
        if (!email || typeof email !== 'string') {
            return false;
        }

        // Comprehensive email validation regex
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        // Basic format check
        if (!emailRegex.test(email)) {
            return false;
        }

        // Additional checks
        if (email.length > 254) { // RFC 5321 limit
            return false;
        }

        const parts = email.split('@');
        if (parts[0].length > 64) { // Local part limit
            return false;
        }

        return true;
    },

    // Validate multiple email addresses
    validateEmails: (emails) => {
        if (!Array.isArray(emails)) {
            return { valid: false, invalidEmails: [], message: 'Input must be an array' };
        }

        const invalidEmails = emails.filter(email => !EmailService.validateEmail(email));

        return {
            valid: invalidEmails.length === 0,
            invalidEmails,
            message: invalidEmails.length > 0
                ? `Invalid email addresses: ${invalidEmails.join(', ')}`
                : 'All email addresses are valid'
        };
    },

    // Format email addresses for batch sending
    formatBatchEmails: (recipients, subject, body, attachments = null) => {
        if (!Array.isArray(recipients)) {
            throw new Error('Recipients must be an array');
        }

        return recipients.map((recipient, index) => {
            // Handle both string emails and recipient objects
            const email = typeof recipient === 'string' ? recipient : recipient.email;
            const name = typeof recipient === 'object' ? recipient.name : '';

            if (!EmailService.validateEmail(email)) {
                throw new Error(`Invalid email address at index ${index}: ${email}`);
            }

            return {
                to: email,
                subject: subject.replace(/\{name\}/g, name || ''),
                body: body.replace(/\{name\}/g, name || ''),
                attachments: attachments || []
            };
        });
    },

    // Create attachment from base64 data
    createAttachment: (base64Data, filename, mimeType = 'application/octet-stream') => {
        if (!base64Data || !filename) {
            throw new Error('Base64 data and filename are required for attachment');
        }

        // Remove data URL prefix if present (e.g., "data:image/png;base64,")
        const cleanBase64 = base64Data.includes(',')
            ? base64Data.split(',')[1]
            : base64Data;

        // Validate base64 format
        try {
            atob(cleanBase64);
        } catch (error) {
            throw new Error('Invalid base64 data provided for attachment');
        }

        return {
            filename: filename,
            content: cleanBase64,
            type: mimeType,
            disposition: 'attachment'
        };
    },

    // Create PDF attachment specifically
    createPDFAttachment: (pdfBase64, filename) => {
        if (!filename.toLowerCase().endsWith('.pdf')) {
            filename += '.pdf';
        }
        return EmailService.createAttachment(pdfBase64, filename, 'application/pdf');
    },

    // Create image attachment specifically
    createImageAttachment: (imageBase64, filename, imageType = 'png') => {
        const validImageTypes = ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'];

        if (!validImageTypes.includes(imageType.toLowerCase())) {
            throw new Error(`Unsupported image type: ${imageType}. Supported types: ${validImageTypes.join(', ')}`);
        }

        if (!filename.toLowerCase().includes('.')) {
            filename += `.${imageType}`;
        }

        return EmailService.createAttachment(imageBase64, filename, `image/${imageType}`);
    },

    // Helper to validate attachment size (most email services have limits)
    validateAttachmentSize: (attachments, maxSizeMB = 25) => {
        if (!Array.isArray(attachments)) {
            throw new Error('Attachments must be an array');
        }

        const maxSizeBytes = maxSizeMB * 1024 * 1024;
        let totalSize = 0;

        for (const attachment of attachments) {
            if (!attachment.content) {
                continue;
            }

            // Calculate actual size from base64 (more accurate than estimation)
            const sizeBytes = (attachment.content.length * 3) / 4;
            totalSize += sizeBytes;

            // Check individual file size (10MB per file limit)
            const fileSizeMB = sizeBytes / 1024 / 1024;
            if (fileSizeMB > 10) {
                throw new Error(`File "${attachment.filename}" is too large (${fileSizeMB.toFixed(1)}MB). Maximum size per file is 10MB.`);
            }
        }

        if (totalSize > maxSizeBytes) {
            const totalSizeMB = totalSize / 1024 / 1024;
            throw new Error(`Total attachment size (${totalSizeMB.toFixed(1)}MB) exceeds limit (${maxSizeMB}MB)`);
        }

        console.log(`Attachment validation passed: ${attachments.length} files, total size: ${(totalSize / 1024 / 1024).toFixed(1)}MB`);
        return true;
    },

    // Create HTML email template wrapper
    wrapInTemplate: (content, title = 'Email from PACAM') => {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f8fafc;
        }
        .email-container {
            background: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, #1e40af 0%, #1e40afdd 100%);
            color: white;
            padding: 30px;
            text-align: center;
        }
        .email-content {
            padding: 30px;
        }
        .email-footer {
            background: #f8fafc;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e2e8f0;
        }
        .attachment-list {
            background: #f0f9ff;
            border: 1px solid #0369a1;
            border-radius: 8px;
            padding: 15px;
            margin: 15px 0;
        }
        .attachment-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin: 5px 0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>PACAM Balanced Fund</h1>
        </div>
        <div class="email-content">
            ${content}
        </div>
        <div class="email-footer">
            <p>© ${new Date().getFullYear()} PACAM Asset Management. All rights reserved.</p>
            <p>This email was generated automatically. Please do not reply to this email.</p>
            <p>For support, contact: info@pacam.com</p>
        </div>
    </div>
</body>
</html>`;
    },

    // Retry mechanism for failed email sends
    sendEmailWithRetry: async (to, subject, body, apiKey, attachments = [], maxRetries = 3, retryDelay = 2000) => {
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`Email attempt ${attempt}/${maxRetries} to ${to}`);
                const result = await EmailService.sendEmail(to, subject, body, apiKey, attachments);

                if (attempt > 1) {
                    console.log(`Email succeeded on attempt ${attempt}`);
                }

                return result;
            } catch (error) {
                lastError = error;
                console.warn(`Email attempt ${attempt} failed:`, error.message);

                // Don't retry on certain errors (invalid email, authentication, etc.)
                if (error.message.includes('Invalid email') ||
                    error.message.includes('unauthorized') ||
                    error.message.includes('forbidden')) {
                    throw error;
                }

                if (attempt < maxRetries) {
                    console.log(`Retrying in ${retryDelay}ms...`);
                    await new Promise(resolve => setTimeout(resolve, retryDelay));
                    retryDelay *= 1.5; // Exponential backoff
                }
            }
        }

        throw new Error(`Failed to send email after ${maxRetries} attempts. Last error: ${lastError.message}`);
    },

    // Get email service status and limits
    getServiceInfo: () => {
        return {
            maxAttachmentSize: '25MB total',
            maxFileSize: '10MB per file',
            supportedImageTypes: ['png', 'jpg', 'jpeg', 'gif', 'bmp', 'webp'],
            supportedDocumentTypes: ['pdf'],
            rateLimits: 'Batch processing with 1s delays',
            retryPolicy: 'Up to 3 attempts with exponential backoff'
        };
    },

    // Utility to clean and sanitize email content
    sanitizeEmailContent: (htmlContent) => {
        // Basic HTML sanitization for email content
        return htmlContent
            .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
            .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '') // Remove iframes
            .replace(/javascript:/gi, '') // Remove javascript: protocols
            .replace(/on\w+\s*=/gi, ''); // Remove event handlers
    }
};