// Importar el modelo de servicio si es necesario
// const Service = require('../models/service');

// Crear un nuevo servicio
const createService = async (req, res) => {
  res.send("Crear un nuevo servicio");
};

// Obtener todos los servicios
const getAllServices = async (req, res) => {
  res.send("Obtener todos los servicios");
};

// Obtener un servicio por su ID
const getServiceById = async (req, res) => {
  res.send("Obtener un servicio por su ID");
};

// Actualizar un servicio por su ID
const updateService = async (req, res) => {
  res.send("Actualizar un servicio por su ID");
};

// Eliminar un servicio por su ID
const deleteService = async (req, res) => {
  res.send("Eliminar un servicio por su ID");
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
};
