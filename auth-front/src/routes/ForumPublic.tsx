import React from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { Post, Comment } from "../types/types";
import { API_URL } from "../auth/authConstants";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const ForumPublic: React.FC = () => {
  const [posts, setPosts] = React.useState<Post[]>([]);

  async function getForumPosts() {
    try {
      const response = await fetch(`${API_URL}/forumPublic`);
      if (response.ok) {
        const json = await response.json();
        setPosts(json);
      }
    } catch (error) {
      console.error(error);
    }
  }

  React.useEffect(() => {
    getForumPosts();
  }, []);

  return (
    <DefaultLayout>
      <div className="forum-public">
        <h1>Foro Público</h1>
        <div className="forum-posts">
          {posts.map((post: Post) => (
            <div key={post._id} className="forum-post card mb-4 post-card">
              <div className="card-body">
                <h3 className="card-title">{post.title}</h3>
                <p className="card-text">{post.description}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default ForumPublic;