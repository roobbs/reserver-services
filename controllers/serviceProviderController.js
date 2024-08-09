const ServiceProvider = require("../models/serviceProvider");
const Service = require("../models/service");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

// Obtener todos los proveedores de servicios
const getAllServiceProviders = async (req, res) => {
  res.send("Obtener todos los proveedores de servicios");
};

const createServiceForProvider = [
  body("name", "El nombre del servicio es obligatorio")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").optional().trim().escape(),
  body("price", "El precio del servicio es obligatorio")
    .isNumeric()
    .withMessage("El precio debe ser un número")
    .escape(),
  body("duration", "La duración del servicio es obligatoria")
    .isNumeric()
    .withMessage("La duración debe ser un número")
    .escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { providerId } = req.params;
      const { name, description, price, duration } = req.body;

      const serviceProvider = await ServiceProvider.findById(providerId);

      if (!serviceProvider) {
        return res
          .status(404)
          .json({ message: "Proveedor de servicios no encontrado" });
      }

      const newService = new Service({
        name,
        description,
        duration,
        price,
        providerId,
      });

      const savedService = await newService.save();

      serviceProvider.servicesOffered.push(savedService._id);
      await serviceProvider.save();

      const populatedServiceProvider = await ServiceProvider.findById(
        providerId
      ).populate("servicesOffered");

      res.status(201).json({
        success: true,
        msg: "Servicio creado y asociado con el proveedor de servicios exitosamente",
        provider: populatedServiceProvider,
      });
    } catch (error) {
      console.error("Error al crear el servicio:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }),
];

// Actualizar un proveedor de servicios por su ID
const updateServiceProvider = async (req, res) => {
  res.send("Actualizar un proveedor de servicios por su ID");
};

// Eliminar un proveedor de servicios por su ID
const deleteServiceProvider = async (req, res) => {
  res.send("Eliminar un proveedor de servicios por su ID");
};

module.exports = {
  createServiceForProvider,
  getAllServiceProviders,
  updateServiceProvider,
  deleteServiceProvider,
};
