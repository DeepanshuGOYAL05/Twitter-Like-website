import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// import { logout } from "../store/actions/auth";
import Logo from "../images/warbler-logo.png";
import { logout } from "../store/actions/auth";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [searchInput, setSearchInput] = useState("");
  const currentUser = useSelector((state) => state.currentUser);
  const logoutHandler = (e) => {
    e.preventDefault();
    const x = logout();
    x(dispatch);
  };

  const onSearchClickHandler = () => {
    history.push(`search?${searchInput}`);
  };

  const searchHandler = (event) => {
    setSearchInput(event.target.value.trim());
  };
  return (
    <nav className="navbar navbar-expand">
      <Link to="/" className="navbar-brand">
        <img src={Logo} alt="Warbler Home" />
      </Link>

      {currentUser.isAuthenticated ? (
        <ul className="nav navbar-nav ml-auto justify-content-center">
          <form className="d-flex ">
            <input
              type="text"
              name="text"
              placeholder="search users..."
              value={searchInput}
              onInput={searchHandler}
              className="bg-white p-2 w-3/4 outline-none"
            />
            <button
              type="submit"
              className="p-2 text-center text-blue-500 w-1/4 bg-white border-l"
              onClick={onSearchClickHandler}
            >
              Search
            </button>
          </form>
          <li>
            <Link to={`/users/${currentUser.user.id}/tweets/new`}>
              New Tweet
            </Link>
          </li>
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        </ul>
      ) : (
        <ul className="nav navbar-nav ml-auto">
          <li>
            <Link to="/signup">Sign up</Link>
          </li>
          <li>
            <Link to="/signin">Log in</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
