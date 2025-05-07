import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const EditarAutores = () => {

  const { id } = useParams();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [autor, setAutor] = useState({
    nome: '',
    email: '',
    telefone: '',
    bio:'',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const apiAutores = async () => {
      try {
        setLoading(true);
        // endpoint sendo chamada pela fuinção axios e a requisição get (buscar)
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/autores/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        setAutor(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setError('Autor Não encontrado');
        } else {
          setError('Erro ao buscar o autor');
        }
        setTimeout(() => navigate('/autores'), 2000); // Redireciona após 2 segundos em caso de erro
      } finally {
        setLoading(false);
      }
    };

    apiAutores();
  }, [id, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setAutor(prev => ({...prev,[name]: value}));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
         // endpoint sendo chamada pela fuinção axios e a requisição put (alterar)
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/autores/${id}`, autor, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/autores');
    } catch (error) {
      setError(error.response?.data?.error || 'Error ao alterar o autor');
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
        <p className="text-center mt-4">Redirecionando para lista de autores...</p>
      </div>
    );
  }


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Editar Autor</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium tex-gray-700 mb-1">Nome</label>
          <input
            type="text"
            name="nome"
            value={autor.nome}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required/>
        </div>

        <div>
          <label className="block text-sm font-medium tex-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={autor.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required/>
        </div>
        <div>
          <label className="block text-sm font-medium tex-gray-700 mb-1">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={autor.telefone}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required
            min="0"/>
        </div>

        <div>
          <label className="block text-sm font-medium tex-gray-700 mb-1">Bio</label>
          <input
            type="text"
            name="bio"
            value={autor.bio}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            required/>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:ring-gray-500 "
            >
            Alterar
          </button>
          <button
            type="button"
            onClick={() => navigate('/autores')}
            className="flex-1 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 focus:ring-gray-500 "
            >

            Cancelar
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditarAutores


