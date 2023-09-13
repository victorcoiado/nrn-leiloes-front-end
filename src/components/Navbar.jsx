import React, { useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { UserProfile } from ".";
import { useAuthContext, useStateContext } from "../contexts/ContextProvider";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <button
    type="button"
    onClick={customFunc}
    style={{ color }}
    className="relative text-xl rounded-full p-3"
  >
    <span
      style={{ background: dotColor }}
      className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
    />
    {icon}
  </button>
);

const Navbar = () => {
  const {
    currentColor,
    activeMenu,
    setActiveMenu,
    userProfileClicked,
    setUserProfileClicked,
    screenSize,
    setScreenSize,
  } = useStateContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };

    // ESCUTA TODAS AS OPCOES DE TAMANHO DA TELA, SE FOR DISPARADO, CHAMA A FUNCAO HANDLESIZE
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenSize <= 900) setActiveMenu(false);
    else setActiveMenu(true);
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Menu"
        customFunc={handleActiveMenu}
        color={currentColor}
        icon={<AiOutlineMenu />}
      ></NavButton>

      {user && (
        <div>
          <div
            className="flex items-center gap-2 cursor-pointer p-1 rounded-lg"
            onClick={() => {
              setUserProfileClicked(!userProfileClicked);
            }}
          >
            <p>
              <span className="text-gray-400 text-14">Olá, </span>{" "}
              <span className="text-gray-400 dark:text-white font-bold ml-1 text-14">
                {user.username}
              </span>
            </p>
            {userProfileClicked ? (
              <MdKeyboardArrowUp className="text-gray-400 text-14"></MdKeyboardArrowUp>
            ) : (
              <MdKeyboardArrowDown className="text-gray-400 text-14"></MdKeyboardArrowDown>
            )}
          </div>

          {userProfileClicked && <UserProfile />}
        </div>
      )}
    </div>
  );
};

export default Navbar;
