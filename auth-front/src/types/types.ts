/* export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}
export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  name: string;
  username: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
} */

/* SEGUNDA ACTUALIZACION
export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  name: string;
  username: string;
  avatarURL?: string; // Nueva adición
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
} */

export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  name: string;
  username: string;
  avatarURL?: string;
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}

export interface Post {
  _id: string;
  idUser: string;
  user: {
    id: string;
    username: string;
  };
  title: string;
  description: string;
  imageURL?: string;
  creationDate: string;
  completed: boolean;
  commentsList: Comment[];
}

export interface Comment {
  user: {
    id: string;
    username: string;
  };
  content: string;
  creationDate: string;
}