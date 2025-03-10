// config/db.js
// aqui se conecta a la database y le permite una conexion a server.js

const mongoose = require("mongoose");

// Este es el URI (Uniform Resource Identifier) para MongoDB.
// Se obtiene de las variables de entorno (dotenv) o se utiliza una URI predeterminada.
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://kevinpellegrin:gyS0LHp9pnCAQDqr@ihc.yfeto.mongodb.net/inventario?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    // Conexión a la base de datos de MongoDB usando el URI proporcionado
    const connection = await mongoose.connect(mongoURI);

    // Imprime el nombre de la base de datos si la conexión fue exitosa
    console.log(`MongoDB connected to database: ${connection.connection.name}`);
  } catch (error) {
    // Si ocurre un error en la conexión, muestra el error y termina el proceso
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Cierra el proceso si no se puede conectar
  }
};

module.exports = connectDB;
