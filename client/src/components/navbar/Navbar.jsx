import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">OUR HOTEL & RESORTS</span>
        </Link>
        {user ? (
          <div>
            {user.email}
            <button onClick={handleSignOut} className="navButton">
              Sign out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button onClick={() => navigate("/register")} className="navButton">
              Register
            </button>
            <button onClick={() => navigate("/login")} className="navButton">
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
