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

  // Estado para controlar qué sección se muestra: 'foro', 'software' o 'contacto'
  const [currentView, setCurrentView] = useState('foro');

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

    // Solo obtenemos los posts si la vista actual es el foro
    if (currentView === 'foro') {
      fetchPosts();
    }
  }, [currentView]); // Se ejecuta cada vez que la vista cambia a 'foro'

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

  // Función para renderizar el contenido según la vista actual
  const renderContent = () => {
    if (currentView === 'software') {
      return (
        <section className="software-section">
          <h2>Tecnologías Utilizadas</h2>
          <div className="tech-list">
            <div className="tech-item">
              <h3>React</h3>
              <p>Biblioteca de JavaScript para construir la interfaz de usuario (el front-end).</p>
            </div>
            <div className="tech-item">
              <h3>Node.js</h3>
              <p>Entorno de ejecución para construir el servidor (el back-end).</p>
            </div>
            <div className="tech-item">
              <h3>Express.js</h3>
              <p>Framework de Node.js para gestionar las rutas y la API del back-end.</p>
            </div>
            <div className="tech-item">
              <h3>SQLite</h3>
              <p>Base de datos ligera y autónoma para almacenar los posts. Ideal para proyectos pequeños.</p>
            </div>
            <div className="tech-item">
              <h3>Sequelize</h3>
              <p>ORM (Object-Relational Mapper) que facilita la interacción con la base de datos.</p>
            </div>
            <div className="tech-item">
              <h3>Render</h3>
              <p>Plataforma en la nube para desplegar y alojar la aplicación y el servidor de forma gratuita.</p>
            </div>
          </div>
        </section>
      );
    }

    if (currentView === 'contacto') {
      return (
        <section className="contact-section">
          <h2>Contacto</h2>
          <p>Estoy disponible para proyectos y oportunidades de trabajo.</p>
          <div className="contact-info">
            <p><strong>Nombre:</strong> Leandro Maciel</p>
            <p><strong>Correo Electrónico:</strong> <a href="mailto:leandrotvr@gmail.com">leandrotvr@gmail.com</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/Leandrotvr">github.com/Leandrotvr</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/leandromaciel581">linkedin.com/in/leandromaciel581</a></p>
            <p><strong>Otro Proyecto:</strong> <a href="#">To Do List React App</a></p>
          </div>
          <p>
            {/* TODO: Actualiza el enlace del portafolio con tus datos reales si es necesario. */}
          </p>
        </section>
      );
    }

    // Por defecto, muestra la vista del foro
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };

  return (
    <div className="App">
      <header>
        <h1>Mi Foro</h1>
        {/* Navegación entre vistas */}
        <nav className="navbar">
          <button onClick={() => setCurrentView('foro')} className={currentView === 'foro' ? 'active' : ''}>Foro</button>
          <button onClick={() => setCurrentView('software')} className={currentView === 'software' ? 'active' : ''}>Software</button>
          <button onClick={() => setCurrentView('contacto')} className={currentView === 'contacto' ? 'active' : ''}>Contacto</button>
        </nav>
      </header>
      
      <main>
        {renderContent()}
      </main>

      <footer>
        <p>© 2024 Mi Foro Minimalista</p>
      </footer>
    </div>
  );
}

export default App;
