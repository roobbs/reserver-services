const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { issueJwt } = require("../utils/issueJwt");

exports.signup = [
  body("first_name", "First name must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("last_name", "Last name must not be empty")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("email", "email must not be empty")
    .trim()
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain at least one number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { first_name, last_name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new BlogUser({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const jwt = issueJwt(newUser);

      res.status(201).json({
        success: true,
        msg: "User created successfully",
        user: newUser,
        token: jwt.token,
        expiresIn: jwt.expires,
      });
    } catch (error) {
      next(error);
    }
  }),
];

exports.login = async (req, res) => {
  const user = await User.findOne({ username: req.body.email });

  if (!user) {
    res.status(401).json({ success: false, message: "Invalid email" });
  }

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (isValid) {
    const jwt = issueJwt(user);

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
