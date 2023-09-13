import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { getApiAuthUrl } from "../apiUtils";

const StateContext = createContext();
const AuthContext = createContext();

export const ContextProvider = ({ children }) => {
  // ESTADO GLOBAL DO APP (TAMANHO DA TELA, COR, DARKMODE, MENULATERAL, USERPROFILE)
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [userProfileClicked, setUserProfileClicked] = useState(null);
  const [loading, setLoading] = useState(false)

  // ESTADO DO LOGIN DO USUARIO
  const [user, setUser] = useState(null);
  const [failedMessage, setFailedMessage] = useState("");

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeMode", e.target.value);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem("colorMode", color);
  };

  const signIn = async ({ user, password }) => {
    let data = {
      username: user,
      password: password,
      atividade: 99,
    };

    try {
      const res = await axios.post(`${getApiAuthUrl()}/login`, data);
      setUser(res.data);

      localStorage.setItem("@Auth:user", res.data.username);
      localStorage.setItem("@Auth:token", res.data.token);
    } catch {
      localStorage.removeItem("@Auth:user");
      localStorage.removeItem("@Auth:token");

      setUser(null);

      setFailedMessage("Usuário ou senha inválidos.");
    }
  };

  const signOut = () => {
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("@Auth:token");

    setUser(null);
    setFailedMessage("");
  };

  //CADASTRO PROCESSO
  const [criacaoProcesso, setCriacaoProcesso] = useState(
    {
      id: 0,
      tipo: ""
    }
  )

  const [criado, setCriado] = useState(false)

  // const [body, setBody] = useState({
  //   "id": 0,
  //   "numero": "",
  //   "tipoProcesso": "",
  //   "fisicoDigital": "",
  //   "idPessoaAutor": 0,
  //   "idPessoaAdvogado": 0,
  //   "idPessoaLicitante": 0,
  //   "idSetor": 0,
  //   "reu": "",
  //   "idAcao": 0,
  //   "idStatus": 0,
  //   "idCartorio": 0,
  //   "protocoloCorreios": "",
  //   "rastreioCorreios": "",
  //   "valorDje": 0.00,
  //   "dataRemessa": "",
  //   "dataCriacao": "",
  //   "urlArquivosProcesso": "",
  //   "obs": ""
  //   // "ItensOrcamento": [
  //   //   {
  //   //     "IdPessoaVeiculo": 3,
  //   //     "NomeContato": "Fulano contato do veiculo",
  //   //     "ValorTotalOrcamento": 99,
  //   //     "QtdPublicacoes": 4,
  //   //     "Desconto": 0
  //   //   }
  //   // ]
  // })

  const [body, setBody] = useState()


  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        signIn,
        signOut,
        failedMessage,
      }}
    >
      <StateContext.Provider
        value={{
          currentColor,
          currentMode,
          activeMenu,
          screenSize,
          setScreenSize,
          userProfileClicked,
          setUserProfileClicked,
          setActiveMenu,
          setCurrentColor,
          setCurrentMode,
          setMode,
          setColor,
          themeSettings,
          setThemeSettings,
          loading,
          setLoading,
          criacaoProcesso,
          setCriacaoProcesso,
          criado,
          setCriado,
          body,
          setBody
        }}
      >
        {children}
      </StateContext.Provider>
    </AuthContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useAuthContext = () => useContext(AuthContext);
