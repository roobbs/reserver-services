const express = require("express");
const router = express.Router();
const ServiceController = require("../controllers/serviceController");

router.post("/", ServiceController.createService); // Crea un nuevo servicio
router.get("/", ServiceController.getAllServices); // Obtiene todos los servicios
router.get("/:serviceId", ServiceController.getServiceById); // Obtiene un servicio por su ID
router.put("/:serviceId", ServiceController.updateService); // Actualiza un servicio por su ID
router.delete("/:serviceId", ServiceController.deleteService); // Elimina un servicio por su ID

module.exports = router;
