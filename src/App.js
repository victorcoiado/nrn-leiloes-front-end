import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  ECommerce,
  Orders,
  Employees,
  Customers,
  Login,
  Home,
  Cartorios,
  CadastroCartorio,
  Processos,
  CadastroProcesso,
  Colaboradores,
  CadastroColaboradores,
  TipoPessoa,
  CadastroTipoPessoa,
  ProcessosAcoes,
  CadastroProcessosAcoes,
  ProcessosSetores,
  CadastroProcessosSetores,
  ProcessosStatus,
  CadastroProcessosStatus,
  TipoAcoes,
  CadastroTipoAcoes,
} from "./pages";

import { useAuthContext, useStateContext } from "./contexts/ContextProvider";

import "./App.css";
import NfEntrada from "./pages/NfEntrada";
import NFEntradaConsultaFornecedor from "./pages/NFEntradaConsultaFornecedor";
import axios from "axios";
import { getApiLeadUrl } from "./apiUtils";
import CadastroPessoa from "./pages/Cadastro/Pessoas/CadastroPessoa";
import Pessoas from "./pages/Cadastro/Pessoas/Pessoas";
import Usuarios from "./pages/Sistema/Usuarios";
import CadastroUsuarios from "./pages/Sistema/CadastroUsuarios";
import ProfileColaboradores from "./pages/Administrativo/Colaboradores/ProfileColaboradores";
import TipoProcesso from "./pages/Administrativo/TipoProcessos/TipoProcesso";
import CadastroTipoProcesso from "./pages/Administrativo/TipoProcessos/CadastroTipoProcesso";



