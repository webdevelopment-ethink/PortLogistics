/**
 * api.js
 * API integration layer for PortGate Logistics website
 * 
 * This module provides functions to fetch data from backend APIs.
 * Currently configured with placeholder endpoints that can be updated
 * when the backend API is deployed.
 * 
 * PRODUCTION USAGE:
 * - Replace placeholder URLs with actual API endpoints
 * - Add authentication tokens if required
 * - Implement proper error handling and retry logic
 */

(function() {
    'use strict';

    // ==================== API CONFIGURATION ====================
    const API_CONFIG = {
        // Base URL for the PortGate API (placeholder)
        BASE_URL: 'https://api.portgate.example',
        
        // API Endpoints
        ENDPOINTS: {
            NOTICES: '/api/v1/notices',
            CARGO_STATUS: '/api/v1/cargo/status',
            CONTAINER_TRACKING: '/api/v1/containers/track',
            DEPOT_AVAILABILITY: '/api/v1/depot/availability',
            SERVICE_REQUESTS: '/api/v1/service-requests'
        },
        
        // Request timeout in milliseconds
        TIMEOUT: 10000,
        
        // Enable/disable API calls (set to false for development without backend)
        ENABLED: false
    };

    // ==================== FETCH DEPOT NOTICES ====================
    /**
     * Fetches current depot notices and announcements
     * @returns {Promise<Array>} Array of notice objects
     */
    window.fetchNotices = async function() {
        if (!API_CONFIG.ENABLED) {
            return getMockNotices();
        }

        try {
            const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.NOTICES;
            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, API_CONFIG.TIMEOUT);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.notices || [];
        } catch (error) {
            console.error('Error fetching notices:', error);
            return getMockNotices();
        }
    };

    // ==================== FETCH CARGO STATUS ====================
    /**
     * Fetches status of a specific cargo/container
     * @param {string} containerNumber - Container tracking number
     * @returns {Promise<Object>} Cargo status object
     */
    window.fetchCargoStatus = async function(containerNumber) {
        if (!API_CONFIG.ENABLED) {
            return getMockCargoStatus(containerNumber);
        }

        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CARGO_STATUS}/${containerNumber}`;
            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, API_CONFIG.TIMEOUT);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching cargo status:', error);
            throw error;
        }
    };

    // ==================== TRACK CONTAINER ====================
    /**
     * Tracks a container through the logistics chain
     * @param {string} containerNumber - Container tracking number
     * @returns {Promise<Object>} Container tracking information
     */
    window.trackContainer = async function(containerNumber) {
        if (!API_CONFIG.ENABLED) {
            return getMockContainerTracking(containerNumber);
        }

        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.CONTAINER_TRACKING}`;
            const response = await fetchWithTimeout(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ containerNumber })
            }, API_CONFIG.TIMEOUT);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error tracking container:', error);
            throw error;
        }
    };

    // ==================== CHECK DEPOT AVAILABILITY ====================
    /**
     * Checks depot space availability for specific dates
     * @param {string} startDate - Start date (YYYY-MM-DD)
     * @param {string} endDate - End date (YYYY-MM-DD)
     * @returns {Promise<Object>} Availability information
     */
    window.checkDepotAvailability = async function(startDate, endDate) {
        if (!API_CONFIG.ENABLED) {
            return getMockDepotAvailability();
        }

        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.DEPOT_AVAILABILITY}?start=${startDate}&end=${endDate}`;
            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }, API_CONFIG.TIMEOUT);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error checking depot availability:', error);
            throw error;
        }
    };

    // ==================== SUBMIT SERVICE REQUEST ====================
    /**
     * Submits a service request to the depot
     * @param {Object} requestData - Service request details
     * @returns {Promise<Object>} Submission confirmation
     */
    window.submitServiceRequest = async function(requestData) {
        if (!API_CONFIG.ENABLED) {
            return getMockServiceRequestResponse();
        }

        try {
            const url = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.SERVICE_REQUESTS;
            const response = await fetchWithTimeout(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            }, API_CONFIG.TIMEOUT);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error submitting service request:', error);
            throw error;
        }
    };

    // ==================== UTILITY: FETCH WITH TIMEOUT ====================
    /**
     * Fetch with timeout wrapper
     * @param {string} url - Request URL
     * @param {Object} options - Fetch options
     * @param {number} timeout - Timeout in milliseconds
     * @returns {Promise<Response>}
     */
    function fetchWithTimeout(url, options, timeout) {
        return Promise.race([
            fetch(url, options),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timeout')), timeout)
            )
        ]);
    }

    // ==================== MOCK DATA (FOR DEVELOPMENT) ====================
    
    function getMockNotices() {
        return [
            {
                id: 1,
                date: '2025-11-03',
                title: 'Extended Operating Hours',
                message: 'PortGate is now operating weekdays 7am - 3pm. After-hours services available by arrangement.',
                type: 'info'
            },
            {
                id: 2,
                date: '2025-11-01',
                title: 'New Web Tracker Available',
                message: 'Check your cargo status online 24/7 with our new web tracking system.',
                type: 'announcement'
            },
            {
                id: 3,
                date: '2025-10-28',
                title: 'AQIS Inspection Services',
                message: 'Full biosecurity coordination now available including 77G and 79 treatments.',
                type: 'service'
            }
        ];
    }

    function getMockCargoStatus(containerNumber) {
        return {
            containerNumber: containerNumber,
            status: 'At Depot',
            location: 'PortGate Logistics, Port of Brisbane',
            lastUpdate: new Date().toISOString(),
            availableForPickup: true,
            estimatedDepartureDate: '2025-11-05'
        };
    }

    function getMockContainerTracking(containerNumber) {
        return {
            containerNumber: containerNumber,
            currentLocation: 'PortGate Depot',
            timeline: [
                {
                    date: '2025-11-03',
                    event: 'Arrived at PortGate Depot',
                    location: 'Port of Brisbane'
                },
                {
                    date: '2025-11-02',
                    event: 'Discharged from vessel',
                    location: 'Brisbane Container Terminal'
                },
                {
                    date: '2025-10-25',
                    event: 'Departed origin port',
                    location: 'Shanghai, China'
                }
            ]
        };
    }

    function getMockDepotAvailability() {
        return {
            available: true,
            capacity: '85%',
            message: 'Space available for your dates'
        };
    }

    function getMockServiceRequestResponse() {
        return {
            success: true,
            referenceNumber: 'PG' + Date.now(),
            message: 'Service request received. We will contact you within 24 hours.'
        };
    }

    // ==================== AUTO-LOAD NOTICES ON HOME PAGE ====================
    // Automatically load and display notices if on home page
    if (document.body.getAttribute('data-page') === 'home') {
        document.addEventListener('DOMContentLoaded', function() {
            const noticesContainer = document.getElementById('noticesContainer');
            
            if (noticesContainer) {
                fetchNotices()
                    .then(function(notices) {
                        displayNotices(notices, noticesContainer);
                    })
                    .catch(function(error) {
                        console.error('Failed to load notices:', error);
                        noticesContainer.innerHTML = '<div class="loading-state">Unable to load depot notices at this time.</div>';
                    });
            }
        });
    }

    // ==================== DISPLAY NOTICES ====================
    function displayNotices(notices, container) {
        if (!notices || notices.length === 0) {
            container.innerHTML = '<div class="loading-state">No depot notices at this time.</div>';
            return;
        }

        container.innerHTML = '';
        
        notices.forEach(function(notice) {
            const noticeCard = document.createElement('div');
            noticeCard.className = 'notice-card';
            
            noticeCard.innerHTML = `
                <div class="notice-date">${formatDate(notice.date)}</div>
                <h3>${notice.title}</h3>
                <p>${notice.message}</p>
            `;
            
            container.appendChild(noticeCard);
        });
    }

    // ==================== UTILITY: FORMAT DATE ====================
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return date.toLocaleDateString('en-AU', options);
    }

    // ==================== EXPOSE API CONFIG (for admin/debugging) ====================
    window.PortGateAPI = {
        config: API_CONFIG,
        setEnabled: function(enabled) {
            API_CONFIG.ENABLED = enabled;
            console.log(`PortGate API ${enabled ? 'enabled' : 'disabled'}`);
        },
        setBaseUrl: function(url) {
            API_CONFIG.BASE_URL = url;
            console.log('PortGate API base URL updated to:', url);
        }
    };

    console.log('PortGate API module loaded. API calls are', API_CONFIG.ENABLED ? 'ENABLED' : 'DISABLED (using mock data)');

})();

