import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../../models/UsuarioLogin";
import { login } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

interface AuthContextProps {
  // Interface que define as propriedades do contexto
  usuario: UsuarioLogin;
  handleLogout(): void;
  handleLogin(usuario: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  // Interface que define as propriedades do componente AuthProvider
  children: ReactNode; // ReactNode é um tipo do React que aceita qualquer elemento filho
}

export const AuthContext = createContext({} as AuthContextProps); // Cria o contexto AuthContext

export function AuthProvider({ children }: AuthProviderProps) {
  // Função que retorna o componente AuthContext

  const [usuario, setUsuario] = useState<UsuarioLogin>({
    // Estado que guarda o usuário logado
    id: 0,
    nome: "",
    usuario: "",
    senha: "",
    foto: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false); // Estado que indica quando a animação (loader) será carregada

  async function handleLogin(userLogin: UsuarioLogin) {
    // Função que faz o login do usuário
    setIsLoading(true);
    try {
      // Tenta fazer o login
      await login(`/usuarios/logar`, userLogin, setUsuario);
      ToastAlerta("Usuário logado com sucesso", "sucesso");
      setIsLoading(false);
    } catch (error) {
      // Se der erro, exibe o erro no console e exibe um ToastAlerta
      console.log(error);
      ToastAlerta("Dados do usuário inconsistentes", "erro");
      setIsLoading(false);
    }
  }

  function handleLogout() {
    // Função que faz o logout do usuário
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      foto: "",
      token: "",
    });
  }
  return (
    // Retorna o componente AuthContext.Provider com as propriedades do contexto
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
