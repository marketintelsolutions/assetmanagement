// services/apiClient.js - Updated with Equity Fund Support
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

// Create axios instance with default config
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    // timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for logging and auth
apiClient.interceptors.request.use(
    (config) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
    (response) => {
        console.log(`Response from ${response.config.url}:`, response.status);
        return response;
    },
    (error) => {
        console.error('Response interceptor error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

// API Service methods
export const apiService = {
    // Corporate Investment methods
    corporateInvestment: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/corporate-investment/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Corporate investment submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/corporate-investment/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Corporate investment validation error:', error);
                throw error;
            }
        },

        getStatus: async (companyName, referenceId = null) => {
            try {
                const params = { companyName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/corporate-investment/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Corporate investment status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/corporate-investment/health');
                return response.data;
            } catch (error) {
                console.error('Corporate investment health check error:', error);
                throw error;
            }
        },
    },
    emailIndemnity: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/email-indemnity/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Corporate investment submission error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/email-indemnity/health');
                return response.data;
            } catch (error) {
                console.error('Corporate investment health check error:', error);
                throw error;
            }
        },
    },

    // Mutual Fund methods
    mutualFund: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/mutual-fund/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Mutual fund submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/mutual-fund/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Mutual fund validation error:', error);
                throw error;
            }
        },

        getStatus: async (applicantName, referenceId = null) => {
            try {
                const params = { applicantName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/mutual-fund/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Mutual fund status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/mutual-fund/health');
                return response.data;
            } catch (error) {
                console.error('Mutual fund health check error:', error);
                throw error;
            }
        },
    },

    // Equity Fund methods
    equityFund: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/equity-fund/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Equity fund submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/equity-fund/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Equity fund validation error:', error);
                throw error;
            }
        },

        getStatus: async (clientName, referenceId = null) => {
            try {
                const params = { clientName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/equity-fund/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Equity fund status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/equity-fund/health');
                return response.data;
            } catch (error) {
                console.error('Equity fund health check error:', error);
                throw error;
            }
        },
    },

    // Eurobond Fund methods
    eurobondFund: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/eurobond-fund/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Eurobond fund submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/eurobond-fund/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Eurobond fund validation error:', error);
                throw error;
            }
        },

        getStatus: async (clientName, referenceId = null) => {
            try {
                const params = { clientName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/eurobond-fund/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Eurobond fund status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/eurobond-fund/health');
                return response.data;
            } catch (error) {
                console.error('Eurobond fund health check error:', error);
                throw error;
            }
        },
    },

    // Money Market Fund methods
    moneyMarketFund: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/money-market-fund/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Money Market fund submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/money-market-fund/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Money Market fund validation error:', error);
                throw error;
            }
        },

        getStatus: async (clientName, referenceId = null) => {
            try {
                const params = { clientName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/money-market-fund/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Money Market fund status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/money-market-fund/health');
                return response.data;
            } catch (error) {
                console.error('Money Market fund health check error:', error);
                throw error;
            }
        },
    },


    // Fixed Income Redemption Fund methods
    fixedIncomeFund: {
        submit: async (formData, pdfContent, adminEmail, attachments = []) => {
            try {
                const response = await apiClient.post('/fixed-income-fund/submit', {
                    formData,
                    pdfContent,
                    adminEmail,
                    attachments,
                });
                return response.data;
            } catch (error) {
                console.error('Fixed Income Redemption submission error:', error);
                throw error;
            }
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/fixed-income-fund/validate', {
                    formData,
                });
                return response.data;
            } catch (error) {
                console.error('Fixed Income Redemption validation error:', error);
                throw error;
            }
        },

        getStatus: async (clientName, referenceId = null) => {
            try {
                const params = { clientName };
                if (referenceId) params.referenceId = referenceId;

                const response = await apiClient.get('/fixed-income-fund/status', {
                    params,
                });
                return response.data;
            } catch (error) {
                console.error('Fixed Income Redemption status check error:', error);
                throw error;
            }
        },

        healthCheck: async () => {
            try {
                const response = await apiClient.get('/fixed-income-fund/health');
                return response.data;
            } catch (error) {
                console.error('Fixed Income Redemption health check error:', error);
                throw error;
            }
        },
    },

    // Email methods
    email: {
        sendTest: async (testEmail) => {
            try {
                const response = await apiClient.post('/email/test', {
                    testEmail,
                });
                return response.data;
            } catch (error) {
                console.error('Email test error:', error);
                throw error;
            }
        },

        checkStatus: async () => {
            try {
                const response = await apiClient.get('/email/status');
                return response.data;
            } catch (error) {
                console.error('Email status check error:', error);
                throw error;
            }
        },
    },

    // Health check for entire API
    healthCheck: async () => {
        try {
            const response = await apiClient.get('/health');
            return response.data;
        } catch (error) {
            console.error('API health check error:', error);
            throw error;
        }
    },
};

