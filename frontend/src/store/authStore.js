import { create } from 'zustand';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  setToken: (token) => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
    set({ token, isAuthenticated: !!token });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  login: (userData, token) => {
    set({ user: userData, token, isAuthenticated: true });
    localStorage.setItem('token', token);
  },

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem('token');
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
