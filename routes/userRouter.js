const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

// Rutas de usuarios
router.post("/signup", UserController.signup); // Registro de un nuevo usuario
router.post("/login", UserController.login); // Inicio de sesión de usuario
router.get("/:userId", UserController.getUserById); // Obtener un usuario por su ID
router.put("/:userId", UserController.updateUser); // Actualizar un usuario por su ID
router.delete("/:userId", UserController.deleteUser); // Eliminar un usuario por su ID

module.exports = router;
