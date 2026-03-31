
import axios from "axios";

const API = axios.create({
  baseURL: "https://advocate-sapna-backend.onrender.com/api",
});

// CONTACT (fix after checking route file)
export const sendContact = (data) => API.post("/contacts", data);

// INQUIRY ✅ correct already
export const sendInquiry = (data) => API.post("/inquiries", data);

// BOOKING ❗ fix here
export const createBooking = (data) => API.post("/bookings", data);
// =============================
// BLOGS (PUBLIC)
// =============================

export const getBlogs = () => API.get("/blogs");

export const getBlogBySlug = (slug) => API.get(`/blogs/${slug}`);

// =============================
// TESTIMONIALS (PUBLIC)
// =============================

export const getTestimonials = () => API.get("/testimonials");

// =============================
// TESTIMONIALS (ADMIN)
// =============================

export const getAllTestimonials = (token) =>
  API.get("/testimonials/admin", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const approveTestimonial = (id, token) =>
  API.put(`/testimonials/approve/${id}`, {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// =============================
// WHATSAPP LINK
// =============================

export const getWhatsAppLink = () => API.get("/whatsapp");

// =============================
// ADMIN AUTH
// =============================

export const adminRegister = (data) => API.post("/admin/register", data);

export const checkAdminExists = () => API.get("/admin/auth/check");

export const adminLogin = (data) => API.post("/admin/auth/login", data);

// =============================
// ADMIN DASHBOARD
// =============================

export const getDashboardStats = (token) =>
  API.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

// =============================
// ADMIN BLOG MANAGEMENT
// =============================

export const createBlog = (data, token) =>
  API.post("/admin/blogs", data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateBlog = (id, data, token) =>
  API.put(`/admin/blogs/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteBlog = (id, token) =>
  API.delete(`/admin/blogs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });