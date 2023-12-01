const express = require("express");
const router = express.Router();
const Post = require("../schema/post");

// Obtener todos los posts del usuario
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ "user.id": req.user.id });
    return res.json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error al obtener los posts" });
  }
});

// Crear un nuevo post
router.post("/", async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const post = new Post({
      user: {
        id: req.user.id,
        username: req.user.username,
      },
      title: req.body.title,
      description: req.body.description,
      imageURL: req.body.imageURL,
      completed: false,
    });

    const postInfo = await post.save();
    console.log({ postInfo });
    res.json(postInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error al crear el post" });
  }
});

// Editar un post por su ID
router.put("/:postId", async (req, res) => {
  const postId = req.params.postId;
  const { title, description, imageURL } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { title, description, imageURL },
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al editar el post" });
  }
});

// Borrar un post por su ID
router.delete("/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log("ID de post recibido en el backend:", postId);

  try {
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({ success: true, deletedPost });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al borrar el post" });
  }
});

module.exports = router;
