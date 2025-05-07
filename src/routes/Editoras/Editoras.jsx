import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Editoras = () => {
  const [editoras, setEditoras] = useState([]);
  const [filtroEditoras, setFiltroEditoras] = useState([]);
  const [pesquisaTermo, setPesquisaTermo] = useState("");
  const [pesquisarPor, setPesquisarPor] = useState("nome"); // default pesquisa por nome
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const apiEditoras = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/editoras`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // VERIFICA A AUTENTICAÇÃO
          },
        }
      );
      setEditoras(response.data);
      setFiltroEditoras(response.data);
    } catch (error) {
      setError("Erro ao encontrar Editora");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiEditoras();
  }, []);

  //Pesquisar Editora

  useEffect(() => {
    // Filtra Editoras sempre que pesquisa Termo ou pesquisar Por for alterado
    const filtrado = editoras.filter((editora) => {
      const valorPesquisa =
        editora[pesquisarPor]?.toString().toLowerCase() || "";
      return valorPesquisa.includes(pesquisaTermo.toLowerCase());
    });
    setFiltroEditoras(filtrado);
  }, [pesquisaTermo, pesquisarPor, editoras]);

  // função deleta editoras
  const handleDelete = async (id) => {
    if (window.confirm("Tem certeza de que deseja excluir este editora?")) {
      try {
        // endpoint sendo chamada pela fuinção axios e a requisição delete (deletar)
        await axios.delete(
          `${import.meta.env.VITE_API_BASE_URL}/editoras/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        await apiEditoras();
      } catch (error) {
        setError("Erro ao excluir Editora");
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
          <h2 className="text-2xl font-bold">Editoras</h2>
          <Link
            to="/adicionarEditoras"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar uma nova Editora
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

        {/* Search Section */}
        <div className="mb-6 bg-white p-4 rounded shadow">
          <div className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Pesquisar..."
                value={pesquisaTermo}
                onChange={(e) => setPesquisaTermo(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={pesquisarPor}
                onChange={(e) => setPesquisarPor(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="nome">Nome</option>
                <option value="endereco">endereco</option>
              </select>
            </div>
          </div>
          {pesquisaTermo && (
            <div className="mt-2 text-sm text-gray-600">
              Encontrar {filtroEditoras.length} Resultado(s)
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {filtroEditoras.length === 0 ? (
          <div className="text-center py-8 bg-white rounded shadow">
            <p className="text-gray-500">
              {pesquisaTermo
                ? "Nenhuma Editora Encontrado."
                : "Nenhum disponivel."}
            </p>
          </div>
        ) : (
          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left">Nome</th>
                  <th className="px-6 py-3 text-left">Endereço</th>
                  <th className="px-6 py-3 text-left">Telefone</th>
                  <th className="px-6 py-3 text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {/*  faz uma busca com a função map e usa como referência uma chave no caso id */}
                {filtroEditoras.map((item) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="px-6 py-4">{item.nome}</td>
                    <td className="px-6 py-4">{item.endereco}</td>
                    <td className="px-6 py-4">{item.telefone}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/editarEditoras/${item.id}`)}
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
    </>
  );
};

export default Editoras;
