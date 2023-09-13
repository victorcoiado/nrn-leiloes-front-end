import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useStateContext, useAuthContext } from "../contexts/ContextProvider";
import logo from '../assets/images/KRN_logo.png'

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const { currentColor } = useStateContext();
  const { user, signIn, failedMessage } = useAuthContext();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = {
      user: userName,
      password,
    };
    console.log(data);
    await signIn(data);
  };

  if (user) {
    const location = localStorage.getItem("@location");
    localStorage.removeItem("@location");

    if (location) {
      return <Navigate to={location} />;
    } else {
      return <Navigate to="/" />;
    }
  } else {
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex flex-col items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-72 h-auto dark:shadow-gray-800 mb-5"
              src={logo}
              alt="logo"
            />
            <span
              className="mb-3 text-2xl font-bold"
            >GESTORA DE LEILÕES E PUBLICIDADE</span>
          </a>

          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-semibold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Entre usando seu usuário e senha do ERP
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Usuário ERP
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    autoComplete="username"
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Senha
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <a href="#" className="text-sm font-medium text-gray-900 hover:underline dark:text-white">
                    Esqueceu sua senha?
                  </a>
                </div>
                <button
                  type="submit"
                  onClick={handleSignIn}
                  style={{ backgroundColor: currentColor }}
                  className="w-full text-white 
                  focus:ring-4 focus:outline-none focus:ring-primary-300 
                  font-medium rounded-lg text-sm 
                  px-5 py-2.5 text-center"
                >
                  Acessar
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Problemas ao acessar? {"  "}
                  <a href="#" className="font-medium text-gray-900 hover:underline dark:text-white">
                    Clique aqui
                  </a>
                </p>

                {failedMessage && <p className="text-red-600">{failedMessage}</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Login;
