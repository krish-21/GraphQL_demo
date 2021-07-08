import { useContext } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import AuthContext from "../../store/auth-context";

const Header = () => {
  const history = useHistory();

  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push(`/`);
  };

  return (
    <div>
      <h1>Hacker News</h1>

      <Link to="/">Feed</Link>
      <span>|</span>

      {isLoggedIn && <Link to="/create">Create</Link>}
      <span>|</span>

      {isLoggedIn && <div onClick={handleLogout}>logout</div>}
      <span>|</span>

      {!isLoggedIn && <Link to="/auth">login</Link>}
    </div>
  );
};

export default Header;
