import { useState } from "react";
import "../styles/Contact.css";

/* SEO */
import { Helmet } from "react-helmet-async";

/* React Icons */
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";

/* ✅ Import API function */
import { sendInquiry } from "../services/api";

export default function Contact() {

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    subject:"",
    message:""
  });

  const [loading,setLoading] = useState(false);
  const [success,setSuccess] = useState("");

  const handleChange = (e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try{
      setLoading(true);

      // ✅ FIXED: using API file (no localhost)
      await sendInquiry(formData);

      setSuccess("Your inquiry has been submitted successfully.");

      setFormData({
        name:"",
        email:"",
        phone:"",
        subject:"",
        message:""
      });

    }catch(error){
      console.error(error);
      alert(error.response?.data?.message || "Server error");
    }

    setLoading(false);
  };

  return (

    <div className="contact-page">

      {/* SEO META TAGS */}
      <Helmet>
        <title>Contact Advocate Sapna Sisodiya | Lawyer in Bhopal</title>

        <meta
          name="description"
          content="Contact Advocate Sapna Sisodiya for legal consultation in Bhopal. Get expert advice in civil, corporate, family, and property law matters."
        />

        <meta
          name="keywords"
          content="Contact Advocate Sapna Sisodiya, lawyer in Bhopal contact, legal consultation Bhopal, advocate phone number"
        />

        <meta name="author" content="Sapna Sisodiya" />
      </Helmet>

      <h1 className="contact-title">
        Contact Advocate Sapna Sisodiya
      </h1>

      <div className="contact-wrapper">

        {/* FORM */}
        <form onSubmit={handleSubmit} className="contact-form">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Describe your legal issue..."
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Inquiry"}
          </button>

          {success && <p className="success">{success}</p>}

        </form>

        {/* CONTACT INFO */}
        <div className="contact-info">

          <h2>Office Information – Advocate Sapna Sisodia</h2>

          <div className="info-item">
            <FaMapMarkerAlt className="info-icon"/>
            <div>
              <strong>Address</strong>
              <p>Bhopal (M.P), India</p>
            </div>
          </div>

          <div className="info-item">
            <FaPhoneAlt className="info-icon"/>
            <div>
              <strong>Phone</strong>
              <p>+91 8720840004</p>
            </div>
          </div>

          <div className="info-item">
            <FaEnvelope className="info-icon"/>
            <div>
              <strong>Email</strong>
              <p>Sapnasisodia74@gmail.com</p>
            </div>
          </div>

          <div className="info-item">
            <MdAccessTime className="info-icon"/>
            <div>
              <strong>Office Hours</strong>
              <p>Mon – Sat : 11:00 AM – 7:00 PM</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}