import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditarCategorias = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState({
    nome: "",
  });

  useEffect(() => {
    const apiCategorias = async () => {
      try {
        setLoading(true);
        // endpoint sendo chamada pela fuinção axios e a requisição get (buscar)
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/categorias/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setCategoria(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError("Categoria Não encontrada");
        } else {
          setError("Erro ao buscar Categoria");
        }
        setTimeout(() => navigate("/categorias"), 2000); // Redireciona após 2 segundos em caso de erro
      } finally {
        setLoading(false);
      }
    };

    apiCategorias();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategoria((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // endpoint sendo chamada pela fuinção axios e a requisição put (alterar)
      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/categorias/${id}`,
        categoria,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // VERIFICA A AUTENTICAÇÃO
          },
        }
      );
      navigate("/categorias");
    } catch (error) {
      setError(error.response?.data?.error || "Error ao alterar o autor");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
        <p className="text-center mt-4">
          Redirecionando para lista de Categorias...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Categoria</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome
          </label>
          <input
            type="text"
            name="nome"
            value={categoria.nome}
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
            Alterar
          </button>
          <button
            type="button"
            onClick={() => navigate("/categorias")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarCategorias;
