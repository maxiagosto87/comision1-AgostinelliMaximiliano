/* import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Nuevo campo email
  const [avatarURL, setAvatarURL] = useState(""); // Nuevo campo avatarURL
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, name, email, avatarURL); // Añadir email y avatarURL al log

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, email, avatarURL }), // Incluir email y avatarURL
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setPassword("");
        setName("");
        setEmail(""); // Limpiar el campo email después del registro
        setAvatarURL(""); // Limpiar el campo avatarURL después del registro
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="form">
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Name</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Avatar URL</label>
        <input
          type="text"
          name="avatarURL"
          onChange={(e) => setAvatarURL(e.target.value)}
          value={avatarURL}
        />
        <label>Username</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Create account</button>
      </form>
    </DefaultLayout>
  );
} */

import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import "../index.css"; // Importar tus estilos aquí
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarURL, setAvatarURL] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name, email, avatarURL }),
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setPassword("");
        setName("");
        setEmail("");
        setAvatarURL("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <div className="signup-container">
      <form onSubmit={handleSubmit} className="form">
        <h1>Signup</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-input"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-input"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label className="form-label">Avatar URL</label>
        <input
          type="text"
          name="avatarURL"
          className="form-input"
          onChange={(e) => setAvatarURL(e.target.value)}
          value={avatarURL}
        />
        <label className="form-label">Username</label>
        <input
          type="text"
          name="username"
          className="form-input"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-input"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button className="form-button">Create account</button>
      </form>
      </div>
    </DefaultLayout>
  );
}