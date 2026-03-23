import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h2 className="footer-logo">LegalCare</h2>

          <p>
            Professional legal consultation and advisory services. Helping
            clients solve legal matters with trusted experts.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>

          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h3>Contact</h3>

          <ul>
            <li>Email: Sapnasisodia74@gmail.com</li>
            <li>Phone: +91 8720840004</li>
            <li>Location: India</li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h3>Follow Us</h3>

          <div className="social-icons">
            <a
              href="https://facebook.com/ADVOCATE_FACEBOOK_USERNAME"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>

            <a
              href="https://instagram.com/sapnasisodia14"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>

            <a
              href="https://linkedin.com/in/Sapna Sisodia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} LegalCare. All rights reserved.</p>

        <Link to="/admin/login" className="admin-link">
          Admin Login
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
