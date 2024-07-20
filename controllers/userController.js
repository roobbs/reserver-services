const User = require("../models/user");

exports.signup = async (req, res) => {
  res.send("Crear un nuevo usuario");
};

exports.login = async (req, res) => {
  //recuperar citas, servicios
  res.send("Crear un nuevo usuario");
};

// Obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  res.send("Obtener un usuario por su ID");
};

// Actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  res.send("Actualizar un usuario por su ID");
};

// Eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  res.send("Eliminar un usuario por su ID");
};
