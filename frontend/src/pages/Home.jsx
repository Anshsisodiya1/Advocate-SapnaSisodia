import { useState } from "react";
import ConsultationForm from "../components/ConsultationForm";
import "../styles/Home.css";

/* SEO */
import { Helmet } from "react-helmet";

/* React Icons */

import { FaBalanceScale, FaGavel, FaUserShield, FaHome, FaBuilding } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { GiJusticeStar } from "react-icons/gi";
import { FaAward } from "react-icons/fa";

export default function Home() {

  const [showForm, setShowForm] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (
    <div className="home">

      {/* ✅ SEO META TAGS */}
      <Helmet>
        <title>Advocate Sapna Sisodia | Best Lawyer in Bhopal | Legal Consultation</title>

        <meta
          name="description"
          content="Advocate Sapna Sisodia is a senior legal associate offering expert services in civil, corporate, family, and real estate law in Bhopal. Book legal consultation today."
        />

        <meta
          name="keywords"
          content="Advocate Sapna Sisodia, lawyer in Bhopal, legal consultation, civil lawyer, corporate lawyer India, family lawyer Bhopal"
        />

        <meta name="author" content="Sapna Sisodia" />
      </Helmet>

      {/* HERO SECTION */}

      <section className="hero">

        <div className="hero-text">

          {/*  MAIN KEYWORD IN H1 */}
          <h1>Advocate Sapna Sisodia – Senior Legal Associate & Lawyer in Bhopal</h1>

          <h3>Corporate & Civil Law Expert</h3>

          <p>
            Advocate Sapna Sisodia is a highly experienced legal professional with more than 8 years of courtroom experience,
            providing professional legal representation across corporate, real estate, revenue, family, and civil law matters in Bhopal.
          </p>

          <button className="primary-btn" onClick={openForm}>
            Book Consultation
          </button>

        </div>

        <div className="hero-image">
          <img src="/sapna.jpg" alt="Advocate Sapna Sisodia Lawyer in Bhopal" />
        </div>

      </section>


      {/* ABOUT SECTION */}

      <section className="about">

        <h2>About Advocate Sapna Sisodia</h2>

        <p>
          Advocate Sapna Sisodia is a seasoned legal professional with extensive
          experience in litigation, legal drafting, and corporate compliance.
          She currently serves as a Senior Legal Associate at Juris Consultus
          Law Firm.
        </p>

        <p>
          She is also an empanelled lawyer for Indian Bank and TGI Insignia
          Hotels & Resorts, representing clients in civil courts, consumer
          forums, and arbitration proceedings.
        </p>

      </section>


      {/* PRACTICE AREAS */}

      <section className="practice">

        <h2>Legal Services Offered by Advocate Sapna Sisodia</h2>

        <div className="practice-grid">

          <div className="practice-card">
            <FaBalanceScale className="practice-icon"/>
            <h3>Civil Litigation</h3>
            <p>Handling complex civil disputes and legal representation.</p>
          </div>

          <div className="practice-card">
            <FaUserShield className="practice-icon"/>
            <h3>Family Law</h3>
            <p>Divorce, custody, and family dispute resolution.</p>
          </div>

          <div className="practice-card">
            <FaBuilding className="practice-icon"/>
            <h3>Corporate Law</h3>
            <p>Corporate compliance and company legal matters.</p>
          </div>

          <div className="practice-card">
            <FaHome className="practice-icon"/>
            <h3>Real Estate Law</h3>
            <p>Property disputes and real estate legal services.</p>
          </div>

          <div className="practice-card">
            <MdAccountBalance className="practice-icon"/>
            <h3>Revenue Matters</h3>
            <p>Land revenue and government legal matters.</p>
          </div>

          <div className="practice-card">
            <FaGavel className="practice-icon"/>
            <h3>Arbitration & Dispute Resolution</h3>
            <p>Alternative dispute resolution and arbitration cases.</p>
          </div>

        </div>

      </section>


      {/* EXPERIENCE */}

      <section className="experience">

        <h2>Professional Experience of Advocate Sapna Sisodia</h2>

        <ul>

          <li>
            Senior Legal Associate – Juris Consultus Law Firm
          </li>

          <li>
            Legal Retainer – Head, The Sage Group India
          </li>

          <li>
            Empanelled Lawyer – Indian Bank
          </li>

          <li>
            Empanelled Lawyer – TGI Insignia Hotels & Resorts
          </li>

          <li>
            Independent Member – ICC Committee, Apollo Sage Hospitals
          </li>

        </ul>

      </section>


      {/* AWARDS */}

      <section className="awards">

        <h2>Awards & Recognition</h2>

        <div className="awards-grid">

          <div className="award-card">
            <FaAward className="award-icon"/>
            <h3>Rani Kamlapati Award</h3>
            <p>2025</p>
          </div>

          <div className="award-card">
            <GiJusticeStar className="award-icon"/>
            <h3>Felicitation for Social Services</h3>
            <p>Laxmipati Group – 2025</p>
          </div>

          <div className="award-card">
            <FaAward className="award-icon"/>
            <h3>Bhopal Ratna Award</h3>
            <p>2021</p>
          </div>

        </div>

      </section>


      {/* OFFICE LOCATION */}

      <section className="location">

        <h2>Office Location – Advocate Sapna Sisodia</h2>

        <div className="map-container">

          <iframe
            title="Office Location of Advocate Sapna Sisodia in Bhopal"
            src="https://maps.google.com/maps?q=HIG%20202%20Vijay%20Stambh%20MP%20Nagar%20Zone%201%20Bhopal%20Madhya%20Pradesh%20India&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
          ></iframe>

        </div>

        <p>
          HIG 202, Vijay Stambh, MP Nagar Zone 1,
          Bhopal, Madhya Pradesh, India
        </p>

      </section>


      {/* CONSULTATION POPUP */}

      {showForm && (

        <div className="popup-overlay">

          <div className="popup">

            <button className="close-btn" onClick={closeForm}>
              ✕
            </button>

            <ConsultationForm />

          </div>

        </div>

      )}

    </div>
  );
}