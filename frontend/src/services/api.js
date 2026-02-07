import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Pólizas
export const polizaAPI = {
  getAll: () => api.get('/polizas'),
  getById: (id) => api.get(`/polizas/${id}`),
  create: (data) => api.post('/polizas', data),
  update: (id, data) => api.put(`/polizas/${id}`, data),
  delete: (id) => api.delete(`/polizas/${id}`),
};

// Proveedores
export const proveedorAPI = {
  getAll: () => api.get('/proveedores'),
  getById: (id) => api.get(`/proveedores/${id}`),
  getByTipo: (tipo) => api.get(`/proveedores/tipo/${tipo}`),
  getByCiudad: (ciudad) => api.get(`/proveedores/ciudad/${ciudad}`),
  create: (data) => api.post('/proveedores', data),
  update: (id, data) => api.put(`/proveedores/${id}`, data),
  delete: (id) => api.delete(`/proveedores/${id}`),
};

// Siniestros
export const siniestroAPI = {
  getAll: () => api.get('/siniestros'),
  getById: (id) => api.get(`/siniestros/${id}`),
  getByNumeroCaso: (numeroCaso) => api.get(`/siniestros/caso/${numeroCaso}`),
  getByPolizaId: (polizaId) => api.get(`/siniestros/poliza/${polizaId}`),
  getByProveedorId: (proveedorId) => api.get(`/siniestros/proveedor/${proveedorId}`),
  getByEstado: (estado) => api.get(`/siniestros/estado/${estado}`),
  create: (data) => api.post('/siniestros', data),
  update: (id, data) => api.put(`/siniestros/${id}`, data),
  delete: (id) => api.delete(`/siniestros/${id}`),
};

export default api;
