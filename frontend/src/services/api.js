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
    console.error("Error obteniendo inventario: ", error);
    throw error;
  }
};


export const fetchSpaces = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spaces`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo espacios:", error);
    throw error;
  }
};

export const createInventoryReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/inventoryReservations`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creando reservacion de inventario:", error);
    throw error;
  }
};

/* debug
export const createSpaceReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/spaceReservations`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating space reservation:", error);
    throw error;
  }
};
*/

export const createSpaceReservation = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/spaceReservations`, formData);
    return response.data;
  } catch (error) {
    console.error("Error creating space reservation:", error);
    throw error;
  }
};



export const fetchInventoryReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventoryReservations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory reservations:", error);
    throw error;
  }
};


export const fetchSpaceReservations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spaceReservations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching space reservations:", error);
    throw error;
  }
};

// para borrar una reservacion de inventario
export const cancelInventoryReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/inventoryReservations/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling inventory reservation:", error);
    throw error;
  }
};

// para borrar una reservacion de espacio
export const cancelSpaceReservation = async (reservationId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/spaceReservations/${reservationId}`);
    return response.data;
  } catch (error) {
    console.error("Error cancelling space reservation:", error);
    throw error;
  }
};

// ver reservaciones de un item
export const fetchInventoryReservationsByItem = async (itemId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventoryReservations/item/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory reservations by item:", error);
    throw error;
  }
};

// ver reservas de material de un usuario
export const fetchInventoryReservationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/inventoryReservations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching inventory reservations by user:", error);
    throw error;
  }
};

// ver reservaciones de un espacio
export const fetchSpaceReservationsBySpace = async (spaceId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spaceReservations/space/${spaceId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching space reservations by space:", error);
    throw error;
  }
};

// espacios reservados por un usuario en especifico
export const fetchSpaceReservationsByUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spaceReservations/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching space reservations by user:", error);
    throw error;
  }
};

// busca un user
export const fetchUser = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};


