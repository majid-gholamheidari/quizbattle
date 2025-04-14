import { useLoading } from "@/stores/useLoading";
import AsyncStorage from "@react-native-async-storage/async-storage";


const BASE_URL = "http://192.168.1.101:8000/api";

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: { [key: string]: string };
    body?: any;
    token?: string | null;
}

export async function apiRequest(endpoint: string, options: RequestOptions = {}) {
    const setLoading = useLoading.getState?.().setLoading;
    const token = options.token || await AsyncStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
    };
    setLoading(true);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method: options.method || "GET",
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined,
        });
        const jsonResponse = await response.json();
        if (!response.ok || jsonResponse.success === false) {
            throw {
                status: response.status,
                message: jsonResponse.message || "Request failed",
                errorBody: jsonResponse
            };
        }
        return jsonResponse;
    } catch (error: any) {
        console.error(`API Error [${options.method || "GET"}]: ${endpoint}`, error);
        throw error;
    } finally {
        setLoading(false);
    }
}

export async function login(email: string, password: string) {
    return apiRequest("/auth/login", {
        method: "POST",
        body: { email, password },
    });
}
