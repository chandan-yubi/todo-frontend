import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { authService } from "../../services/auth/auth.service";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const isAuthenticated = authService.isLoggedIn();
  const navigate = useNavigate();
  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  return (
    <header className="app-header">
      <Link to="/">
        <h1 className="brand">Todo App</h1>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <a href="/my-tasks">My Tasks</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
      <div className="auth-buttons">
        {!isAuthenticated ? (
          <div>
            <Link to="/login">
              <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
              <button className="register-button">Register</button>
            </Link>
          </div>
        ) : (
          <div>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
