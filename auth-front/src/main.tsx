/* import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Profile from "./routes/Profile.tsx";
import NewPost from "./routes/NewPost.tsx"; // Importa el componente NewPost
import ForumPublic from "./routes/ForumPublic.tsx";
import ForumPrivated from "./routes/ForumPrivated.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forumPublic", // Nueva ruta para Forum
    element: <ForumPublic />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/me",
        element: <Profile />,
      },
      {
        path: "/new-post", // Nueva ruta para NewPost
        element: <NewPost />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
); */

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, RouteObject } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import ForumPrivated from "./routes/ForumPrivated.tsx";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Profile from "./routes/Profile.tsx";
import NewPost from "./routes/NewPost.tsx";
import ForumPublic from "./routes/ForumPublic.tsx";
import { Post } from "./types/types.ts";


import "./index.css";

const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const protectedRoutes: RouteObject[] = [
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/me",
      element: <Profile />,
    },
    {
      path: "/new-post",
      element: <NewPost />,
    },
    {
      path: "/forumPrivated",
      element: <ForumPrivated posts={posts} setPosts={setPosts} />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/forumPublic",
      element: <ForumPublic />,
    },
    {
      path: "/",
      element: <ProtectedRoute />,
      children: protectedRoutes,
    },
  ]);

  return (
    <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<App />);