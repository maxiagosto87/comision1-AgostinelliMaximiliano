import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/dashboard">Tablero</Link>
            </li>
            <li>
              <Link to="/me">Perfil</Link>
            </li>
            <li>
              <Link to="/new-post">Nuevo Post</Link>
            </li>
            <li>
              <Link to="/forumPrivated">Foro</Link>
            </li>
            <li>
              <a href="#" onClick={handleSignOut}>
                Sign out
              </a>
            </li>
          </ul>
        </nav>
      </header>

      <main>{children}</main>
    </>
  );
}
