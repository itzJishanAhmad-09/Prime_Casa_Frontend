// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to handle responses
const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  return data;
};

// ---------- AUTH ----------
export const register = async (userData) => {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return handleResponse(res);
};

// src/services/api.js
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
};

// Example for a protected endpoint
export const updateProfile = async (data) => {
  const res = await fetch(`${API_URL}/auth/profile`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

export const login = async (email, password) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
};

export const getCurrentUser = async (token) => {
  const res = await fetch(`${API_URL}/auth/me`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  return handleResponse(res);
};

// ---------- PROPERTIES ----------
export const getProperties = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const res = await fetch(`${API_URL}/properties?${params}`);
  return handleResponse(res);
};

export const getPropertyById = async (id) => {
  const res = await fetch(`${API_URL}/properties/${id}`);
  return handleResponse(res);
};

export const getFeaturedProperties = async () => {
  const res = await fetch(`${API_URL}/properties/featured`);
  return handleResponse(res);
};

export const getPopularProperties = async () => {
  const res = await fetch(`${API_URL}/properties/popular`);
  return handleResponse(res);
};

// ---------- SECTORS ----------
export const getSectors = async () => {
  const res = await fetch(`${API_URL}/sectors`);
  return handleResponse(res);
};

// ---------- ENQUIRIES ----------
export const submitEnquiry = async (data) => {
  const res = await fetch(`${API_URL}/enquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
};

// ---------- TESTIMONIALS ----------
export const getTestimonials = async () => {
  const res = await fetch(`${API_URL}/testimonials`);
  return handleResponse(res);
};

// ---------- BLOGS ----------
export const getBlogs = async () => {
  const res = await fetch(`${API_URL}/blogs`);
  return handleResponse(res);
};

export const getBlogBySlug = async (slug) => {
  const res = await fetch(`${API_URL}/blogs/${slug}`);
  return handleResponse(res);
};

// ---------- DOMAIN ----------
export const searchDomain = async (domain) => {
  const res = await fetch(`${API_URL}/domain/search?domain=${domain}`);
  return handleResponse(res);
};

export const valuateDomain = async (domain) => {
  const res = await fetch(`${API_URL}/domain/valuate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain }),
  });
  return handleResponse(res);
};

export const backorderDomain = async (domain, email) => {
  const res = await fetch(`${API_URL}/domain/backorder`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domain, email }),
  });
  return handleResponse(res);
};