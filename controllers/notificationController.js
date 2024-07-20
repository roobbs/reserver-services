// Importar el modelo de notificación si es necesario
// const Notification = require('../models/notification');

// Crear una nueva notificación
const createNotification = async (req, res) => {
  res.send("Crear una nueva notificación");
};

// Obtener todas las notificaciones
const getAllNotifications = async (req, res) => {
  res.send("Obtener todas las notificaciones");
};

// Obtener una notificación por su ID
const getNotificationById = async (req, res) => {
  res.send("Obtener una notificación por su ID");
};

// Actualizar una notificación por su ID
const updateNotification = async (req, res) => {
  res.send("Actualizar una notificación por su ID");
};

// Eliminar una notificación por su ID
const deleteNotification = async (req, res) => {
  res.send("Eliminar una notificación por su ID");
};

module.exports = {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
};