const App = () => {
  const [tipoNF, setTipoNF] = useState(null);
  const [bancos, setBancos] = useState(null);
  const [centroCusto, setCentroCusto] = useState(null);
  const [contaContabil, setContaContabil] = useState(null);

  //NRN
  const [processosSetores, setProcessosSetores] = useState(null);
  const [processosAcoes, setProcessosAcoes] = useState(null)
  const [processosStatus, setProcessosStatus] = useState(null)
  const [pessoasTipos, setPessoasTipos] = useState(null)
  const [acoesTipos, setAcoesTipos] = useState(null)
  const [cartorios, setCartorios] = useState(null)
  const [colaboradores, setColaboradores] = useState(null)
  const [pessoas, setPessoas] = useState(null)
  const [tiposProcesso, setTiposProcesso] = useState(null)
  const [processos, setProcessos] = useState(null)


  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  const { user } = useAuthContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        var res = await axios.get(
          `${getApiLeadUrl()}/nrn/dominios?dominios=processos_setores,processos_acoes,processos_status,pessoas_tipo,acoes_tipos,tipos_processo`,
          {
            headers: headers,
          }
        );


        setProcessosSetores(res.data.processos_setores)
        setProcessosAcoes(res.data.processos_acoes)
        setProcessosStatus(res.data.processos_status)
        setPessoasTipos(res.data.pessoas_tipo)
        setAcoesTipos(res.data.acoes_tipos)
        setTiposProcesso(res.data.tipos_processo)
        console.log(tiposProcesso);

        var ress = await axios.get(
          `${getApiLeadUrl()}/nrn/cartorios`,
          {
            headers: headers,
          }
        );

        setCartorios(ress.data);


        var res_colaboradores = await axios.get(
          `${getApiLeadUrl()}/nrn/colaboradores`,
          {
            headers: headers,
          }
        );


        setColaboradores(res_colaboradores.data)

        var res_pessoas = await axios.get(
          `${getApiLeadUrl()}/nrn/pessoas`,
          {
            headers: headers,
          }
        );


        setPessoas(res_pessoas.data)

        var res_processos = await axios.get(
          `${getApiLeadUrl()}/nrn/processos`,
          {
            headers: headers,
          }
        );

        setProcessos(res_processos.data)

      } catch (err) {
        setProcessosSetores([]);
        setProcessosAcoes([]);
        setProcessosStatus([]);
        setPessoasTipos([]);
        setAcoesTipos([]);
        setCartorios([]);
        setColaboradores([]);
        setPessoas([]);
        setTiposProcesso([]);
        setProcessos([]);


        console.log(err);
      }
    };
    if (user) fetchData();
  }, [user]);



  return (
    <>
      {!user ? (
        <div className={currentMode === "Dark" ? "dark" : ""}>
          <Login />
        </div>
      ) : (
        <div className={currentMode === "Dark" ? "dark" : ""}>
          <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
              {/* BOTAO CONFIG */}
              <div
                className="fixed right-4 bottom-4"
                style={{ zIndex: "1000" }}
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                  style={{ background: currentColor, borderRadius: "50%" }}
                >
                  <FiSettings />
                </button>
              </div>

              {/* SIDEBAR */}
              {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                  <Sidebar />
                </div>
              ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                  <Sidebar />
                </div>
              )}

              <div
                className={`dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? "md:ml-72" : "flex-2"
                  }`}
              >
                {/* NAVBAR */}
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
                  <Navbar />
                </div>

                {/* ROTAS */}
                <div>
                  {themeSettings && <ThemeSettings />}

                  <Routes>
                    {/* DASHBOARD */}
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/ecommerce" element={<ECommerce />} />

                    {/* PAGES NRN - ADMINISTRATIVO*/}
                    <Route path="/manutencao/colaboradores" element={
                      <Colaboradores
                        colaboradores_data={colaboradores}
                      />
                    }
                    />
                    <Route path="/manutencao/cadastro_colaboradores" element={<CadastroColaboradores />} />
                    <Route path="/manutencao/profile_colaboradores" element={<ProfileColaboradores />} />
                    <Route path="/manutencao/pessoa-tipo" element={
                      <TipoPessoa
                        pessoas_tipos={pessoasTipos}
                      />
                    } />
                    <Route path="/manutencao/cadastro_pessoa-tipo/:id?" element={
                      <CadastroTipoPessoa
                        pessoas_tipos={pessoasTipos}

                      />} />
                    <Route path="/manutencao/processo-tipos" element={
                      <TipoProcesso
                        tipos_processo={tiposProcesso}
                      />
                    } />
                    <Route path="/manutencao/cadastro_processo-tipos/:id?" element={
                      <CadastroTipoProcesso
                        tipos_processo={tiposProcesso}
                      />} />
                    <Route path="/manutencao/cadastro_processo-acoes/:id?" element={
                      <CadastroProcessosAcoes
                        processos_acoes={processosAcoes}
                      />}
                    />
                    <Route path="/manutencao/processo-acoes" element={
                      <ProcessosAcoes
                        processos_acoes={processosAcoes}

                      />
                    } />
                    <Route path="/manutencao/cadastro_processo-acoes" element={<Orders />} />
                    <Route path="/manutencao/processo-setores" element={
                      <ProcessosSetores
                        processos_setores={processosSetores}
                      />
                    } />
                    <Route path="/manutencao/cadastro_processo-setores/:id?" element={
                      <CadastroProcessosSetores
                        processos_setores={processosSetores}
                      />} />
                    <Route path="/manutencao/processo-status" element={
                      <ProcessosStatus
                        processos_status={processosStatus}
                      />
                    } />
                    <Route path="/manutencao/cadastro_processo-status/:id?" element={
                      <CadastroProcessosStatus
                        processos_status={processosStatus}
                      />}
                    />
                    <Route path="/manutencao/acoes-tipo" element={
                      <TipoAcoes
                        acoes_tipos={acoesTipos}
                      />
                    } />
                    <Route path="/manutencao/cadastro_acoes-tipo/:id?" element={<CadastroTipoAcoes
                      acoes_tipos={acoesTipos}
                    />}
                    />
                    {/* PAGES NRN - CADASTRO */}
                    <Route path="/cadastros/cadastro_pessoa/:id?" element={<CadastroPessoa />} />
                    <Route path="/cadastros/pessoas" element={
                      <Pessoas
                        pessoas_data={pessoas}
                      />}
                    />
                    <Route path="/manutencao/cartorios"
                      element={
                        <Cartorios
                          cartorios_data={cartorios}
                        />
                      } />
                    <Route path="/manutencao/cadastro_cartorio/:id?" element={<CadastroCartorio />} />


                    <Route path="/cadastros/processos" element={
                      <Processos
                        processos_data={processos}
                      />
                    } />
                    <Route path="/cadastros/cadastro_processo/:id?" element={
                      <CadastroProcesso
                        processos_setores={processosSetores}
                        processos_acoes={processosAcoes}
                        processos_status={processosStatus}
                        cartorios_data={cartorios}
                        tipos_processo={tiposProcesso}
                        pessoas_data={pessoas}
                      />
                    } />
                    {/* USUARIOS */}
                    <Route path="/sistema/usuarios" element={<Usuarios />} />
                    <Route path="/sistema/cadastro_usuarios" element={<CadastroUsuarios />} />

                    <Route path="/orders" element={<Orders />} />
                    <Route path="/employees" element={<Employees />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/nfentrada" element={<NfEntrada />} />
                    <Route
                      path="/NFEntradaConsultaFornecedor"
                      element={
                        <NFEntradaConsultaFornecedor
                          tipoNF={tipoNF}
                          bancos={bancos}
                          centroCusto={centroCusto}
                          contaContabil={contaContabil}
                        />
                      }
                    />
                  </Routes>
                </div>

                {/* FOOTER */}
                <Footer />
              </div>
            </div>
          </BrowserRouter>
        </div>
      )}
    </>
  );
};

export default App;
