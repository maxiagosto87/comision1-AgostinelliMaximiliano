import React, { useEffect, useState, FormEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import { Post, Comment } from "../types/types";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

interface ForumPrivatedProps {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const ForumPrivated: React.FC<ForumPrivatedProps> = ({ posts, setPosts }) => {
  const auth = useAuth();
  const [commentTexts, setCommentTexts] = useState<{ [postId: string]: string }>({});

  const getForumPosts = async () => {
    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${API_URL}/forumPrivated`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setPosts(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCommentSubmit = async (e: FormEvent, postId: string) => {
    e.preventDefault();

    try {
      const accessToken = auth.getAccessToken();

      const response = await fetch(`${API_URL}/forumPrivated/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          comment: commentTexts[postId] || "",
        }),
      });

      if (response.ok) {
        // Refrescar los comentarios después de agregar uno nuevo
        getForumPosts();
        // Limpiar el área de comentario después de agregar uno nuevo
        setCommentTexts((prev) => ({ ...prev, [postId]: "" }));
      } else {
        console.error("Error al agregar el comentario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getForumPosts();
  }, []);

  return (
    <PortalLayout>
      <div className="forum-privated">
        <h1>Foro Privado</h1>
        <div className="forum-privated-posts">
          {posts.map((post) => (
            <div key={post._id} className="forum-privated-post card mb-4 post-card">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.description}</p>
                {/* Visualización de la imagen */}
                {post.imageURL && (
                  <img className="card-img-top post-image" src={post.imageURL} alt={`Imagen de ${post.title}`} />
                )}
                <p className="card-text">Creado por: {post.user.username}</p>
                <p className="card-text">Fecha de creación: {new Date(post.creationDate).toLocaleString()}</p>

                <h4 className="card-title">Comentarios:</h4>
                {post.commentsList.map((comment: Comment, index) => (
                  <div key={index} className="card comment mb-2">
                    <div className="card-body">
                      <p className="card-text">{comment.user.username}: {comment.content}</p>
                      <p className="card-text">Fecha de creación: {new Date(comment.creationDate).toLocaleString()}</p>
                    </div>
                  </div>
                ))}

                {/* Área de comentarios */}
                <form onSubmit={(e) => handleCommentSubmit(e, post._id)} className="comment-form">
                  <label>
                    Comentario:
                    <input
                      type="text"
                      value={commentTexts[post._id] || ""}
                      onChange={(e) => setCommentTexts((prev) => ({ ...prev, [post._id]: e.target.value }))}
                      className="form-control"
                    />
                  </label>
                  <button type="submit" className="btn btn-primary">Agregar Comentario</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
};

export default ForumPrivated;