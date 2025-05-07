import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditarLivros = () => {
  const { id } = useParams(); // Hook useParams para pegar o ID do livro
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  //HOOK-MANIPULA O ESTADO PARA O LIVRO
  const [livro, setLivro] = useState({
    titulo: "",
    resumo: "",
    ano: "",
    paginas: "",
    isbn: "",
  });

  // Busca os dados do livro e as opções de autores, categorias e editoras
  useEffect(() => {
    const apiLivros = async () => {
      try {
        setLoading(true);
        // Busca os dados do livro
        const livroRes = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/livros/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        setLivro(livroRes.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("Livro não encontrado");
        } else {
          setError("Erro ao buscar detalhes do livro");
        }
        setTimeout(() => navigate("/livros"), 2000); // Redireciona após 2 segundos em caso de erro
      } finally {
        setLoading(false);
      }
    };

    apiLivros();
  }, [id, navigate]);

  // Função para atualizar o estado do livro
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLivro((prev) => ({ ...prev, [name]: value }));
  };

  // Função para enviar o formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Endpoint sendo chamado pela função axios e a requisição PUT (alterar)
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/livros/${id}`,
        livro,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      navigate("/livros"); // Redireciona para a lista de livros
    } catch (error) {
      setError(error.response?.data?.error || "Erro ao alterar o livro");
    }
  };

  // Exibe um loading enquanto os dados são carregados
  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <p className="text-center">Carregando...</p>
      </div>
    );
  }

  // Exibe uma mensagem de erro e redireciona após 2 segundos
  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <p className="text-center mt-4">
          Redirecionando para a lista de livros...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Livro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Título
          </label>
          <input
            type="text"
            name="titulo"
            value={livro.titulo}
            placeholder="Digite o Titulo do Livro"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Resumo
          </label>
          <input
            type="text"
            name="resumo"
            value={livro.resumo}
            placeholder="Digite o Resumo do Livro"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium tex-gray-700 mb-1">
            ano
          </label>
          <input
            type="text"
            name="ano"
            value={livro.ano}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Páginas
          </label>
          <input
            type="number"
            name="paginas"
            value={livro.paginas}
            placeholder="Digite Paginas do Livro"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ISBN
          </label>
          <input
            type="number"
            name="isbn"
            value={livro.isbn}
            placeholder="Digite ISBN do Livro"
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Editar Livro
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

export default EditarLivros;
