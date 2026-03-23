import { Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          <Link to="/">Sapna Sisodia</Link>
        </div>

        {/* HAMBURGER MENU */}
        <div 
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* NAV LINKS */}
        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/">Home</Link>
          <Link to="/blogs">Blog</Link>
          <Link to="/contact">Contact</Link>
        </nav>

      </div>

    </header>
  );
}