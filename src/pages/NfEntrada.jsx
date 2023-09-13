import { useAuthContext, useStateContext } from "../contexts/ContextProvider";
import { useEffect, useState } from "react";
import axios from "axios";
import { getApiLeadUrl } from "../apiUtils";
import { FormItemNota, Header, PainelLateral, Tabela } from "../components";
import { MdOutlineCancel } from "react-icons/md";
import Loading from "../components/Loading";
import { ErrorMessage, Field, Form, Formik } from "formik";
import dayjs from "dayjs";
import * as Yup from 'yup';

const trataDatas = (nf) => {
  return {
    ...nf,
    dataEmissao: dayjs(nf.dataEmissao).format("YYYY-MM-DD"),
    dataEmissaoNF: dayjs(nf.dataEmissaoNF).format("YYYY-MM-DD"),
    dataReferencia: dayjs(nf.dataReferencia).format("YYYY-MM-DD"),
    dataVencimento: dayjs(nf.dataVencimento).format("YYYY-MM-DD"),
    dataEntrada: dayjs(nf.dataEntrada).format("YYYY-MM-DD"),
    dataInclusao: dayjs(nf.dataInclusao).format("YYYY-MM-DD"),
  }
}

const NfEntrada = ({
  dadosNota,
  tipoNF,
  bancos,
  centroCusto,
  contaContabil,
  handleClickVoltar,
}) => {
  const [notaFiscalFornecedor, setNotaFiscalFornecedor] = useState(null);
  const [itemNota, setItemNota] = useState(null);

  const { user } = useAuthContext();
  const { currentColor, loading, setLoading } = useStateContext();

  const validacaoNotaFiscalEntrada = Yup.object().shape({
    fornecedor: Yup.object().shape({
      destinatario: Yup.string().required("*Campo obrigatório"),
    }),
    // notaFiscal: Yup.object().shape({}),
    // itens: Yup.array().of(Yup.object().shape([{}]))
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        const res = await axios.get(
          `${getApiLeadUrl()}/contabil/nfentrada-itens?emitente=${dadosNota.emitente
          }&nota=${dadosNota.nota}&serie=${dadosNota.serie}`,
          {
            headers: headers,
          }
        );

        let notasFiscaisCamposDataTratados = res.data.fornecedores[0].notasFiscais.map(trataDatas);

        let data = {
          fornecedor: res.data.fornecedores[0],
          notaFiscal: notasFiscaisCamposDataTratados[0],
          itens: res.data.fornecedores[0].notasFiscais[0].itens
        };

        setNotaFiscalFornecedor(data);
        setLoading(false);
      } catch (err) {
        setNotaFiscalFornecedor(null);
        console.log(err);
      }
    };

    if (user && dadosNota) fetchData();
  }, [setLoading, dadosNota, user]);

  const dadosGridEmitenteNotaSerie = [
    dadosNota.emitente,
    dadosNota.nota,
    dadosNota.serie,
  ];

  const selecionarCamposProduto = (items) => {
    const { codProdutoInterno, descricaoProdutoInterno, valor } = items;

    return { codProdutoInterno, descricaoProdutoInterno, valor };
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const headers = {
        Authorization: `Bearer ${user.token}`,
        "Content-Type": "application/json",
      };

      values.itens = notaFiscalFornecedor.itens;
      values.notaFiscal.itens = values.itens;
      values.fornecedor.notasFiscais = [values.notaFiscal];

      const res = await axios.post(`${getApiLeadUrl()}/contabil/nfentrada`, values.fornecedor,
        {
          headers: headers,
        });

      console.log("publicou pra API e devolveu =>", res);
    } catch (err) {
      console.log(err);
    }

    setSubmitting(false);
  }

  // TRATAMENTO ITEM
  const escolherItemParaEditar = (itemEscolhido) => {
    var itemNota = notaFiscalFornecedor.itens.filter((produto) =>
      produto.codProdutoInterno === itemEscolhido.codProdutoInterno &&
      produto.descricaoProdutoInterno === itemEscolhido.descricaoProdutoInterno &&
      produto.valor === itemEscolhido.valor)[0];

    setItemNota(itemNota);
  };

  const deletarItem = (itemRemovido) => {
    var novaListaDeItens = notaFiscalFornecedor.itens.filter((produto) =>
      produto.codProdutoInterno !== itemRemovido.codProdutoInterno &&
      produto.descricaoProdutoInterno !== itemRemovido.descricaoProdutoInterno &&
      produto.valor !== itemRemovido.valor);

    setNotaFiscalFornecedor({ ...notaFiscalFornecedor, itens: novaListaDeItens });
  };

  const handleSubmitItem = async (itemEditado, { setSubmitting }) => {
    var novaListaDeItens = notaFiscalFornecedor.itens.filter((produto) =>
      produto.codProdutoInterno !== itemEditado.codProdutoInterno &&
      produto.descricaoProdutoInterno !== itemEditado.descricaoProdutoInterno &&
      produto.valor !== itemEditado.valor);

    novaListaDeItens.push(itemEditado);

    setNotaFiscalFornecedor({ ...notaFiscalFornecedor, itens: novaListaDeItens });

    setSubmitting(false);

    setItemNota(null);
  }

  const handleNovoItem = () => {
    setItemNota({emitente: dadosNota.emitente, nota: dadosNota.nota, serie: dadosNota.serie,
      aliquotaICMS: 0, aliquotaIPI: 0, baseICMS: 0, baseIPI: 0, baseRetido: 0, 
      centroCusto: "www3", centroCustoDescricao: "", cfo: "", codProdutoInterno: "300312", contaContabil: "",
      desconto: 10, descricaoProdutoInterno: "DESPESAS DIVERSAS", frete: 0, icms: 0, ipi: 0, isentoICMS: 0,
      isentoIPI: 10, operacao: "", outrosICMS: 0, outrosIPI: 0, pedido: "", qtd: 0, retido: 0,
      unidadeMedida: "", valor: 0, valorTotal: 0, valorUnitario: 0,
    })
  }

  return (
    <>
      {loading && (
        <Loading />
      )
      }
      {notaFiscalFornecedor && (
        <div className="m-2 md:m-10 p-2 md:p-10 h-screen bg-white rounded-3xl">
          {/* HEADER */}
          <Header category="" title="Lançamento de Nota Fiscal de Entrada" />
          {/* GRID EMITENTE, NOTA, SERIE */}
          <div>
            <Tabela
              id="cabEmitenteNotaSerie"
              cabecalho={["Emitente", "Nota", "Serie"]}
              dados={[dadosGridEmitenteNotaSerie]}
            />
          </div>

          {/* BOTAO VOLTAR PARA TELA DE PESQUISA */}
          <div className="fixed right-12 top-32" style={{ zIndex: "1000" }}>
            <button
              type="button"
              onClick={handleClickVoltar}
              className="text-lg text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              style={{ background: currentColor, borderRadius: "50%" }}
            >
              <MdOutlineCancel />
            </button>
          </div>

          <div className="flex-col border-t-1 border-color p-4 ml-4">
            <Formik initialValues={notaFiscalFornecedor}
              onSubmit={handleSubmit} validationSchema={validacaoNotaFiscalEntrada}>
              {({ values, errors, isSubmitting }) => (
                <Form>
                  {/* CABEÇALHO NOTA */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
                    <div>
                      <label htmlFor="fornecedor.destinatario" className="block text-sm font-medium leading-6 text-gray-900">Destinatario</label>
                      <Field type="text" name="fornecedor.destinatario"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.destinatario">{msg => <span className="text-red-500">{msg}</span>}</ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.integracao" className="block text-sm font-medium leading-6 text-gray-900">Integração</label>
                      <Field type="text" name="fornecedor.integracao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.integracao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.nome" className="block text-sm font-medium leading-6 text-gray-900">Nome</label>

                      <Field type="text" name="fornecedor.nome"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.nome"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.razaoSocial" className="block text-sm font-medium leading-6 text-gray-900">Razão Social</label>

                      <Field type="text" name="fornecedor.razaoSocial"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.razaoSocial"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.cnpjCpf" className="block text-sm font-medium leading-6 text-gray-900">CNPJ/CPF</label>

                      <Field type="text" name="fornecedor.cnpjCpf"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.cnpjCpf"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.inscricaoEstadual" className="block text-sm font-medium leading-6 text-gray-900">Inscrição Estadual</label>

                      <Field
                        type="text"
                        name="fornecedor.inscricaoEstadual"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.inscricaoEstadual"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.rg" className="block text-sm font-medium leading-6 text-gray-900">RG</label>

                      <Field type="text" name="fornecedor.rg"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.rg"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.codSituacao" className="block text-sm font-medium leading-6 text-gray-900">Código Situação</label>

                      <Field type="text" name="fornecedor.codSituacao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.codSituacao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="fornecedor.situacao" className="block text-sm font-medium leading-6 text-gray-900">Situação</label>

                      <Field type="text" name="fornecedor.situacao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="fornecedor.situacao"></ErrorMessage>
                    </div>
                  </div>

                  {/* notasFiscais */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
                    {/* {notaFiscal.nfOriginalBaseSN ? (<p>Temos a NF Original. Clique aqui para ver</p>) : ("")} */}

                    <div>
                      <label htmlFor="notaFiscal.nfOriginalBaseSN" className="block text-sm font-medium leading-6 text-gray-900">NF Original</label>
                      <Field type="text" name="notaFiscal.nfOriginalBaseSN"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.nfOriginalBaseSN"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.chave" className="block text-sm font-medium leading-6 text-gray-900">Chave</label>
                      <Field type="text" name="notaFiscal.chave"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.chave"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.codModeloNF" className="block text-sm font-medium leading-6 text-gray-900">Cód Modelo NF</label>
                      <Field type="text" name="notaFiscal.codModeloNF"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.codModeloNF"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.modeloNF" className="block text-sm font-medium leading-6 text-gray-900">Modelo NF</label>
                      <Field type="text" name="notaFiscal.modeloNF"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.modeloNF"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.situacaoNfSefaz" className="block text-sm font-medium leading-6 text-gray-900">Situação NF Sefaz</label>
                      <Field type="text" name="notaFiscal.situacaoNfSefaz"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.situacaoNfSefaz"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.despAcess" className="block text-sm font-medium leading-6 text-gray-900">Desp Acess</label>
                      <Field type="text" name="notaFiscal.despAcess"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.despAcess"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.complementar" className="block text-sm font-medium leading-6 text-gray-900">Complementar</label>
                      <Field type="text" name="notaFiscal.complementar"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.complementar"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.tipoServico" className="block text-sm font-medium leading-6 text-gray-900">Tipo Serviço</label>
                      <Field type="text" name="notaFiscal.tipoServico"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.tipoServico"></ErrorMessage>
                    </div>
                  </div>

                  {/* notasFiscais DATAS */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
                    <div>
                      <label htmlFor="notaFiscal.dataEmissaoNF" className="block text-sm font-medium leading-6 text-gray-900">Data Emissão NF</label>
                      <Field type="date" name="notaFiscal.dataEmissaoNF" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataEmissaoNF"></ErrorMessage>
                    </div>
                    <div>
                      <label htmlFor="notaFiscal.dataEmissao" className="block text-sm font-medium leading-6 text-gray-900">Data Emissão</label>
                      <Field type="date" name="notaFiscal.dataEmissao" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataEmissao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.dataReferencia" className="block text-sm font-medium leading-6 text-gray-900">Data Referência</label>
                      <Field type="date" name="notaFiscal.dataReferencia" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataReferencia"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.dataVencimento" className="block text-sm font-medium leading-6 text-gray-900">Data Vencimento</label>
                      <Field type="date" name="notaFiscal.dataVencimento" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataVencimento"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.dataEntrada" className="block text-sm font-medium leading-6 text-gray-900">Data Entrada</label>
                      <Field type="date" name="notaFiscal.dataEntrada" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataEntrada"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.dataInclusao" className="block text-sm font-medium leading-6 text-gray-900">Data Inclusão</label>
                      <Field type="date" name="notaFiscal.dataInclusao" max="9999-12-31"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.dataInclusao"></ErrorMessage>
                    </div>
                  </div>

                  {/* notasFiscais PEDIDO, CENTRO CUSTO, TIPO DIGITACAO */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
                    <div>
                      <label htmlFor="notaFiscal.pedido" className="block text-sm font-medium leading-6 text-gray-900">Pedido</label>
                      <Field type="text" name="notaFiscal.pedido"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.pedido"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.requisicao" className="block text-sm font-medium leading-6 text-gray-900">Requisição</label>
                      <Field type="text" name="notaFiscal.requisicao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.requisicao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.grupo" className="block text-sm font-medium leading-6 text-gray-900">Grupo</label>
                      <Field type="text" name="notaFiscal.grupo"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.grupo"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.deuEntradaSN" className="block text-sm font-medium leading-6 text-gray-900">Deu Entrada?</label>
                      <Field type="text" name="notaFiscal.deuEntradaSN"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.deuEntradaSN"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.cfop" className="block text-sm font-medium leading-6 text-gray-900">CFOP</label>
                      <Field type="text" name="notaFiscal.cfop"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.cfop"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.cfopDescricao" className="block text-sm font-medium leading-6 text-gray-900">CFOP Descrição</label>
                      <Field type="text" name="notaFiscal.cfopDescricao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.cfopDescricao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.cfopOriginal" className="block text-sm font-medium leading-6 text-gray-900">CFOP Original</label>
                      <Field type="text" name="notaFiscal.cfopOriginal"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.cfopOriginal"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.operacaoDescricaoOriginal" className="block text-sm font-medium leading-6 text-gray-900">Operação Descrição Original</label>
                      <Field type="text" name="notaFiscal.operacaoDescricaoOriginal"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.operacaoDescricaoOriginal"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.operacao" className="block text-sm font-medium leading-6 text-gray-900">Operação</label>
                      <Field type="text" name="notaFiscal.operacao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.operacao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.operacaoDescricao" className="block text-sm font-medium leading-6 text-gray-900">Operação Descrição</label>
                      <Field type="text" name="notaFiscal.operacaoDescricao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.operacaoDescricao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.centroCusto" className="block text-sm font-medium leading-6 text-gray-900">Centro Custo</label>
                      <Field type="text" name="notaFiscal.centroCusto"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.centroCusto"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.centroCustoDescricao" className="block text-sm font-medium leading-6 text-gray-900">Centro Custo Descrição</label>
                      <Field type="text" name="notaFiscal.centroCustoDescricao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.centroCustoDescricao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.contaContabil" className="block text-sm font-medium leading-6 text-gray-900">Conta Contábil</label>
                      <Field type="text" name="notaFiscal.contaContabil"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.contaContabil"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.contaContabilDescricao" className="block text-sm font-medium leading-6 text-gray-900">Conta Contábil Descrição</label>
                      <Field type="text" name="notaFiscal.contaContabilDescricao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.contaContabilDescricao"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.tipoDigitacaoCod" className="block text-sm font-medium leading-6 text-gray-900">Tipo Digitação Cod</label>
                      <Field type="text" name="notaFiscal.tipoDigitacaoCod"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.tipoDigitacaoCod"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.tipoDigitacaoDescricao" className="block text-sm font-medium leading-6 text-gray-900">Tipo Digitação Descrição</label>
                      <Field type="text" name="notaFiscal.tipoDigitacaoDescricao"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.tipoDigitacaoDescricao"></ErrorMessage>
                    </div>
                  </div>

                  {/* notasFiscais DESTINATARIO, DEPTO, IPI E ALIQUOTA */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
                    <div>
                      <label htmlFor="notaFiscal.destinatario" className="block text-sm font-medium leading-6 text-gray-900">Destinatário</label>
                      <Field type="text" name="notaFiscal.destinatario"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.destinatario"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.codDepto" className="block text-sm font-medium leading-6 text-gray-900">Cód Depto</label>
                      <Field type="text" name="notaFiscal.codDepto"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.codDepto"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.nomeDepto" className="block text-sm font-medium leading-6 text-gray-900">Nome Depto</label>
                      <Field type="text" name="notaFiscal.nomeDepto"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.nomeDepto"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.cnpjDepto" className="block text-sm font-medium leading-6 text-gray-900">CNPJ Depto</label>
                      <Field type="text" name="notaFiscal.cnpjDepto"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.cnpjDepto"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.baseRetido" className="block text-sm font-medium leading-6 text-gray-900">Base Retido</label>
                      <Field type="text" name="notaFiscal.baseRetido"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.baseRetido"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.retido" className="block text-sm font-medium leading-6 text-gray-900">Retido</label>
                      <Field type="text" name="notaFiscal.retido"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.retido"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.baseICMS" className="block text-sm font-medium leading-6 text-gray-900">Base ICMS</label>
                      <Field type="text" name="notaFiscal.baseICMS"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.baseICMS"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.icms" className="block text-sm font-medium leading-6 text-gray-900">ICMS</label>
                      <Field type="text" name="notaFiscal.icms"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.icms"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.ipi" className="block text-sm font-medium leading-6 text-gray-900">IPI</label>
                      <Field type="text" name="notaFiscal.ipi"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.ipi"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.isentoICMS" className="block text-sm font-medium leading-6 text-gray-900">Isento ICMS</label>
                      <Field type="text" name="notaFiscal.isentoICMS"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.isentoICMS"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.aliquotaICMS" className="block text-sm font-medium leading-6 text-gray-900">Alíquota ICMS</label>
                      <Field type="text" name="notaFiscal.aliquotaICMS"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.aliquotaICMS"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.outrosICMS" className="block text-sm font-medium leading-6 text-gray-900">Outros ICMS</label>
                      <Field type="text" name="notaFiscal.outrosICMS"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.outrosICMS"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.baseIPI" className="block text-sm font-medium leading-6 text-gray-900">Base IPI</label>
                      <Field type="text" name="notaFiscal.baseIPI"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.baseIPI"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.isentoIPI" className="block text-sm font-medium leading-6 text-gray-900">Isento IPI</label>
                      <Field type="text" name="notaFiscal.isentoIPI"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.isentoIPI"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.outrosIPI" className="block text-sm font-medium leading-6 text-gray-900">Outros IPI</label>
                      <Field type="text" name="notaFiscal.outrosIPI"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.outrosIPI"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.aliquotaIPI" className="block text-sm font-medium leading-6 text-gray-900">Alíquota IPI</label>
                      <Field type="text" name="notaFiscal.aliquotaIPI"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.aliquotaIPI"></ErrorMessage>
                    </div>
                  </div>

                  {/* notasFiscais DESCONTO, FRETE E VALOR TOTAL ORIGINAL */}
                  <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-gray-900/10 pb-12">
                    <div>
                      <label htmlFor="notaFiscal.desconto" className="block text-sm font-medium leading-6 text-gray-900">Desconto</label>
                      <Field type="text" name="notaFiscal.desconto"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.desconto"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.frete" className="block text-sm font-medium leading-6 text-gray-900">Frete</label>
                      <Field type="text" name="notaFiscal.frete"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.frete"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.valorUnitario" className="block text-sm font-medium leading-6 text-gray-900">Valor Unitário</label>
                      <Field type="text" name="notaFiscal.valorUnitario"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.valorUnitario"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.valorTotal" className="block text-sm font-medium leading-6 text-gray-900">Valor Total</label>
                      <Field type="text" name="notaFiscal.valorTotal"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.valorTotal"></ErrorMessage>
                    </div>

                    <div>
                      <label htmlFor="notaFiscal.valorTotalOriginal" className="block text-sm font-medium leading-6 text-gray-900">Valor Total Original</label>
                      <Field type="text" name="notaFiscal.valorTotalOriginal"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />

                      <ErrorMessage name="notaFiscal.valorTotalOriginal"></ErrorMessage>
                    </div>
                  </div>

                  <div>
                    {/* GRID ITENS */}
                    <Tabela cabecalho={[
                      "Código Produto Interno",
                      "Descrição Produto Interno",
                      "Valor",
                    ]}
                    dados={notaFiscalFornecedor.itens.map(selecionarCamposProduto)}
                    editar={escolherItemParaEditar}
                    deletar={deletarItem}
                    />

                    <button type="button" style={{ backgroundColor: currentColor, borderRadius: "10px" }} 
                      onClick={handleNovoItem}
                      className="justify-items-end text-white text-md p-3 border hover:drop-shadow-xl" disabled={isSubmitting} >
                        Adicionar novo item
                    </button>
                  </div>

                  {/* {console.log("erross", errors)} */}

                  <div className="flex justify-center border-gray-900">
                    <button type="submit" style={{ backgroundColor: currentColor, borderRadius: "10px" }} 
                      className="text-white text-md p-3 border hover:drop-shadow-xl" disabled={isSubmitting} >
                        Salvar
                    </button>
                  </div>

                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}

      {/* PAINEL ADICIONAR/EDITAR ITEM  */}
      {itemNota && (
        <PainelLateral 
          titulo={itemNota.emitente 
            ? `Editar ${itemNota.descricaoProdutoInterno} (${itemNota.codProdutoInterno})` 
            : "Adicionar novo item na nota"} 
          handleClickFechar={setItemNota}>
            <FormItemNota    
              itemNota={itemNota} 
              handleSubmitItem={handleSubmitItem}>
            </FormItemNota>
        </PainelLateral>
      )}
    </>
  );
};

export default NfEntrada;
