import React from "react";
import { useAuthContext, useStateContext } from "../contexts/ContextProvider";

const UserProfile = () => {
  const { signOut } = useAuthContext();
  const { currentColor, setUserProfileClicked } = useStateContext();

  const handleSignOut = () => {
    signOut();
    setUserProfileClicked(false);
  };

  return (
    <div className="flex justify-center text-white font-semibold rounded-lg" style={{ background: currentColor }} onClick={handleSignOut}>
      <p className="text-sm">Sair</p>
    </div>
  );
};

export default UserProfile;
