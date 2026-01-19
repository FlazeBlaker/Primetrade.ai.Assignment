import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on load
        const token = localStorage.getItem('token');
        if (token) {
            checkUserLoggedIn();
        } else {
            setLoading(false);
        }
    }, []);

    const checkUserLoggedIn = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data.data);
        } catch (error) {
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const register = async (username, email, password, role) => {
        const res = await api.post('/auth/register', { username, email, password, role });
        localStorage.setItem('token', res.data.token);
        setUser(res.data.user);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        loading,
        login,
        register,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
