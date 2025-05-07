import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


const Categorias = () => {

  const [categorias, setCategorias] = useState([]);
  const [filtroCategorias, setFiltroCategorias] = useState([]);
  const [pesquisaTermo, setPesquisaTermo] = useState('');
  const [pesquisarPor, setPesquisarPor] = useState('nome'); // default pesquisa por nome
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  const apiCategorias = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/categorias`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setCategorias(response.data);
      setFiltroCategorias(response.data);
    } catch (error) {
      setError('Erro ao encontrar Categoria');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    apiCategorias();
  }, []);



// Pesquisar Categorias

  useEffect(() => {
    // Filtra Categoria sempre que pesquisa Termo ou pesquisar Por for alterado
    const filtrado = categorias.filter(categoria => {
      const valorPesquisa = categoria[pesquisarPor]?.toString().toLowerCase() || '';
      return valorPesquisa.includes(pesquisaTermo.toLowerCase());
    });
    setFiltroCategorias(filtrado);
  }, [pesquisaTermo, pesquisarPor, categorias]);

  //função deleta categorias

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza de que deseja excluir esta Categoria?')) {
      try {
        // endpoint sendo chamada pela fuinção axios e a requisição delete (deletar)
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/categorias/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        await apiCategorias();
      } catch (error) {
        setError('Erro ao excluir Categoria');
      }
    }
  };
// caso demore para trazer os dados fica aparecendo o carregando...
  if (loading) {
    return (
      <div  className="max-w-4xl mx-auto mt-10 p-6">
        <div className="text-center">carregando...</div>
      </div>
    );
  }

  return (
    <>

    <div className="max-w-4xl mx-auto mt-10 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categorias</h2>
        <Link
          to="/adicionarCategorias"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Adicionar uma nova Categoria
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <Link
          to="/menu"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Menu
        </Link>
      </div>

      {/* Sessão Buscar */}
      <div className="mb-6 bg-white p-4 rounded shadow">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Pesquisar..."
              value={pesquisaTermo}
              onChange={(e) => setPesquisaTermo(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"/>
          </div>
          <div className="w-48">
            <select
              value={pesquisarPor}
              onChange={(e) => setPesquisarPor(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500">
              <option value="nome">Nome</option>
            </select>
          </div>
        </div>
        {pesquisaTermo && (
          <div className="mt-2 text-sm text-gray-600">
            Encontrar {filtroCategorias.length} Resultado(s)
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {filtroCategorias.length === 0 ? (
        <div className="text-center py-8 bg-white rounded shadow">
          <p className="text-gray-500">
            {pesquisaTermo ? 'Nenhuma Categoria Encontrada.' : 'Nenhum disponivel.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-6 py-3 text-left">Nome</th>
              </tr>
            </thead>
            <tbody>
               {/*  faz uma busca com a função map e usa como referência uma chave no caso id */}
              {filtroCategorias.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">{item.nome}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => navigate(`/editarCategorias/${item.id}`)}
                        className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600">
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
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
  )
}

export default Categorias

