const express = require("express");
const router = express.Router();
const ServiceProviderController = require("../controllers/serviceProviderController");

router.get("/", ServiceProviderController.getAllServiceProviders); // Obtiene todos los proveedores de servicios
router.post(
  "/:providerId/service",
  ServiceProviderController.createServiceForProvider
); // Crea un nuevo servicio en el proveedor
router.put("/:providerId", ServiceProviderController.updateServiceProvider); // Actualiza un proveedor de servicios por su ID
router.delete("/:providerId", ServiceProviderController.deleteServiceProvider); // Elimina un proveedor de servicios por su ID

module.exports = router;
