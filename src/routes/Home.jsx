import axios from 'axios';
import { useState, useEffect } from 'react';

import '../css/home.css'

const Home = () => {
  const [livros, setLivros] = useState([]);

  const fetchLivros = async () => {
    try {
      // Endpoint sendo chamado pela função axios usando a requisição GET
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/livros`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, // Verifica a autenticação
        },
      });
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <section className="home">
      <section className="cardsProd">
        <h2 className="title">Dashboard Livraria</h2>

        <div className="card-container">
          <h3>Livros</h3>
          <div className="cards">
            {livros.map((livro, index) => (
              <div key={index} className="card">
                <h4>{livro.titulo}</h4>
                <p>Autor(es): {livro.autor_nome || "N/A"}</p>
                <p>Categoria(s): {livro.categoria_nome || "N/A"}</p>
                <p>Editora(s): {livro.editora_nome || "N/A"}</p>
                <p>Quantidade restante: {livro.quantidade}</p> {/* Adicionado aqui */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
};

export default Home;
