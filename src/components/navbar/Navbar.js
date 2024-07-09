import "./Navbar.css"; // Import the CSS file for styling the Navbar component
import { Link } from "react-router-dom"; // Import the Link component from react-router-dom for navigation
import { useContext } from "react"; // Import the useContext hook from React for accessing context
import { AuthContext } from "../../context/AuthContext"; // Import the AuthContext to manage authentication-related state

const Navbar = () => { // Define the Navbar component
  const { user, dispatch } = useContext(AuthContext); // Get the current user and dispatch function from the AuthContext

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Dispatch the LOGOUT action to update the state
  };

  return (
    <div className="navbar"> {/* Parent container with class 'navbar' */}
      <div className="navContainer"> {/* Container for navbar content */}
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}> {/* Link to the homepage */}
          <span className="logo">THELA-BOOKINGS</span> {/* Brand logo with class 'logo' */}
        </Link>
        {user ? ( // Check if user is logged in
          <div className="navItems"> {/* Container for navigation items */}
            <span>{user.username}</span> {/* Display the username */}
            <button className="navButton" onClick={handleLogout}>Logout</button> {/* Logout button */}
          </div>
        ) : (
          <div className="navItems"> {/* Container for navigation items */}
          <Link to="/register" style={{ color: "inherit", textDecoration: "none" }}>
            <button className="navButton">Register</button></Link> {/* Register button */}
            <Link to="/login" style={{ color: "inherit", textDecoration: "none" }}> {/* Link to the login page */}
              <button className="navButton">Login</button> {/* Login button */}
            </Link>
            <a href="https://thela-bookings-admin.onrender.com" style={{ color: "inherit", textDecoration: "none" }}> {/* Link to the external admin URL */}
            <button className="navButton">admin</button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar; // Export the Navbar component as the default export
