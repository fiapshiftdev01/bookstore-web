import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdicionarEditoras = () => {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/editoras`,
        {
          nome,
          endereco,
          telefone,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // VERIFICA A AUTENTICAÇÃO
          },
        }
      );
      navigate("/editoras");
    } catch (error) {
      setError("Error ao adicionar editora");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Adicionar uma Nova Editora</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="endereco"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="telefone"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Adicionar Editora
          </button>

          <button
            type="button"
            onClick={() => navigate("/editoras")}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdicionarEditoras;
