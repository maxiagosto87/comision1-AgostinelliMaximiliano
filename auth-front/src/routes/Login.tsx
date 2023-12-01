/* import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
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
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Username</label>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          value={username}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />

        <button>Login</button>
      </form>
    </DefaultLayout>
  );
} */

import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import '../index.css'; // Importa tus estilos aquí
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
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
        <h1>Login</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label className="form-label">Username</label>
        <input
          name="username"
          type="text"
          className="form-input"
          onChange={handleChange}
          value={username}
        />
        <label className="form-label">Password</label>
        <input
          type="password"
          name="password"
          className="form-input"
          onChange={handleChange}
          value={password}
        />

        <button className="form-button">Login</button>
      </form>
      </div>
    </DefaultLayout>
  );
}
