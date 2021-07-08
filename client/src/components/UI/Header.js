import React from "react";
import { useHistory } from "react-router";
import { Link, withRouter } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  return (
    <div>
      <div>Hacker News</div>
      <Link to="/">Feed</Link>
      <div>|</div>
      <Link to="/create">Create</Link>
    </div>
  );
};

export default Header;
