// EmailService.js
export const EmailService = {
    sendEmail: async (to, subject, body, apiKey) => {
        try {
            const response = await fetch('https://api.useplunk.com/v1/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${apiKey}`
                },
                body: JSON.stringify({
                    to: to,
                    subject: subject,
                    body: body,
                    type: 'html'
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Email sending failed: ${errorData.message || response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Email sending error:', error);
            throw error;
        }
    },

    // Batch email sending for multiple recipients
    sendBatchEmails: async (emails, apiKey) => {
        const results = [];

        for (const email of emails) {
            try {
                const result = await EmailService.sendEmail(
                    email.to,
                    email.subject,
                    email.body,
                    apiKey
                );
                results.push({ success: true, email: email.to, result });
            } catch (error) {
                results.push({ success: false, email: email.to, error: error.message });
            }
        }

        return results;
    },

    // Validate email address
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
};