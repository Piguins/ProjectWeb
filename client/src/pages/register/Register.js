import axios from "axios";
import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(
        "http://localhost:8080/api/Auth/register",
        credentials
      );
      const { email, firstName, lastName, id, token } = res.data;

      // Update the context with the user data and token
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { id, email, firstName, lastName },
      });

      // Store the token in local storage or a secure storage mechanism
      localStorage.setItem("authToken", token);
      navigate("/");
    } catch (err) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: err.message || "Registration failed",
      });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="First Name"
          id="firstName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="text"
          placeholder="Last Name"
          id="lastName"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <div className="registerButtons">
          <button disabled={loading} onClick={handleClick} className="lButton">
            Register
          </button>
          <div onClick={() => navigate("/login")} className="authNavigate">
            Already has an account?
          </div>
        </div>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
