import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import * as Yup from 'yup';

const FormItemNota = ({itemNota, handleSubmitItem}) => {
  const { currentColor } = useStateContext();

  const validacaoNotaFiscalEntradaItem = Yup.object().shape({});

  return (
    <div className="flex-col border-t-1 border-color p-4 ml-4">
      <Formik
        initialValues={itemNota}
        validationSchema={validacaoNotaFiscalEntradaItem}
        onSubmit={handleSubmitItem}
      >
        {({ values, errors, isSubmitting }) => (
          <Form>
            {/* EMITENTE, NOTA, SERIE */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="emitente" className="block text-sm font-medium leading-6 text-gray-900">Emitente</label>
                <Field type="text" name="emitente" disabled className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="emitente" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="nota" className="block text-sm font-medium leading-6 text-gray-900">Nota</label>
                <Field type="text" name="nota" disabled className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="nota" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="serie" className="block text-sm font-medium leading-6 text-gray-900">Serie</label>
                <Field type="text" name="serie" disabled className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="serie" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="codProdutoInterno" className="block text-sm font-medium leading-6 text-gray-900">Cod Produto Interno</label>
                <Field type="text" name="codProdutoInterno" disabled className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="codProdutoInterno" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="descricaoProdutoInterno" className="block text-sm font-medium leading-6 text-gray-900">Descrição Produto Interno</label>
                <Field type="text" name="descricaoProdutoInterno" disabled className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="descricaoProdutoInterno" className="text-red-500"></ErrorMessage>
              </div>
            </div>          

            {/* ICMS */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="icms" className="block text-sm font-medium leading-6 text-gray-900">ICMS</label>
                <Field type="text" name="icms" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="icms" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="baseICMS" className="block text-sm font-medium leading-6 text-gray-900">Base ICMS</label>
                <Field type="text" name="baseICMS" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="baseICMS" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="aliquotaICMS" className="block text-sm font-medium leading-6 text-gray-900">Aliquota ICMS</label>
                <Field type="text" name="aliquotaICMS" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="aliquotaICMS" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="isentoICMS" className="block text-sm font-medium leading-6 text-gray-900">Isento ICMS</label>
                <Field type="text" name="isentoICMS" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="isentoICMS" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="outrosICMS" className="block text-sm font-medium leading-6 text-gray-900">Outros ICMS</label>
                <Field type="text" name="outrosICMS" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="outrosICMS" className="text-red-500"></ErrorMessage>
              </div>
            </div>

            {/* IPI */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="ipi" className="block text-sm font-medium leading-6 text-gray-900">IPI</label>
                <Field type="text" name="ipi" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="ipi" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="baseIPI" className="block text-sm font-medium leading-6 text-gray-900">Base IPI</label>
                <Field type="text" name="baseIPI" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="baseIPI" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="aliquotaIPI" className="block text-sm font-medium leading-6 text-gray-900">Aliquota IPI</label>
                <Field type="text" name="aliquotaIPI" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="aliquotaIPI" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="isentoIPI" className="block text-sm font-medium leading-6 text-gray-900">Isento IPI</label>
                <Field type="text" name="isentoIPI" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="isentoIPI" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="outrosIPI" className="block text-sm font-medium leading-6 text-gray-900">Outros IPI</label>
                <Field type="text" name="outrosIPI" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="outrosIPI" className="text-red-500"></ErrorMessage>
              </div>
            </div>

            {/* CENTRO CUSTO, CONTA CONTABIL, CFO, PRODUTO */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="centroCusto" className="block text-sm font-medium leading-6 text-gray-900">Centro Custo</label>
                <Field type="text" name="centroCusto" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="centroCusto" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="centroCustoDescricao" className="block text-sm font-medium leading-6 text-gray-900">Centro Custo Descrição</label>
                <Field type="text" name="centroCustoDescricao" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="centroCustoDescricao" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="contaContabil" className="block text-sm font-medium leading-6 text-gray-900">Conta Contábil</label>
                <Field type="text" name="contaContabil" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="contaContabil" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="cfo" className="block text-sm font-medium leading-6 text-gray-900">CFO</label>
                <Field type="text" name="cfo" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="cfo" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="frete" className="block text-sm font-medium leading-6 text-gray-900">Frete</label>
                <Field type="text" name="frete" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="frete" className="text-red-500"></ErrorMessage>
              </div>
            </div>

            {/* OPERACAO, PEDIDO, QTD, RETIDO */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="operacao" className="block text-sm font-medium leading-6 text-gray-900">Operação</label>
                <Field type="text" name="operacao" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="operacao" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="pedido" className="block text-sm font-medium leading-6 text-gray-900">Pedido</label>
                <Field type="text" name="pedido" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="pedido" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="qtd" className="block text-sm font-medium leading-6 text-gray-900">Qtd</label>
                <Field type="text" name="qtd" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="qtd" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="retido" className="block text-sm font-medium leading-6 text-gray-900">Retido</label>
                <Field type="text" name="retido" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="retido" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="baseRetido" className="block text-sm font-medium leading-6 text-gray-900">Base Retido</label>
                <Field type="text" name="baseRetido" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="baseRetido" className="text-red-500"></ErrorMessage>
              </div>
            </div>

            {/* VALORES */}
            <div className="grid auto-cols-6 gap-2 sm:grid-cols-5 mb-10 border-b border-gray-900/10 pb-12">
              <div>
                <label htmlFor="unidadeMedida" className="block text-sm font-medium leading-6 text-gray-900">Unidade Medida</label>
                <Field type="text" name="unidadeMedida" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="unidadeMedida" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="valor" className="block text-sm font-medium leading-6 text-gray-900">Valor</label>
                <Field type="text" name="valor" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="valor" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="valorTotal" className="block text-sm font-medium leading-6 text-gray-900">Valor Total</label>
                <Field type="text" name="valorTotal" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="valorTotal" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="valorUnitario" className="block text-sm font-medium leading-6 text-gray-900">Valor Unitário</label>
                <Field type="text" name="valorUnitario" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="valorUnitario" className="text-red-500"></ErrorMessage>
              </div>
              <div>
                <label htmlFor="desconto" className="block text-sm font-medium leading-6 text-gray-900">Desconto</label>
                <Field type="text" name="desconto" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 
                  ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />

                <ErrorMessage name="desconto" className="text-red-500"></ErrorMessage>
              </div>
            </div>

            <button
              type="submit"
              style={{ backgroundColor: currentColor, borderRadius: "10px" }}
              className="flex justify-end text-white text-md p-3 border hover:drop-shadow-xl"
              disabled={isSubmitting}
            >
              Salvar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormItemNota;
