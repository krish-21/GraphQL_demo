import { useContext, useEffect } from "react";

import AuthContext from "../../store/auth-context";
import client from "../../utils/apolloClient";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    return () => {
      console.log("Clearing STORE!!!!");
      client.clearStore();
    };
  }, []);

  return <div onClick={handleLogout}>Logout</div>;
};

export default Logout;
