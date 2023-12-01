/* const express = require("express");
const router = express.Router();
const Post = require("../schema/post");

// Obtener todos los posts ordenados por fecha de creación (el más nuevo primero)
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ creationDate: -1 });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los posts del foro" });
  }
});

module.exports = router; */

// forumPublic.js
const express = require("express");
const router = express.Router();
const Post = require("../schema/post");
const User = require("../schema/user"); // Asegúrate de importar el modelo de User

// Obtener todos los posts ordenados por fecha de creación (el más nuevo primero) con comentarios
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ creationDate: -1 });

    // Obtener todos los IDs de usuario únicos en todos los comentarios
    const userIds = [...new Set(posts.flatMap(post => post.commentsList.map(comment => comment.user.id)))];

    // Obtener los usuarios correspondientes a esos IDs
    const users = await User.find({ _id: { $in: userIds } });

    // Hacer un mapeo de IDs de usuario a objetos de usuario
    const userMap = users.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    // Asignar usuarios a cada comentario
    posts.forEach(post => {
      post.commentsList.forEach(comment => {
        comment.user = userMap[comment.user.id];
      });
    });

    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los posts del foro" });
  }
});

module.exports = router;
