const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const issueJwt = require("../utils/issueJwt");

exports.signup = async (req, res) => {
  res.send("Crear un nuevo usuario");
};

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.email });

  if (!user) {
    res.status(401).json({ success: false, message: "Invalid email" });
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (isValid) {
    const jwt = utils.issueJwt(user);

    res.status(201).json({
      success: true,
      msg: "User logged in successfully",
      user: user,
      token: jwt.token,
      expiresIn: jwt.expires,
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
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
