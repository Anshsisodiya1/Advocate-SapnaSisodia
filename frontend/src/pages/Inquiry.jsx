import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Inquiry.css";

const Inquiry = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/contacts/all");
      if (data.success) setContacts(data.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;

    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/contacts/delete/${id}`
      );

      if (data.success) {
        setContacts(contacts.filter((contact) => contact._id !== id));
      }
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      alert("Failed to delete inquiry");
    }
  };

  if (loading) return <div className="loading">Loading inquiries...</div>;

  return (
    <div className="inquiry-container">
      <h2 className="inquiry-title">Client Inquiries</h2>

      {contacts.length === 0 ? (
        <p className="no-data">No inquiries yet.</p>
      ) : (
        <div className="table-wrapper">
          <table className="inquiry-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Case Type</th>
                <th>Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.caseType || "-"}</td>
                  <td className="message">{contact.message || "-"}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(contact._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Inquiry;