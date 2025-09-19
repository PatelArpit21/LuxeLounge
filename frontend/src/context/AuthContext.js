import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

const initialAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN_SUCCESS': {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    }
    case 'LOAD_FROM_STORAGE': {
      return {
        ...state,
        isAuthenticated: action.payload?.isAuthenticated || false,
        user: action.payload?.user || null,
        token: action.payload?.token || null,
      };
    }
    case 'LOGOUT': {
      return { ...initialAuthState };
    }
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('luxeAuth');
      if (stored) {
        const parsed = JSON.parse(stored);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsed });
      }
    } catch (e) {
      // ignore
    }
  }, []);

  useEffect(() => {
    const persist = {
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      token: state.token,
    };
    localStorage.setItem('luxeAuth', JSON.stringify(persist));
  }, [state.isAuthenticated, state.user, state.token]);

  async function login({ email, password }) {
    const response = await api.post('/auth/login/', { email, password });
    const token = response.data?.access || response.data?.access_token || null;
    const user = response.data?.user || { email };
    dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
    return response.data;
  }

  async function register({ email, password1, password2 }) {
    const response = await api.post('/auth/registration/', {
      email,
      password1,
      password2,
    });
    const maybeToken = response.data?.access || response.data?.access_token || null;
    if (maybeToken) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: { email }, token: maybeToken } });
    }
    return response.data;
  }

  function logout() {
    dispatch({ type: 'LOGOUT' });
    try {
      localStorage.removeItem('luxeAuth');
      api.post('/auth/logout/').catch(() => {});
    } catch (e) {
      // ignore
    }
  }

  const value = useMemo(() => ({ authState: state, dispatch, login, register, logout }), [state]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}

export default AuthContext;