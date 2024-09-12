import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { AuthContext } from "../../contexts/AuthContext";
import { RotatingLines } from "react-loader-spinner";

function Login() {

  let navigate = useNavigate();   // Hook useNavigate para redirecionar rotas

  const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>(    // Estado que vai guardar os dados do meu usuário
    {} as UsuarioLogin
  );

  const { usuario, handleLogin } = useContext(AuthContext);

  const {isLoading} = useContext(AuthContext);
  
  useEffect(() => {     // useEffect para monitorar o Estado usuario
    if (usuario.token !== "") {    // Se o token do usuário for diferente de vazio, redireciona para a rota /home
        navigate('/home')    // Redireciona para a rota /home
    }
  }, [usuario])

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({
      ...usuarioLogin,
      [e.target.name]: e.target.value,
    });
  }

  function login(e: ChangeEvent<HTMLFormElement>) {   // Função que faz o login do usuário
    e.preventDefault();       // Impede o comportamento padrão do formulário
    handleLogin(usuarioLogin);       // Chama a função handleLogin do contexto AuthContext
  }
  
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">
        <form onSubmit={login} className="flex justify-center items-center flex-col w-1/2 gap-4">
          <h2 className="text-slate-900 text-5xl ">Entrar</h2>
          <div className="flex flex-col w-full">
            <label htmlFor="usuario">Usuário</label>
            <input
              type="text"
              id="usuario"
              name="usuario"
              placeholder="Usuario"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.usuario}    // Valor do input
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Função que atualiza o estado do usuário
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="border-2 border-slate-700 rounded p-2"
              value={usuarioLogin.senha}    // Valor do input
              onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Função que atualiza o estado do usuário
            />
          </div>
          <button
            type="submit"
            className="rounded bg-indigo-400 flex justify-center
                                   hover:bg-indigo-900 text-white w-1/2 py-2"
          >
             {isLoading ? <RotatingLines
            strokeColor="white"
            strokeWidth="5"
            animationDuration="0.75"
            width="24"
            visible={true}
          /> :
            <span>Entrar</span>}
          </button>

          <hr className="border-slate-800 w-full" />

          <p>
            Ainda não tem uma conta?
            <Link to="/cadastro" className="text-indigo-800 hover:underline">
              Cadastre-se
            </Link>
          </p>        </form>
        <div className="fundoLogin hidden lg:block"></div>
      </div>
    </>
  );
}

export default Login;