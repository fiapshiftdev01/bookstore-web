import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Livros = () => {
  const [livros, setLivros] = useState([]);
  const [filtrolivros, setFiltroLivros] = useState([]);
  const [pesquisartermo, setPesquisarTermo] = useState("");
  const [pesquisarpor, setPesquisarPor] = useState("titulo");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiLivros = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/livros`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setLivros(response.data);
      setFiltroLivros(response.data);
    } catch (error) {
      setError("Error ao encontrar o livro");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiLivros();
  }, []);

  //função deletar Livros

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este autor?")) {
      try {
        // endpoint sendo chamada pela fuinção axios e a requisição delete (deletar)
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/livros/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await apiLivros();
      } catch (error) {
        setError("Erro ao excluir Autor");
      }
    }
  };

  //PESQUISAR LIVROS
  useEffect(() => {
    const filtrado = livros.filter((livro) => {
      const valorPesquisa = livro[pesquisarpor]?.toString().toLowerCase() || "";
      return valorPesquisa.includes(pesquisartermo.toLowerCase());
    });
    setFiltroLivros(filtrado);
  }, [pesquisartermo, pesquisarpor, livros]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="text-center">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Livros</h2>
        <Link
          to="/AdicionarLivros"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Adicionar um novo Livro
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link
          to="/menu"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Menu
        </Link>
      </div>

      {/* Sessão Pesquisar */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={pesquisartermo}
              onChange={(e) => setPesquisarTermo(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="w-48">
            <select
              value={pesquisarpor}
              onChange={(e) => setPesquisarPor(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="titulo">Titulo</option>
              <option value="isbn">ISBN</option>
            </select>
          </div>
        </div>

        {pesquisartermo && (
          <div className="mt-2 text-sm text-gray-600">
            Encontrar {filtrolivros.length} Resultado(s)
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {filtrolivros.length === 0 ? (
        <div className="text-center py-8 bg-white rounded shadow">
          <p className="text-gray-500">
            {pesquisartermo ? "Nenhum Livro Encontrado." : "Nenhum disponivel."}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className=" border-collapse border border-blue-400 min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Titulo</th>
                <th className="px-6 py-3 text-left">Resumo</th>
                <th className="px-6 py-3 text-left">Ano</th>
                <th className="px-6 py-3 text-left">Páginas</th>
                <th className="px-6 py-3 text-left">ISBN</th>
                <th className="px-6 py-3 text-left">Ações</th>
              </tr>
            </thead>
            <tbody>
              {/*  faz uma busca com a função map e usa como referência uma chave no caso id */}
              {filtrolivros.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{item.titulo}</td>
                  <td className="px-6 py-4">{item.resumo}</td>
                  <td className="px-6 py-4">{item.ano}</td>
                  <td className="px-6 py-4">{item.paginas}</td>
                  <td className="px-6 py-4">{item.isbn}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/EditarLivros/${item.id}`)}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Apagar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Livros;
