const API = "http://localhost:5000/api";

// Helper to get token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

// PRODUCTS
export const getProducts = () =>
  fetch(`${API}/products`, {
    headers: getAuthHeaders(),
  }).then(res => res.json());

export const createProduct = (data) =>
  fetch(`${API}/products`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

// LOCATIONS
export const getLocations = () =>
  fetch(`${API}/locations`, {
    headers: getAuthHeaders(),
  }).then(res => res.json());

export const createLocation = (data) =>
  fetch(`${API}/locations`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

// BATCHES
export const createBatch = (data) =>
  fetch(`${API}/batches`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

// LOGS
export const getLogs = () =>
  fetch(`${API}/logs`, {
    headers: getAuthHeaders(),
  }).then(res => res.json());

// REPORTS
export const getReports = () =>
  fetch(`${API}/reports`, {
    headers: getAuthHeaders(),
  }).then(res => res.json());