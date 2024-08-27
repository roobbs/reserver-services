const express = require("express");
const router = express.Router();
const AppointmentController = require("../controllers/appointmentController");

router.post("/", AppointmentController.createAppointment); // Crea una nueva cita
router.get("/:appointmentId", AppointmentController.getAppointmentById); // Obtiene una cita por su ID
router.put("/:appointmentId/cancel", AppointmentController.cancelAppointment);
router.delete("/:appointmentId", AppointmentController.deleteAppointment); // Elimina una cita por su ID

module.exports = router;
