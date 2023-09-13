import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { useAuthContext, useStateContext } from "../contexts/ContextProvider";
import { AiFillCaretRight, AiFillControl } from "react-icons/ai";
import logo from '../assets/images/KRN_logo.png'

import axios from "axios";
import { getApiAuthUrl } from "../apiUtils";

const Sidebar = () => {
  const [links, setLinks] = useState([]);


  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = { Authorization: `Bearer ${user.token}` };

        var res = await axios.get(`${getApiAuthUrl()}/aplicacoes?sistema=4`, {
          headers: headers,
        });

        setLinks(res.data);
      } catch (err) {
        setLinks([]);
      }
    };
    fetchData();
  }, [user]);

  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) setActiveMenu(false);
  };

  const activeLinkCss =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-white text-md m-2 hover:bg-light-gray";
  const normalLinkCss =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-gray-700 text-md dark:text-gray-200 dark:hover:text-black m-2 hover:bg-light-gray";

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex flex-row justify-center content-center items-center mr-5">
            {/* LOGO */}
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 
           text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              {/* <SiShopware /> <span>Yakult Hub Financeiro</span> */}
              <div htmlFor="/home" className="flex flex-col items-center">
                <img
                  className="w-28 h-auto mb-3 mt-3"

                  src={logo}
                >
                </img>
                <span className="text-sm text-center">GESTORA DE LEILÕES E PUBLICIDADE</span>

              </div>
            </Link>

            {/* BOTAO FECHAR */}
            <button
              type="button"
              onClick={() => setActiveMenu((prevActiveMenu) => !prevActiveMenu)}
              style={{ color: currentColor }}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel></MdOutlineCancel>
            </button>
          </div>

          <div className="mt-10">
            {links.map((item, index) => (
              <div className="mt-10" key={index}>
                {/* NOME DO COMPONENT TITULO */}
                <span className="text-gray-600 font-bold dark:text-gray-200 m-3 mt-4 uppercase">
                  {item.name}
                </span>
                {/* GRUPO */}
                {item.grupo.map((grupo, index) => (
                  <div key={index}>
                    {/* NOME DO GRUPO */}
                    <p className="ml-6 text-gray-400 dark:text-gray-200 m-3 mt-4 capitalize">
                      {grupo.name}
                    </p>

                    {/* ITEMS_GRUPO */}
                    {grupo.items.map((items_grupo) => (
                      <NavLink
                        // to={`/${items_grupo.to}`}
                        to="/ecommerce"
                        key={items_grupo.id}
                        onClick={handleCloseSideBar}
                        style={({ isActive }) => ({
                          backgroundColor: isActive ? currentColor : "",
                        })}
                        className={({ isActive }) =>
                          isActive ? activeLinkCss : normalLinkCss
                        }
                      >
                        {/* {items_grupo.icon} */}
                        <AiFillCaretRight />
                        <span className="capitalize">{items_grupo.name}</span>
                      </NavLink>
                    ))}
                  </div>
                ))}
                {/* ITEMS */}
                {item.items.map((item) => (
                  <NavLink
                    to={`${item.to}`}
                    key={item.id}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? currentColor : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLinkCss : normalLinkCss
                    }
                  >
                    {/* {item.icon} */}
                    <AiFillCaretRight />
                    <span className="capitalize">{item.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
