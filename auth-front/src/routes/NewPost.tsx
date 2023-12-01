import React, { useState, FormEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";

export default function NewPost() {
  const auth = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = auth.getAccessToken();
      const user = auth.getUser();

      const response = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          title,
          description,
          imageURL,
          user: {
            id: user?._id,
            username: user?.username,
          },
        }),
      });

      if (response.ok) {
        // Limpiar los campos después de enviar el formulario
        setTitle("");
        setDescription("");
        setImageURL("");
        
        // Si la creación del post fue exitosa, puedes redirigir a la página de dashboard
        // history.push("/dashboard"); // Necesitarás tener acceso al objeto history
        console.log("Post creado exitosamente");
      } else {
        console.error("Error al crear el post");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <PortalLayout>
      <div className="new-post">
        <h1>Nuevo Post</h1>
        <form onSubmit={handleSubmit}>
          <label>
            Título:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-input"
            />
          </label>
          <label>
            Descripción (max 300 caracteres):
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              className="form-input"
            />
          </label>
          <label>
            URL de la imagen (opcional):
            <input
              type="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              className="form-input"
            />
          </label>
          <button type="submit" className="form-button">Crear Post</button>
        </form>
      </div>
    </PortalLayout>
  );
}
