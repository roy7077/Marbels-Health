// NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import '../style/navbar.css';

const NavBar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">LOGO</Link>
      <div className="navbar-links">
        <Link to="/createuser">Create User</Link>
        <Link to="/userlist">Show All Users</Link>
      </div>
    </nav>
  );
};

export default NavBar;
