import axios from 'axios';

// este archivito nos permite fetchear data, en este caso el inventario

// url base
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'; 


export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/inventory`);
    return response.data; 
  } catch (error) {
    console.error('error con inventario:', error);
    return [];
  }
};
