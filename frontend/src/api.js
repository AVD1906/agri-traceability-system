const API = "http://localhost:5000";

// PRODUCTS
export const getProducts = () =>
  fetch(`${API}/products`).then(res => res.json());

export const createProduct = (data) =>
  fetch(`${API}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// LOCATIONS
export const getLocations = () =>
  fetch(`${API}/locations`).then(res => res.json());

export const createLocation = (data) =>
  fetch(`${API}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// BATCHES
export const createBatch = (data) =>
  fetch(`${API}/batches`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

// LOGS
export const getLogs = () =>
  fetch(`${API}/logs`).then(res => res.json());

// REPORTS
export const getReports = () =>
  fetch(`${API}/reports`).then(res => res.json());