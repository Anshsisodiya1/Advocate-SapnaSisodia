import { useEffect, useState } from "react";
import { adminLogin, adminRegister, checkAdminExists } from "../services/api";
import "../styles/AdminLogin.css";

function AdminLogin() {

  const [adminExists, setAdminExists] = useState(true);
  const [showRegister, setShowRegister] = useState(false);

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  useEffect(() => {
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    const res = await checkAdminExists();
    setAdminExists(res.data.adminExists);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const res = await adminLogin({ email, password });

      localStorage.setItem("adminToken", res.data.token);

      window.location.href = "/admin/dashboard";

    } catch (error) {
      alert("Invalid credentials");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await adminRegister({ name, email, password });

      alert("Admin created successfully. Please login.");

      setShowRegister(false);
      setAdminExists(true);

    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (

    <div className="admin-login-page">

      <div className="admin-login-card">

        <h2>Admin Panel</h2>

        {!showRegister && (

          <form onSubmit={handleLogin} className="admin-form">

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>

          </form>

        )}

        {!adminExists && !showRegister && (

          <button
            className="create-admin-btn"
            onClick={()=>setShowRegister(true)}
          >
            Create Admin
          </button>

        )}

        {showRegister && (

          <div>

            <h3>Create First Admin</h3>

            <form onSubmit={handleRegister} className="admin-form">

              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />

              <button type="submit">
                Register Admin
              </button>

            </form>

          </div>

        )}

      </div>

    </div>

  );
}

export default AdminLogin;