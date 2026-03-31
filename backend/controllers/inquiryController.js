const Inquiry = require("../models/Inquiry");
const transporter = require("../config/email"); // make sure this is properly configured

exports.submitInquiry = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Simple validation
    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    // Save inquiry to database
    const inquiry = new Inquiry({ name, email, phone, subject, message });
    const savedInquiry = await inquiry.save();

    // Try sending email to admin
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: "New Website Inquiry",
        html: `
          <h2>New Client Inquiry</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong> ${message}</p>
        `
      });
    } catch (emailError) {
      console.error("Admin email failed:", emailError.message);
    }

    // Try sending auto-reply to user
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Thank you for contacting us",
        html: `
          <h3>Thank You for Contacting Us</h3>
          <p>Dear ${name},</p>
          <p>Thank you for reaching out to our legal team.</p>
          <p>We have received your inquiry and our team will contact you shortly.</p>
          <p>Best Regards,<br>Advocate Sapna Sisodia Legal Team</p>
        `
      });
    } catch (autoReplyError) {
      console.error("User auto-reply email failed:", autoReplyError.message);
    }

    res.status(201).json({
      message: "Inquiry submitted successfully",
      inquiry: savedInquiry
    });

  } catch (error) {
    console.error("submitInquiry ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};