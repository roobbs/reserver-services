const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Appointment = require("../models/appointment");

const createAppointment = [
  body("date", "La fecha es obligatoria").isISO8601().toDate(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { date, userId, serviceId, providerId } = req.body;

      const newAppointment = new Appointment({
        date,
        userId,
        serviceId,
        providerId,
      });

      const savedAppointment = await newAppointment.save();

      res.status(201).json({
        success: true,
        msg: "New appointment added",
        appointment: savedAppointment,
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }),
];

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
  res.send("Obtener todas las citas");
};

// Obtener una cita por su ID
const getAppointmentById = async (req, res) => {
  res.send("Obtener una cita por su ID");
};

// Actualizar una cita por su ID
const updateAppointment = async (req, res) => {
  res.send("Actualizar una cita por su ID");
};

// Eliminar una cita por su ID
const deleteAppointment = async (req, res) => {
  res.send("Eliminar una cita por su ID");
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
