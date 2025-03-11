// este es el bueno; aqui se reserva espacio/material con una form que se adapta al tipo de objeto a crear.


import { useState, useEffect } from 'react';
import { Grid2, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';

// form para hacer submit de reserva
const ReservationForm = () => {
    // para conservar el tipo de objeto v
    const [formType, setFormType] = useState('inventory'); // default is inventory
    const [formData, setFormData] = useState({
      itemId: '', 
      spaceId: '', 
      userId: '',  
      quantity: '', 
      startTime: '',
      endTime: '',
    });


  // esta maneja los cambios en la form; cada vez que se cambia un campo, se actualiza el estado
const handleChange = (e) => {
        const { name, value } = e.target;
        // esto actualiza el estado con el nuevo valor
        setFormData((prevState) => ({
            // este es para que no se borren los datos que no se estan cambiando
          ...prevState,
          [name]: value,
        }));
      };

      const [endTimeOptions, setEndTimeOptions] = useState([]);

      // para los botones de intervalos de 30 min
      const generateEndTimeOptions = (startTime) => {
        const startDate = new Date(startTime);
        const options = [];
    
        // este for los genera
        for (let i = 1; i <= 4; i++) {
            //esto calcula los 30 min entre botones
          const endTime = new Date(startDate.getTime() + i * 30 * 60 * 1000);
          options.push(endTime.toISOString().slice(0, 16)); // formato
        }
    
        setEndTimeOptions(options);
      };

      useEffect(() => {
        if (formData.startTime) {
          generateEndTimeOptions(formData.startTime);
        }
      }, [formData.startTime]);

  /* debugging
  // y este maneja el submit (enter)
  const handleSubmit = async (e) => {
    // previene que se recargue la pagina
    e.preventDefault();

    // validar tiempo de reserva
    if (new Date(formData.startTime) >= new Date(formData.endTime)) {
        alert('La reserva debe terminar despues, no antes.');
        return;
    }

    try {
        let endpoint = '/api/inventoryReservations'; // default inventory
        if (type === 'space') {
            endpoint = '/api/spaceReservations';
        }

        const response = await axios.post(endpoint, formData);
        console.log('Reserva Exitosa', response.data);
    } catch (error) {
        console.error('Error haciendo reservacion:', error);
    }
};*/

const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('form:', formData);  // debug
  
    try {
      const response = await axios.post("http://localhost:5000/api/inventoryReservations", formData);
      console.log('Reservation successful:', response.data);
    } catch (error) {
      console.error('Error making reservation:', error);
    }
  };


  // no se actualizaba la hora de salida del post
  /*
const handleTimeButtonClick = (timeType, value) => {
    setFormData(prevState => ({
      ...prevState,
      [timeType]: value,
    }));
  };
*/
const handleTimeButtonClick = (timeType, timeString) => {
    const currentDate = new Date();
    const [hours, minutes] = timeString.split(':'); // e.g., "01:30" -> [1, 30]
    currentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0); // Set the selected time on the current date
  
    setFormData(prevState => ({
      ...prevState,
      [timeType]: currentDate.toISOString(), // Convert to ISO string format for Date
    }));
  };
  

  // y aqui esta la form en si
      // contenedor w padding
return (
    <Box p={3}>
        {/* titulo, el gutterBottom hace que haya un espacio abajo para qye se vea consistente
            tambien se adapta al tipo de reservacion dinamicamente 
        */}
      <Typography variant="h4" gutterBottom>
        Crear una reservacion de: {formType === 'space' ? 'espacio' : 'inventario'}
      </Typography>

        {/*  para cambiar el tipo de reservacion: */}
      <Box mb={3}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFormType(formType === 'space' ? 'inventory' : 'space')}
        >
          Cambiar a reservacion de  {formType === 'space' ? 'inventario' : 'espacio'}
        </Button>
      </Box>

        {/* cuando se manda la form de inventario */}
      <form onSubmit={handleSubmit}>
        <Grid2 container spacing={2}>

          {formType === 'inventory' && (
            <>
            <Grid2 item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID inventario"
                name="itemId"
                value={formData.itemId}
                onChange={handleChange}
                required
              />
            </Grid2>

        {/* form inventario  */}
        <Grid2 item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Cantidad"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  type="number"
                />
              </Grid2>
            </>
          )}

          {/* en caso de que sea un espacio, se muestra el campo para el ID del espacio*/}
          {formType === 'space' && (
            <Grid2 item xs={12} sm={6}>
              <TextField
                fullWidth
                label="ID de espacio"
                name="spaceId"
                value={formData.spaceId}
                onChange={handleChange}
                required
                slotProps={{
                  inputLabel: { shrink: true },
                }}
              />
            </Grid2>
          )}

          {/* los campos de usuario que reservo, hora de inicio y hora de fin */}
        <Grid2 item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ID de Usuario"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
              slotProps={{
                inputLabel: { shrink: true },
              }}
            />
        </Grid2>

        {/* Start Time Buttons */}
        <Grid2 container spacing={2}>
      {["00:00", "00:30", "01:00", "01:30", "02:00"].map((time, index) => (
        <Grid2 key={index} item xs={2}>
          <Button
            variant="outlined"
            onClick={() => handleTimeButtonClick("startTime", time)}
          >
            {time}
          </Button>
        </Grid2>
      ))}
    </Grid2>
    
          

            {/* tiempo de fin */} 
        <Grid2 container spacing={2}>
            {["00:30", "01:00", "01:30", "02:00"].map((time, index) => (
                <Grid2 key={index} item xs={2}>
                    <Button
                        variant="outlined"
                        onClick={() => handleTimeButtonClick("endTime", time)}
                    >
                     {time}
                    </Button>
        </Grid2>
        ))}
        </Grid2>
           
           
           {/* botoncito para mandar la form */} 
          <Grid2 item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
              Finalizar
            </Button>
          </Grid2>
        </Grid2>
      </form>
    </Box>
  );
};

export default ReservationForm;
