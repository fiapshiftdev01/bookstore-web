import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdicionarLivros = () => {
  const [titulo, setTitulo] = useState("");
  const [resumo, setResumo] = useState("");
  const [ano, setAno] = useState("");
  const [paginas, setPaginas] = useState("");
  const [isbn, setIsbn] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  //CRIANDO A FUNÇÃO HANDLESUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/livros`,
        {
          titulo,
          resumo,
          ano,
          paginas: Number(paginas),
          isbn: Number(isbn),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Verifica a autenticação
          },
        }
      );
      navigate("/livros");
    } catch (error) {
      setError("Erro ao cadastrar o Livro");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Adicionar um Novo Livro</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={titulo}
            placeholder="Digite o Titulo do Livro"
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={resumo}
            placeholder="Digite o Resumo do Livro"
            onChange={(e) => {
              setResumo(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="text"
            value={ano}
            placeholder="Digite o Ano do Livro"
            onChange={(e) => {
              setAno(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="number"
            value={paginas}
            placeholder="Digite Paginas do Livro"
            onChange={(e) => {
              setPaginas(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div>
          <input
            type="number"
            value={isbn}
            placeholder="Digite ISBN do Livro"
            onChange={(e) => {
              setIsbn(e.target.value);
            }}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar Livro
          </button>

          <button
            onClick={() => navigate("/livros")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarLivros;
