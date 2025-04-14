const BASE_URL = 'http://127.0.0.1:8000';

export async function apiRequest(endpoint, method = 'GET', { params = {}, body = null, headers = {} } = {}) {
    try {
        const queryString = Object.keys(params).length > 0
            ? '?' + new URLSearchParams(params).toString()
            : '';

        const response = await fetch(`${BASE_URL}${endpoint}${queryString}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers
            },
            body: body ? JSON.stringify(body) : null,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'خطایی در ارتباط با سرور رخ داده است.');
        }

        return await response.json();

    } catch (error) {
        console.error(`[API Error]: ${error.message}`);
        throw error;
    }
}
