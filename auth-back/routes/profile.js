
const express = require("express");
const router = express.Router();
const User = require("../schema/user");
const { authenticateToken } = require("../auth/authMiddleware");

// Obtener información del usuario
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.json({
      username: user.username,
      name: user.name,
      email: user.email,
      avatarURL: user.avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener información del usuario" });
  }
});

// Actualizar información del usuario
router.put("/", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, avatarURL } = req.body;

    // Puedes agregar validaciones adicionales aquí según tus requisitos

    // Actualizar campos modificables
    const updateFields = {};
    if (name) updateFields.name = name;
    if (email) updateFields.email = email;
    if (avatarURL) updateFields.avatarURL = avatarURL;

    const updatedUser = await User.findByIdAndUpdate(userId, updateFields, { new: true });
    
    if (!updatedUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({
      username: updatedUser.username,
      name: updatedUser.name,
      email: updatedUser.email,
      avatarURL: updatedUser.avatarURL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar información del usuario" });
  }
});

module.exports = router;