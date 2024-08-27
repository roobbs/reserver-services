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
      const { date, time, userId, serviceId, providerId } = req.body;

      const newAppointment = new Appointment({
        date,
        time,
        userId,
        serviceId,
        providerId,
      });

      const savedAppointment = await newAppointment.save();

      const populatedAppointment = await Appointment.findById(
        savedAppointment._id
      )
        .populate("serviceId")
        .populate("providerId");

      res.status(201).json({
        success: true,
        msg: "New appointment added",
        appointment: populatedAppointment,
      });
    } catch (error) {
      console.error("Error al crear la cita:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }),
];

// Obtener todas las citas
const getAllAppointments = async (req, res) => {
  res.send("Obtener una cita por su ID");
};

// Obtener una cita por su ID
const getAppointmentById = async (req, res) => {
  res.send("Obtener una cita por su ID");
};

// Actualizar una cita con status "canceled" por su ID
const cancelAppointment = asyncHandler(async (req, res) => {
  try {
    const { appointmentId } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status: "canceled" },
      { new: true } // Return updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ msg: "Cita no encontrada" });
    }

    res.status(200).json({
      success: true,
      msg: "Cita cancelada con éxito",
    });
  } catch (error) {
    console.error("Error al cancelar la cita:", error);
    res.status(500).json({ success: false, msg: "Error en el servidor" });
  }
});

// Eliminar una cita por su ID
const deleteAppointment = async (req, res) => {
  res.send("Eliminar una cita por su ID");
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  cancelAppointment,
  deleteAppointment,
};
