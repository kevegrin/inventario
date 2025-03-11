/*
este archivo es como el main, es el que se ejecuta al correr el servidor.
    se configura el puerto, se conecta a mongo,
        se configura el middleware (el que nos deja movernos entre rutas),
            y se configuran las rutas 
*/

// environment variables
require("dotenv").config();
// express es el que hace el servidor
const express = require("express");
// mongoose es la conexion a mongo (database)
const mongoose = require("mongoose");
// cors es para funcionalidad con el frontend (cross origin resource sharing)
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

const inventoryReservationRoutes = require('./routes/inventoryReservationRoutes');
const spaceReservationRoutes = require('./routes/spaceReservationRoutes');

// middleware (para poder usar request y response en las rutas)
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  credentials: true
}));


// rutas ejemplo
app.get("/", (req, res) => res.send("API running"));

// rutas reales (api)
app.use("/api/inventory", require("./routes/inventoryRoutes"));
app.use("/api/spaces", require("./routes/spaceRoutes"));
app.use('/api/inventoryReservations', inventoryReservationRoutes);
app.use('/api/spaceReservations', spaceReservationRoutes);

// por si se rompe: 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

// empezar server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
