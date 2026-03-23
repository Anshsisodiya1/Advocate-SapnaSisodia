import { useState } from "react";
import { sendContact } from "../services/api";
import "../styles/ConsultationForm.css";

export default function ConsultationForm() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    caseType: "",
    message: ""
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await sendContact(formData);

      setSuccess("Your consultation request has been submitted.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        caseType: "",
        message: ""
      });

    } catch (error) {
      console.error(error);
    }
  };

  return (

    <section className="consultation-section">

      <h2>Book a Legal Consultation</h2>

      <p className="consultation-text">
        Speak with Advocate Sapna Sisodia regarding your legal matter.
        Fill out the form and our office will contact you shortly.
      </p>

      <form className="consultation-form" onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
        />

        <select
          name="caseType"
          value={formData.caseType}
          onChange={handleChange}
        >

          <option value="">Select Case Type</option>
          <option value="Civil Law">Civil Law</option>
          <option value="Family Law">Family Law</option>
          <option value="Corporate Law">Corporate Law</option>
          <option value="Property Dispute">Property Dispute</option>
          <option value="Arbitration">Arbitration</option>

        </select>

        <textarea
          name="message"
          placeholder="Describe your legal issue"
          rows="4"
          value={formData.message}
          onChange={handleChange}
        />

        <button type="submit" className="consultation-btn">
          Submit Consultation Request
        </button>

      </form>

      {success && <p className="success-message">{success}</p>}

    </section>
  );
}