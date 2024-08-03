const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.post("/signup", UserController.signup); // Registro de un nuevo usuario
router.post("/login", UserController.login); // Inicio de sesión de usuario
router.put(
  "/:userId/serviceprovider",
  UserController.updateUserServiceProvider
);
router.put("/:userId", UserController.updateUser); // Actualizar un usuario por su ID
router.delete("/:userId", UserController.deleteUser); // Eliminar un usuario por su ID

module.exports = router;
