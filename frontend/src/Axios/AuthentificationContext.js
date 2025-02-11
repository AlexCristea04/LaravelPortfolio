import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';
import axios from 'axios';
import { setAuthToken } from './AXIOS'; // Ensure this correctly sets axios.defaults.headers.common['Authorization']

const AuthContext = createContext();
const API_BASE_URL = process.env.REACT_APP_API_GATEWAY_HOST || 'http://127.0.0.1:8000/api';

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthTokenState] = useState(localStorage.getItem('authToken') || null);
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('admin')) || null);
    const [loading, setLoading] = useState(false);

    // Set axios headers whenever the token changes
    useEffect(() => {
        setAuthToken(authToken);
    }, [authToken]);

    /** Login Method */
    const login = async (email, password) => {
        try {
            setLoading(true);

            const response = await axios.post(`${API_BASE_URL}/admin/login`, {
                email,
                password,
            }, {
                headers: { 'Content-Type': 'application/json' },
            });

            const { token } = response.data;

            localStorage.setItem('authToken', token); // ✅ Store token first
            setAuthTokenState(token); // ✅ Update React state

            await fetchAdminData(); // ✅ Fetch user data after updating state
            setLoading(false);
            return token;
        } catch (error) {
            setLoading(false);
            console.error('Login failed:', error.response?.data || error.message);
            throw error;
        }
    };


    /** Fetch Admin Info */
    const fetchAdminData = async () => {
        try {
            const storedToken = localStorage.getItem('authToken'); // ✅ Always get the latest token

            if (!storedToken) {
                throw new Error("No authentication token found");
            }

            const response = await axios.get(`${API_BASE_URL}/admin/verify-token`, {
                headers: { Authorization: `Bearer ${storedToken}` }, // ✅ Ensure correct token is sent
            });

            if (response.data?.authenticated) {
                setAdmin(response.data.admin);
                localStorage.setItem('admin', JSON.stringify(response.data.admin));
            } else {
                logout(); // Logout if token is invalid
            }
        } catch (error) {
            console.error('Fetching admin data failed:', error);
            logout();
        }
    };


    /** Logout Method */
    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await axios.post(`${API_BASE_URL}/admin/logout`, {}, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            setAuthTokenState(null);
            localStorage.removeItem('authToken');
            localStorage.removeItem('admin');
            setAdmin(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Logout failed:', error);
        }
    }, [authToken]);

    const verifyToken = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE_URL}/admin/verify-token`, {
                headers: { Authorization: `Bearer ${authToken}` },
            });

            if (response.data?.authenticated) {
                setAdmin(response.data.admin);
                localStorage.setItem('admin', JSON.stringify(response.data.admin));
                setLoading(false);
                return true;
            } else {
                throw new Error("Invalid response format");
            }
        } catch (error) {
            console.error('Token verification failed:', error);
            logout(); // Now calling a stable `logout` function
            return false;
        }
    }, [authToken, logout]);

    /**  Auto-Verify Token on Load */
    useEffect(() => {
        if (authToken) {
            verifyToken();
        }
    }, [authToken, verifyToken]);

    return (
        <AuthContext.Provider
            value={{ authToken, admin, login, logout, verifyToken, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
