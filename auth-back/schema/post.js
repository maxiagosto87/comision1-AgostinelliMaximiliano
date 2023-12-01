/* const Mongoose = require("mongoose");

const PostSchema = new Mongoose.Schema({
  //idUser: { type: String, required: true },
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String }, // Agrega esta línea para la URL de la imagen
  creationDate: { type: Date, default: Date.now },
  comments: [
    {
      idUser: { type: String, required: true }, // ID del usuario que creó el comentario
      comment: { type: String, required: true },
      creationDate: { type: Date, default: Date.now },
    },
  ],
}); */

/* ALGO ANDA PERO ALGO NO
const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  content: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String },
  creationDate: { type: Date, default: Date.now },
  commentsList: [CommentSchema],
});

module.exports = mongoose.model("Post", PostSchema); */

const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  content: { type: String, required: true },
  creationDate: { type: Date, default: Date.now },
});

const PostSchema = new mongoose.Schema({
  user: {
    id: { type: String, required: true },
    username: { type: String, required: true },
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String },
  creationDate: { type: Date, default: Date.now },
  commentsList: [CommentSchema], // Usamos directamente 'comments' en lugar de 'commentsList'
});

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
