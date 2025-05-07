import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AdicionarAutores = () => {

  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [bio, setBio] = useState('');
  const [error, setError] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/autores`, {
        nome,
        email,
        telefone,
        bio,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/autores');
    } catch (error) {
      setError('Error ao adicionar o autor');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-medium mb-6">Adicionar um Novo Autor</h2>

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
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div>
          <input
            type="text"
            placeholder="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-3 py-2 border rounded"

          />
        </div>

        <div className="flex gap-2">

        <button
          type="submit"
         className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:ring-gray-500 "
        >
          Adicionar Autor
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

export default AdicionarAutores

