import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';

interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  country: string;
  phoneNumber: string;
  referralId?: string;
  accountBalance: number;
  welcomeBonus: number;
  totalProfit: number;
  referralBonus: number;
  totalWithdrawal: number;
  totalDeposit: number;
  roles: string[];
  createdAt: string;
}

interface DecodedToken {
  userId: string;
  email: string;
  username: string;
  iat: number;
  exp: number;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check for token in cookies (server-side set) or localStorage (fallback)
        const getAuthToken = () => {
          // Try to get from document.cookie first (HTTP-only cookie)
          if (typeof document !== 'undefined') {
            const cookies = document.cookie.split(';');
            const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='));
            if (authCookie) {
              return authCookie.split('=')[1];
            }
          }
          
          // Fallback to localStorage
          if (typeof localStorage !== 'undefined') {
            return localStorage.getItem('auth-token');
          }
          
          return null;
        };

        const token = getAuthToken();

        if (!token) {
          setLoading(false);
          return;
        }

        // Verify and decode the JWT token
        const decoded = jwt.decode(token) as DecodedToken;
        
        if (!decoded || decoded.exp * 1000 < Date.now()) {
          // Token is invalid or expired
          setUser(null);
          setLoading(false);
          return;
        }

        // Fetch user data from server to ensure it's up to date
        const response = await fetch('/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          // If server request fails, use decoded token data as fallback
          setUser({
            id: decoded.userId,
            username: decoded.username,
            fullName: '',
            email: decoded.email,
            country: '',
            phoneNumber: '',
            accountBalance: 0,
            welcomeBonus: 0,
            totalProfit: 0,
            referralBonus: 0,
            totalWithdrawal: 0,
            totalDeposit: 0,
            roles: ['user'],
            createdAt: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const logout = () => {
    // Clear auth token
    if (typeof document !== 'undefined') {
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
    setUser(null);
  };

  return { user, loading, logout };
};
