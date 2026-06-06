
const API_BASE = '../api';

// Generic API functions
async function apiRequest(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE}/${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API request failed:', error);
        throw error;
    }
}

// News functions
async function getNewsItems() {
    try {
        return await apiRequest('news.php');
    } catch (error) {
        console.error('Failed to fetch news:', error);
        return [];
    }
}

async function saveNewsItem(item) {
    try {
        const result = await apiRequest('news.php', {
            method: 'POST',
            body: JSON.stringify(item)
        });
        return result;
    } catch (error) {
        console.error('Failed to save news:', error);
        throw error;
    }
}

async function updateNewsItem(id, item) {
    try {
        const result = await apiRequest(`news.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify(item)
        });
        return result;
    } catch (error) {
        console.error('Failed to update news:', error);
        throw error;
    }
}

async function deleteNewsItem(id) {
    try {
        const result = await apiRequest(`news.php?id=${id}`, {
            method: 'DELETE'
        });
        return result;
    } catch (error) {
        console.error('Failed to delete news:', error);
        throw error;
    }
}

// Donation functions
async function getDonationRequests() {
    try {
        return await apiRequest('donations.php');
    } catch (error) {
        console.error('Failed to fetch donations:', error);
        return [];
    }
}

async function saveDonationRequest(item) {
    try {
        const result = await apiRequest('donations.php', {
            method: 'POST',
            body: JSON.stringify(item)
        });
        return result;
    } catch (error) {
        console.error('Failed to save donation:', error);
        throw error;
    }
}

async function updateDonationStatus(id, status) {
    try {
        const result = await apiRequest(`donations.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
        return result;
    } catch (error) {
        console.error('Failed to update donation:', error);
        throw error;
    }
}

// Contact functions
async function getContactMessages() {
    try {
        return await apiRequest('contacts.php');
    } catch (error) {
        console.error('Failed to fetch contacts:', error);
        return [];
    }
}

async function saveContactMessage(item) {
    try {
        const result = await apiRequest('contacts.php', {
            method: 'POST',
            body: JSON.stringify(item)
        });
        return result;
    } catch (error) {
        console.error('Failed to save contact:', error);
        throw error;
    }
}

async function updateContactStatus(id, status) {
    try {
        const result = await apiRequest(`contacts.php?id=${id}`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
        return result;
    } catch (error) {
        console.error('Failed to update contact:', error);
        throw error;
    }
}
