import axios from 'axios';

// este archivito nos permite fetchear data, en este caso el inventario

// url base
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL); //debug

export const fetchInventory = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventory`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory:", error);
    throw error;
  }
};
