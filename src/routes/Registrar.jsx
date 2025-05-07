import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Registrar = () => {
  //HOOK- useNavigate- ele redirecionamento entre componentes
  const navigate = useNavigate();

  //HOOK- useState - Manipula o estado da variavel

  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmasenha, setConfirmaSenha] = useState("");
  const [error, setError] = useState("");

  //CRIANDO A FUNÇÃO HANDLE SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    //Validação básica

    if (!username || !password) {
      setError("Preencha todo os campos");
      return;
    }

    if (password !== confirmasenha) {
      setError("As senhas não coincidem");
      return;
    }
    if (password.length < 6) {
      setError(" A senha deve ter pelo menos 6 caracteres");
      return;
    }

    try {
      // Endpoint sendo chamado pela função axios
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/cadastro/`, {
        username,
        password,
      });

      navigate("/", {
        state: { message: "Cadastro realizado com sucesso" },
      });
    } catch (error) {
      setError(" Erro ao cadastrar usuario", error);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>Crie sua Conta</h2>
        </div>

        <div>
          <span>{error}</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Usuário"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                placeholder="Senha"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
              />
            </div>

            <div>
              <label htmlFor="confirmaSenha">Confirma Senha</label>
              <input
                type="password"
                id="confirmaSenha"
                name="confirmaSenha"
                value={confirmasenha}
                placeholder="Confirmar senha"
                onChange={(e) => {
                  setConfirmaSenha(e.target.value);
                }}
                required
              />
            </div>
          </div>

          <button>Cadastrar</button>
          <div>
            <Link to="/">Já tem uma conta ? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registrar;
