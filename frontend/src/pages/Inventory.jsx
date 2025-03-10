import { useState, useEffect } from 'react';
import { Grid2, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios'; // You can import your api service if you're using one



const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);
/*
  useEffect(() => {
    // Fetch inventory items from the API
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory');
        setInventoryItems(response.data); // Store the items in state
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };

    fetchInventory(); // Call the function to fetch items on component mount
  }, []);*/
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/inventory');
        console.log('Fetched inventory:', response.data); // Log the fetched inventory data
        setInventoryItems(response.data);
      } catch (error) {
        console.error('Error fetching inventory:', error);
      }
    };
  
    fetchInventory();
  }, []);


  return (
    <div>
      <h1>Inventory Management</h1>
      <Grid2 container spacing={3}>
        {inventoryItems.map((item) => (
          <Grid2 key={item._id} xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">{item.model}</Typography>
                <Typography variant="body1">Categoría: {item.category}</Typography>
                <Typography variant="body1">Cantidad en inventario: {item.quantity}</Typography>
                <Typography variant="body1">Cantidad disponible: {item.available}</Typography>
                <Typography variant="body2">Descripción: {item.description}</Typography>
              </CardContent>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </div>
  );
};

export default Inventory;
