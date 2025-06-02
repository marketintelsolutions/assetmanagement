// services/apiClient.js
import axios from 'axios';

// Create the base axios instance
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Add API key if available
        const apiKey = process.env.REACT_APP_API_KEY;
        if (apiKey) {
            config.headers['X-API-Key'] = apiKey;
        }

        // Add authorization token if available
        const token = localStorage.getItem('authToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Request:', {
                method: config.method?.toUpperCase(),
                url: `${config.baseURL}${config.url}`,
                data: config.data ? 'Data present' : 'No data',
                headers: config.headers,
            });
        }

        return config;
    },
    (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        // Log response in development
        if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', {
                status: response.status,
                url: response.config.url,
                data: response.data,
            });
        }

        return response;
    },
    (error) => {
        // Handle different error scenarios
        const errorResponse = {
            message: 'An unexpected error occurred',
            status: 0,
            data: null,
        };

        if (error.response) {
            // Server responded with error status
            errorResponse.status = error.response.status;
            errorResponse.data = error.response.data;

            switch (error.response.status) {
                case 400:
                    errorResponse.message = error.response.data?.message || 'Bad request - please check your input';
                    break;
                case 401:
                    errorResponse.message = 'Unauthorized - please log in again';
                    // Optionally redirect to login or clear auth token
                    localStorage.removeItem('authToken');
                    break;
                case 403:
                    errorResponse.message = 'Forbidden - you do not have permission to perform this action';
                    break;
                case 404:
                    errorResponse.message = 'Resource not found';
                    break;
                case 422:
                    errorResponse.message = error.response.data?.message || 'Validation error';
                    break;
                case 429:
                    errorResponse.message = 'Too many requests - please try again later';
                    break;
                case 500:
                    errorResponse.message = 'Server error - please try again later';
                    break;
                case 502:
                case 503:
                case 504:
                    errorResponse.message = 'Service temporarily unavailable - please try again later';
                    break;
                default:
                    errorResponse.message = error.response.data?.message || 'An error occurred';
            }
        } else if (error.request) {
            // Network error or no response
            errorResponse.message = 'Network error - please check your connection';
            errorResponse.status = 0;
        } else {
            // Request setup error
            errorResponse.message = error.message || 'Request configuration error';
        }

        // Log error in development
        if (process.env.NODE_ENV === 'development') {
            console.error('API Error:', {
                message: errorResponse.message,
                status: errorResponse.status,
                originalError: error,
                url: error.config?.url,
            });
        }

        // Attach formatted error info to the error object
        error.apiError = errorResponse;

        return Promise.reject(error);
    }
);

// API service methods
export const apiService = {
    // Redemption API methods
    redemption: {
        submit: async (formData, pdfContent, fundManagerEmail) => {
            const response = await apiClient.post('/redemption/submit', {
                formData,
                pdfContent,
                fundManagerEmail,
            });
            return response.data;
        },

        validate: async (formData) => {
            const response = await apiClient.post('/redemption/validate', formData);
            return response.data;
        },

        getStatus: async (clientId, referenceId = null) => {
            const params = referenceId ? { referenceId } : {};
            const response = await apiClient.get(`/redemption/status/${clientId}`, { params });
            return response.data;
        },
    },

    // Email Indemnity API methods
    emailIndemnity: {
        submit: async (formData, pdfContent, adminEmail) => {
            const response = await apiClient.post('/email-indemnity/submit', {
                formData,
                pdfContent,
                adminEmail,
            });
            return response.data;
        },

        validate: async (formData) => {
            try {
                const response = await apiClient.post('/email-indemnity/validate', { formData });
                return response.data;
            } catch (error) {
                console.error('Validation service error:', error);
                return {
                    valid: false,
                    errors: ['Validation service unavailable'],
                    message: 'Using local validation'
                };
            }
        },

        getStatus: async (email, referenceId = null) => {
            const params = referenceId ? { referenceId } : {};
            const response = await apiClient.get(`/email-indemnity/status`, {
                params: { email, ...params }
            });
            return response.data;
        },
    },

    // Email API methods
    email: {
        sendRedemption: async (formData, pdfContent, fundManagerEmail) => {
            const response = await apiClient.post('/email/send-redemption', {
                formData,
                pdfContent,
                fundManagerEmail,
            });
            return response.data;
        },

        sendEmailIndemnity: async (formData, pdfContent, adminEmail) => {
            const response = await apiClient.post('/email/send-email-indemnity', {
                formData,
                pdfContent,
                adminEmail,
            });
            return response.data;
        },

        sendTest: async (email) => {
            const response = await apiClient.post('/email/test', { email });
            return response.data;
        },

        validateConfig: async () => {
            const response = await apiClient.get('/email/validate-config');
            return response.data;
        },
    },

    // General utility methods
    health: {
        check: async () => {
            const response = await apiClient.get('/health');
            return response.data;
        },

        checkEmail: async () => {
            const response = await apiClient.get('/email/health');
            return response.data;
        },

        checkRedemption: async () => {
            const response = await apiClient.get('/redemption/health');
            return response.data;
        },

        checkEmailIndemnity: async () => {
            const response = await apiClient.get('/email-indemnity/health');
            return response.data;
        },
    },
};

// Utility functions
export const apiUtils = {
    // Check if error is a network error
    isNetworkError: (error) => {
        return !error.response && error.request;
    },

    // Check if error is a server error (5xx)
    isServerError: (error) => {
        return error.response && error.response.status >= 500;
    },

    // Check if error is a client error (4xx)
    isClientError: (error) => {
        return error.response && error.response.status >= 400 && error.response.status < 500;
    },

    // Get formatted error message
    getErrorMessage: (error) => {
        return error.apiError?.message || error.message || 'An unexpected error occurred';
    },

    // Get error details for debugging
    getErrorDetails: (error) => {
        return {
            message: apiUtils.getErrorMessage(error),
            status: error.response?.status || 0,
            data: error.response?.data || null,
            isNetworkError: apiUtils.isNetworkError(error),
            isServerError: apiUtils.isServerError(error),
            isClientError: apiUtils.isClientError(error),
        };
    },

    // Retry function for failed requests
    retry: async (fn, retries = 0, delay = 1000) => {
        for (let i = 0; i <= retries; i++) {
            try {
                return await fn();
            } catch (error) {
                // Don't retry client errors (4xx)
                if (apiUtils.isClientError(error)) {
                    throw error;
                }

                // If this is the last retry, throw the error
                if (i === retries) {
                    throw error;
                }

                // Wait before retrying with exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, i)));
            }
        }
    },
};

// Request cancellation support
export const createCancelToken = () => {
    return axios.CancelToken.source();
};

// Check if request was cancelled
export const isRequestCancelled = (error) => {
    return axios.isCancel(error);
};

export default apiClient;