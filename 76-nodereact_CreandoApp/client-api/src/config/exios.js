import axios from 'axios';

// Crear una instancia
const clienteAxios = axios.create({
  // URL del backend
  baseURL: 'http://localhost:5000'  
});

export default clienteAxios;