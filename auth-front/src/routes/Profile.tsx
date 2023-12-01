import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import "../index.css";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Profile() {
  const auth = useAuth();
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    avatarURL: "",
  });
  const [newData, setNewData] = useState({
    name: "",
    email: "",
    avatarURL: "",
  });
  const [isEditMode, setIsEditMode] = useState(false);

  const getUserData = async () => {
    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setUserData(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleCancelClick = () => {
    setIsEditMode(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const accessToken = auth.getAccessToken();
      const response = await fetch(`${API_URL}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(newData),
      });

      if (response.ok) {
        // Actualizar la información del usuario después de la modificación
        getUserData();
        setIsEditMode(false);
      } else {
        console.error("Error al modificar la información del usuario");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <PortalLayout>
      <div className={`profile-container ${isEditMode ? 'edit-mode' : ''}`}>
        <h1>Perfil</h1>
        {isEditMode ? (
          <form onSubmit={handleFormSubmit}>
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={newData.name}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label>
              Correo electrónico:
              <input
                type="email"
                name="email"
                value={newData.email}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <label>
              URL del avatar:
              <input
                type="text"
                name="avatarURL"
                value={newData.avatarURL}
                onChange={handleInputChange}
                className="form-input"
              />
            </label>
            <button type="submit" className="form-button">Guardar cambios</button>
            <button type="button" onClick={handleCancelClick} className="form-button btn-danger">
              Cancelar
            </button>
          </form>
        ) : (
          <div>
            <p>Nombre: {userData.name}</p>
            <p>Correo electrónico: {userData.email}</p>
            <div className="avatar-container">
              <p>Avatar:</p>
              <img src={userData.avatarURL} alt={`Avatar de ${userData.name}`} />
            </div>
            <button onClick={handleEditClick}>Editar perfil</button>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
