import { useContext } from "react";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

import Logout from "../Auth/Logout";

const Header = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div>
      <h1>Hacker News</h1>

      <Link to="/">Feed</Link>
      <span>|</span>

      {isLoggedIn && <Link to="/create">Create</Link>}
      <span>|</span>

      {isLoggedIn && <Logout />}
      <span>|</span>

      {!isLoggedIn && <Link to="/auth">login</Link>}
    </div>
  );
};

export default Header;
