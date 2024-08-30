const User = require("../models/user");
const ServiceProvider = require("../models/serviceProvider");
const Appointment = require("../models/appointment");
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

      const newUser = new User({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const jwt = issueJwt(newUser);

      const businessesList = await ServiceProvider.find({
        userId: { $ne: user._id },
      }).populate("servicesOffered");

      res.status(201).json({
        success: true,
        msg: "User created successfully",
        user: newUser,
        token: jwt.token,
        expiresIn: jwt.expires,
        business: null,
        businessesList,
      });
    } catch (error) {
      next(error);
    }
  }),
];

exports.login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(401).json({ success: false, message: "Invalid email" });
  }

  const business = await ServiceProvider.findOne({ userId: user._id }).populate(
    "servicesOffered"
  );

  const isValid = await bcrypt.compare(req.body.password, user.password);

  if (isValid) {
    const jwt = issueJwt(user);

    const appointmentList = await Appointment.find({
      userId: user._id,
    })
      .populate("providerId")
      .populate("serviceId");

    const businessesList = await ServiceProvider.find({
      userId: { $ne: user._id },
    }).populate("servicesOffered");

    res.status(201).json({
      success: true,
      msg: "User logged in successfully",
      user: user,
      business: business ? business : null,
      token: jwt.token,
      expiresIn: jwt.expires,
      businessesList,
      appointmentList,
    });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
};

// Actualizar el campo service_provider a true y crear negocio
exports.updateUserServiceProvider = [
  body("name", "El nombre del negocio es obligatorio")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("type", "El tipo de negocio es obligatorio")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("description").optional().trim().escape(),
  body("location").optional().trim().escape(),
  body("contactInfo").optional().trim().escape(),
  body("availability")
    .optional()
    .isArray()
    .withMessage("La disponibilidad debe ser una lista de cadenas"),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const userId = req.params.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      // Actualizar el campo service_provider a true
      user.service_provider = true;
      await user.save();

      // Crear el nuevo negocio
      const { name, type, description, location, contactInfo, availability } =
        req.body;

      const newBusiness = new ServiceProvider({
        userId: user._id,
        name,
        type,
        description,
        location,
        contactInfo,
        availability,
      });

      await newBusiness.save();

      res.status(200).json({
        success: true,
        msg: "User updated successfully and business created",
        user: user,
        business: newBusiness,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }),
];

// Actualizar un usuario por su ID
exports.updateUser = async (req, res) => {
  res.send("Actualizar un usuario por su ID");
};

// Eliminar un usuario por su ID
exports.deleteUser = async (req, res) => {
  res.send("Eliminar un usuario por su ID");
};
