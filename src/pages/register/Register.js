import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
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
    dispatch({ type: "REGISTER_START" });
    try {
      const res = await axios.post("https://thela-bookings-backend.onrender.com/api/auth/register", credentials);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <h1>Sign up</h1>
        <input
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="phone"
          placeholder="Phone"
          id="phone"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="city"
          placeholder="City"
          id="city"
          onChange={handleChange}
          className="rInput"
        />
        <input
          type="country"
          placeholder="Country"
          id="country"
          onChange={handleChange}
          className="rInput"
        />
        <button disabled={loading} onClick={handleClick} className="rButton">
          Register
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Register;
