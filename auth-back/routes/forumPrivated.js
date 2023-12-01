const express = require("express");
const router = express.Router();
const Post = require("../schema/post");

// Obtener todos los posts públicos y privados del usuario
router.get("/", async (req, res) => {
    try {
      const posts = await Post.find().sort({ creationDate: -1 });
      return res.json(posts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al obtener los posts del foro" });
    }
  });

// Agregar un comentario a un post por su ID
router.post("/:postId/comments", async (req, res) => {
    const postId = req.params.postId;
    const { comment } = req.body;
  
    try {
      const post = await Post.findById(postId);
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const newComment = {
        user: { id: req.user.id, username: req.user.username },
        content: comment,
        creationDate: Date.now(),
      };
  
      post.commentsList.push(newComment);
      const updatedPost = await post.save();
  
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al agregar el comentario" });
    }
  });

module.exports = router;