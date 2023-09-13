import React, { useState } from "react";
import { Header, Button, Tabela } from "../components";
import Input from "../components/Input";
import { useAuthContext, useStateContext } from "../contexts/ContextProvider";
import axios from "axios";
import { getApiLeadUrl } from "../apiUtils";
import NfEntrada from "./NfEntrada";
import Loading from "../components/Loading";

const cabecalhoTabela = [
  "Emitente",
  "Nota",
  "Série",
  "Chave",
  "Cód Modelo NF",
  "Modelo NF",
  "Valor Total",
];

const NFEntradaConsultaFornecedor = ({
  tipoNF,
  bancos,
  centroCusto,
  contaContabil,
}) => {
  const [notasFornecedor, setNotasFornecedor] = useState(null);
  const [dadosNota, setDadosNota] = useState(null);
  const [cnpj, setCnpj] = useState("");
  const { currentMode, currentColor, loading, setLoading } = useStateContext();


  const { user } = useAuthContext();

  const handleCnpjSearch = async () => {
    try {
      setLoading(true)
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };

      const res = await axios.get(
        `${getApiLeadUrl()}/contabil/nfentrada?cnpj=${cnpj}`,
        {
          headers: headers,
        }
      );
      setNotasFornecedor(res.data.fornecedores);
      setLoading(false)
    } catch (err) {
      setNotasFornecedor(null);
      console.log(err);
    }
  };

  const editarItem = (item) => {
    setDadosNota(item);
  };

  const handleClickVoltar = () => {
    setDadosNota(null);
  };

  return (
    <>
      {dadosNota ? (
        <div className={currentMode === "Dark" ? "dark" : ""}>
          <NfEntrada
            dadosNota={dadosNota}
            tipoNF={tipoNF}
            bancos={bancos}
            centroCusto={centroCusto}
            contaContabil={contaContabil}
            handleClickVoltar={handleClickVoltar}
          />
        </div>
      ) : (
        <div className="m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl dark:bg-main-dark-bg">
          <Header
            title="Notas Fiscais de Entrada"
            category="Consulta Fornecedor"
          />

          <div className="mb-10">
            <Input
              name={"cnpj"}
              type={"text"}
              label={"CNPJ"}
              placeholder={"00000000000"}
              autocomplete={"cnpj"}
              onChange={(e) => setCnpj(e.target.value)}
              className="block mb-10 w-full rounded-md border-0 py-1.5 text-gray-900 
                shadow-sm ring-1 ring-inset ring-gray-300 
                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:bg-secondary-dark-bg dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />

            <Button
              color="white"
              bgColor={currentColor}
              text="Pesquisar"
              borderRadius="10px"
              size="md"
              handleOnClick={handleCnpjSearch}
            />
          </div>

          {loading &&
            <Loading />
          }
          {notasFornecedor &&
            notasFornecedor.map((fornecedor, index) => (
              <div className="mb-10 border-gray-200" key={index}>
                <p className="text-xl font-extrabold tracking-tight text-gray-700 dark:text-gray-200">
                  {fornecedor.destinatario} - {fornecedor.razaoSocial} (
                  {fornecedor.cnpjCpf})
                </p>
                <Tabela
                  id={index}
                  cabecalho={cabecalhoTabela}
                  dados={fornecedor.notasFiscaisResumo}
                  editar={editarItem}
                ></Tabela>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default NFEntradaConsultaFornecedor;