// Utility functions for error handling and retries
export const apiUtils = {
    // Retry mechanism for failed requests
    retry: async (apiCall, maxRetries = 1, delay = 1000) => {
        let lastError;

        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                console.log(`API call attempt ${attempt}/${maxRetries}`);
                const result = await apiCall();
                console.log(`API call succeeded on attempt ${attempt}`);
                return result;
            } catch (error) {
                lastError = error;
                console.error(`API call failed on attempt ${attempt}:`, error.message);

                // Don't retry on client errors (4xx)
                if (error.response?.status >= 400 && error.response?.status < 500) {
                    console.log('Client error detected, not retrying');
                    throw error;
                }

                // Don't retry on the last attempt
                if (attempt === maxRetries) {
                    console.log('Max retries reached, throwing error');
                    break;
                }

                // Wait before next attempt
                console.log(`Waiting ${delay}ms before retry...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 1.5; // Exponential backoff
            }
        }

        throw lastError;
    },

    // Extract error message from various error formats
    getErrorMessage: (error) => {
        if (error.response?.data?.message) {
            return error.response.data.message;
        }
        if (error.response?.data?.error) {
            return error.response.data.error;
        }
        if (error.message) {
            return error.message;
        }
        return 'An unexpected error occurred';
    },

    // Get detailed error information
    getErrorDetails: (error) => {
        return {
            message: apiUtils.getErrorMessage(error),
            status: error.response?.status,
            statusText: error.response?.statusText,
            isNetworkError: !error.response,
            isServerError: error.response?.status >= 500,
            isClientError: error.response?.status >= 400 && error.response?.status < 500,
            data: error.response?.data,
        };
    },

    // Check if error is retryable
    isRetryableError: (error) => {
        // Retry on network errors or server errors
        return !error.response || error.response?.status >= 500;
    },

    // Format validation errors for display
    formatValidationErrors: (errors) => {
        if (Array.isArray(errors)) {
            return errors.map(error => `• ${error}`).join('\n');
        }
        if (typeof errors === 'object') {
            return Object.entries(errors)
                .map(([field, message]) => `• ${field}: ${message}`)
                .join('\n');
        }
        return errors?.toString() || 'Validation failed';
    },

    // Convert file to base64
    fileToBase64: (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // Convert multiple files to base64
    filesToBase64: async (files) => {
        const conversions = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve({
                        filename: file.name,
                        content: base64,
                        type: file.type,
                        size: file.size,
                    });
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        return Promise.all(conversions);
    },

    // Validate email format
    validateEmail: (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Validate required fields
    validateRequiredFields: (data, requiredFields) => {
        const errors = [];

        requiredFields.forEach(field => {
            const value = field.includes('.')
                ? field.split('.').reduce((obj, key) => obj?.[key], data)
                : data[field];

            if (!value || (typeof value === 'string' && value.trim() === '')) {
                errors.push(`${field} is required`);
            }
        });

        return {
            valid: errors.length === 0,
            errors,
        };
    },

    // Log API call for debugging
    logApiCall: (method, endpoint, data = null) => {
        console.group(`🌐 API Call: ${method.toUpperCase()} ${endpoint}`);
        console.log('Timestamp:', new Date().toISOString());
        if (data) {
            console.log('Request Data:', data);
        }
        console.groupEnd();
    },

    // Log API response for debugging
    logApiResponse: (method, endpoint, response, duration = null) => {
        console.group(`✅ API Response: ${method.toUpperCase()} ${endpoint}`);
        console.log('Status:', response.status);
        console.log('Data:', response.data);
        if (duration) {
            console.log('Duration:', `${duration}ms`);
        }
        console.groupEnd();
    },

    // Log API error for debugging
    logApiError: (method, endpoint, error, duration = null) => {
        console.group(`❌ API Error: ${method.toUpperCase()} ${endpoint}`);
        console.log('Error:', error.message);
        console.log('Status:', error.response?.status);
        console.log('Response Data:', error.response?.data);
        if (duration) {
            console.log('Duration:', `${duration}ms`);
        }
        console.groupEnd();
    },
};

// Export axios instance for direct use if needed
export { apiClient };

// Default export
export default {
    apiService,
    apiUtils,
    apiClient,
};