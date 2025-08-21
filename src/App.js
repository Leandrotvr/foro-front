// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css'; 

function App() {
  // Estado para guardar la lista de posts
  const [posts, setPosts] = useState([]);

  // Estados para el formulario de creación de posts
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // La URL base de tu back-end en Render
  const API_BASE_URL = 'https://foro-back.onrender.com/api/posts';

  // useEffect para obtener los posts del back-end cuando el componente se monta
  useEffect(() => {
    // Definimos la función asíncrona para obtener los datos
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creamos el objeto con los datos del nuevo post
    const newPost = { title, content, author };

    try {
      // Hacemos la petición POST al back-end para crear el post
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      const data = await response.json();

      // Agregamos el nuevo post a la lista actual de posts
      setPosts([data, ...posts]);

      // Limpiamos el formulario después de crear el post
      setTitle('');
      setContent('');
      setAuthor('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Mi Foro</h1>
      </header>
      
      <main>
        {/* Formulario para crear un nuevo post */}
        <section className="post-form">
          <h2>Crear Nuevo Post</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Contenido"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <button type="submit">Publicar</button>
          </form>
        </section>

        {/* Lista de posts */}
        <section className="posts-list">
          <h2>Posts Recientes</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <article key={post.id} className="post-card">
                <h3>{post.title}</h3>
                <p>{post.content}</p>
                <small>Por: {post.author}</small>
              </article>
            ))
          ) : (
            <p>No hay posts aún. ¡Sé el primero en publicar!</p>
          )}
        </section>
      </main>

      <footer>
        <p>© 2024 Mi Foro Minimalista</p>
      </footer>
    </div>
  );
}

export default App;
