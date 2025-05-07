import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Autores = () => {
  //HOOK useState - manipula o estado da variavel

  const [autores, setAutores] = useState([]); // retorna um array vazio
  const [filtroAutores, setFiltroAutores] = useState([]); // retorna um array vazio
  const [pesquisaTermo, setPesquisaTermo] = useState(""); //retorna um valor vazio
  const [pesquisarPor, setPesquisarPor] = useState("nome"); // retorna o nome como default
  const [error, setError] = useState(""); //retorna um valor vazio
  const [loading, setLoading] = useState(true); //retorna um boleano verdadeiro
  const navigate = useNavigate();

  const apiAutores = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/autores`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setAutores(response.data);
      setFiltroAutores(response.data);
    } catch (error) {
      setError("Erro ao encontrar Autor");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiAutores();
  }, []);

  // Pesquisar Autores

  useEffect(() => {
    // Filtre autores sempre que pesquisaTermo ou pesquisarPor for alterado
    const filtrado = autores.filter((autor) => {
      const valorPesquisa = autor[pesquisarPor]?.toString().toLowerCase() || "";
      return valorPesquisa.includes(pesquisaTermo.toLowerCase());
    });
    setFiltroAutores(filtrado);
  }, [pesquisaTermo, pesquisarPor, autores]);

  //função deletar autores

  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este autor?")) {
      try {
        // endpoint sendo chamada pela fuinção axios e a requisição delete (deletar)
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/autores/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        await apiAutores();
      } catch (error) {
        setError("Erro ao excluir Autor");
      }
    }
  };

  // caso demore para trazer os dados fica aparecendo o carregando...

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="text-center">carregando...</div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Autores</h2>
          <Link
            to="/adicionarAutores"
            className="px-4 mx-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar um novo Autor
          </Link>
        </div>

        <div className="mb-6">
          <Link
            to="/menu"
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Menu
          </Link>
        </div>

        {/* Search Section */}
        <div className="mb-6 p-4 bg-white rounded shadow">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={pesquisaTermo}
                onChange={(e) => setPesquisaTermo(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-600"
              />
            </div>
            <div className="w-48">
              <select
                value={pesquisarPor}
                onChange={(e) => setPesquisarPor(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-600"
              >
                <option value="nome">Nome</option>
                <option value="email">Email</option>
              </select>
            </div>
          </div>
          {pesquisaTermo && (
            <div className="mt-2 text-sm text-gray-600">
              Encontrar {filtroAutores.length} Resultado(s)
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {filtroAutores.length === 0 ? (
          <div className="text-center py-8 bg-white rounded shadow">
            <p className="text-gray-600">
              {pesquisaTermo
                ? "Nenhum Autor Encontrado."
                : "Nenhum disponivel."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Nome</th>
                  <th className="px-6 py-3 text-left">Email</th>
                  <th className="px-6 py-3 text-left">Telefone</th>
                  <th className="px-6 py-3 text-left">Bio</th>
                  <th className="px-6 py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {/*  faz uma busca com a função map e usa como referência uma chave no caso id */}
                {filtroAutores.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.nome}</td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.telefone}</td>
                    <td className="px-6 py-4">{item.bio}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/editarAutores/${item.id}`)}
                          className="px-3 py1 bg-orange-500 text-white rounded hover:bg-orange-600"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="px-3 py1 bg-red-500 text-white rounded hover:bg-red-600"
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
    </>
  );
};

export default Autores;
