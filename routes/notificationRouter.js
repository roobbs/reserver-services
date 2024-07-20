const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notificationController");

router.post("/", NotificationController.createNotification); // Crea una nueva notificación
router.get("/", NotificationController.getAllNotifications); // Obtiene todas las notificaciones
router.get("/:notificationId", NotificationController.getNotificationById); // Obtiene una notificación por su ID
router.put("/:notificationId", NotificationController.updateNotification); // Actualiza una notificación por su ID
router.delete("/:notificationId", NotificationController.deleteNotification); // Elimina una notificación por su ID

module.exports = router;
