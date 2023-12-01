import React, { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { Post } from "../types/types";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Dashboard() {
  const auth = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [editedPost, setEditedPost] = useState<Post | null>(null);
  

  // Función para manejar la acción de borrar un post
  const handleDeletePost = async (postId: string) => {
    const accessToken = auth.getAccessToken();
  
    try {
      const response = await fetch(`${API_URL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.ok) {
        // Actualizar la lista de posts después de borrar
        getPosts();
      } else {
        console.error("Error al borrar el post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Función para manejar el inicio de la edición de un post
  const handleStartEdit = (postId: string) => {
    // Obtener el post que se va a editar
    const postToEdit = posts.find((post) => post._id === postId);

    // Verificar si el post existe antes de establecerlo como el post editado
    if (postToEdit) {
      setEditedPost(postToEdit);
      setEditingPostId(postId);
    } else {
      console.error("No se encontró el post para editar");
    }
  };

  // Función para manejar la acción de cancelar la edición de un post
  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedPost(null);
  };

  // Función para manejar la acción de guardar la edición de un post
  const handleSaveEdit = async () => {
    if (!editedPost) {
      return;
    }

    const accessToken = auth.getAccessToken();
  
    try {
      const response = await fetch(`${API_URL}/posts/${editedPost._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title: editedPost.title,
          description: editedPost.description,
          imageURL: editedPost.imageURL,
        }),
      });
  
      if (response.ok) {
        // Actualizar la lista de posts después de editar
        getPosts();
        setEditingPostId(null);
        setEditedPost(null);
      } else {
        console.error("Error al editar el post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  async function getPosts() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/posts`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setPosts(json);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPosts();
  }, []);

  

  return (
      <PortalLayout>
        <div className="signup-container dashboard">
          <h1>Tablero</h1>
          {auth.getUser()?.avatarURL && (
            <img
              src={auth.getUser()?.avatarURL}
              alt={`Avatar de ${auth.getUser()?.name}`}
              className="avatar-image"
              onError={(e) => {
                console.error("Error cargando la imagen:", e);
              }}
            />
          )}
          <div className="posts-grid">
            {posts.map((post: Post) => (
              <div key={post._id} className="post-container card mb-4">
                {editingPostId === post._id ? (
                  // Renderizar campos de edición si estamos editando este post
                  <>
                    <input
                      type="text"
                      value={editedPost?.title || ""}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost!,
                          title: e.target.value,
                        })
                      }
                      className="form-input"
                    />
                    <input
                      type="text"
                      value={editedPost?.description || ""}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost!,
                          description: e.target.value,
                        })
                      }
                      className="form-input"
                    />
                    <input
                      type="text"
                      value={editedPost?.imageURL || ""}
                      onChange={(e) =>
                        setEditedPost({
                          ...editedPost!,
                          imageURL: e.target.value,
                        })
                      }
                      className="form-input"
                    />
                    <button onClick={handleSaveEdit} className="form-button">
                      Guardar
                    </button>
                    <button onClick={handleCancelEdit} className="form-button">
                      Cancelar
                    </button>
                  </>
                ) : (
                  // Renderizar información normal si no estamos editando este post
                  <>
                    <h3>{post.title}</h3>
                    <p>{post.description}</p>
                    {post.imageURL && (
                      <img
                        src={post.imageURL}
                        alt={`Imagen de ${post.title}`}
                        className="card-img-top"
                      />
                    )}
                    <div className="post-actions" style={{ marginTop: '20px' }}>
                      <button
                        onClick={() => handleStartEdit(post._id)}
                        className="form-button"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDeletePost(post._id)}
                        style={{ backgroundColor: 'red', color: 'white' }} 
                      >
                        Borrar
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </PortalLayout>
  );
}
