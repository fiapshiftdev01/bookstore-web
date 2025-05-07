import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  //HOOK- useNavigate- ele redirecionamento entre componentes
  const navigate = useNavigate();

  //HOOK- useState - Manipula o estado da variavel

  const [username, setUserName] = useState("");
  const [password, setPasword] = useState("");
  const [user, setUser] = useState("");
  const [error, setError] = useState(null);

  //CRIANDO A FUNÇÃO HANDLE SUBMIT

  const handleSubmit = async (e) => {
    //PREVINE QUE O FORMULARIO REALIZE QUALQUER ALTERAÇÃO
    e.preventDefault();

    try {
      //CHAMANDO O ENDPOINT(API) PELA FUNÇÃO AXIOS
      const response = await axios.post(import.meta.env.VITE_API_BASE_URL, {
        username,
        password,
      });
      //REBECE OS TOKENS DO USUARIO E GUARDA DENTRO DE DATA
      const { token, tokenRenovado, user } = response.data;

      //Guarda os dados que vem da API no localstogare
      localStorage.setItem("token", token);
      localStorage.setItem("tokenRenovado", tokenRenovado);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      setUser(user);
      navigate("/menu");
    } catch (error) {
      setError("Usuário e senha Inválidos");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 bg-transparent rounded shadow">
        <h2 className="text-center text-3xl font-bold">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Digite seu usuario"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => {
                setPasword(e.target.value);
              }}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Login
          </button>
          <div>
            <Link
              to="/cadastro"
              className="font-medium text-blue-600 hover:text-green-700 flex justify-center "
            >
              Já tem uma conta ? Registre-se
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
