// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/config';

export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check localStorage for auth state
        const isAuth = localStorage.getItem('isAuth');
        const userData = localStorage.getItem('user');

        if (isAuth === 'true' && userData) {
            setUser(JSON.parse(userData));
            setLoading(false);
        } else {
            // Listen to Firebase auth state changes
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                setUser(user);
                setLoading(false);

                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    localStorage.setItem('isAuth', JSON.stringify(true));
                } else {
                    localStorage.removeItem('user');
                    localStorage.removeItem('isAuth');
                }
            });

            return unsubscribe;
        }
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
            localStorage.removeItem('user');
            localStorage.removeItem('isAuth');
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    return { user, loading, logout };
};