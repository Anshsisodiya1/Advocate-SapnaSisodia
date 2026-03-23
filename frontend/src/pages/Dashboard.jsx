import { useEffect, useState } from "react";
import AdminSidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";
import { getDashboardStats } from "../services/api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import {
  FaBlog,
  FaEnvelope,
  FaCalendarCheck,
  FaUser
} from "react-icons/fa";

import "../styles/Dashboard.css";

function Dashboard() {

  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {

    try {

      const token = localStorage.getItem("adminToken");
      const res = await getDashboardStats(token);

      setStats(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  const chartData = [
    { name: "Blogs", value: stats.totalBlogs || 0 },
    { name: "Bookings", value: stats.totalBookings || 0 },
    { name: "Inquiries", value: stats.totalInquiries || 0 },
    { name: "Contacts", value: stats.totalContacts || 0 },
  ];

  return (

    <div className="dashboard-layout">

      <AdminSidebar />

      <div className="dashboard-main">

        <AdminHeader />

        <div className="dashboard-content">

          {/* STATS */}

          <div className="stats-grid">

            <StatCard
              title="Blogs"
              value={stats.totalBlogs}
              icon={<FaBlog />}
              color="blue"
            />

            <StatCard
              title="Bookings"
              value={stats.totalBookings}
              icon={<FaCalendarCheck />}
              color="green"
            />

            <StatCard
              title="Inquiries"
              value={stats.totalInquiries}
              icon={<FaEnvelope />}
              color="purple"
            />

            <StatCard
              title="Contacts"
              value={stats.totalContacts}
              icon={<FaUser />}
              color="orange"
            />

          </div>


          {/* CHART */}

          <div className="dashboard-box">

            <h2 className="box-title">Platform Overview</h2>

            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[5,5,0,0]} />
              </BarChart>
            </ResponsiveContainer>

          </div>


          {/* SUMMARY */}

          <div className="dashboard-box">

            <h2 className="box-title">System Summary</h2>

            <table className="dashboard-table">

              <thead>
                <tr>
                  <th>Module</th>
                  <th>Total Records</th>
                </tr>
              </thead>

              <tbody>

                <Row name="Blogs" value={stats.totalBlogs} />
                <Row name="Bookings" value={stats.totalBookings} />
                <Row name="Inquiries" value={stats.totalInquiries} />
                <Row name="Contacts" value={stats.totalContacts} />

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;


/* STAT CARD */

const StatCard = ({ title, value, icon, color }) => (

  <div className={`stat-card ${color}`}>

    <div className="stat-icon">
      {icon}
    </div>

    <div>

      <h4>{title}</h4>

      <p>{value || 0}</p>

    </div>

  </div>

);


/* TABLE ROW */

const Row = ({ name, value }) => (

  <tr>
    <td>{name}</td>
    <td>{value || 0}</td>
  </tr>

);