import AdminSidebar from "../components/Sidebar";
import AdminHeader from "../components/AdminHeader";
import "../styles/AdminLayout.css";

function AdminLayout({ children }) {

  return (

    <div className="admin-layout">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Area */}
      <div className="admin-main">

        <AdminHeader />

        <div className="admin-content">
          {children}
        </div>

      </div>

    </div>

  );

}

export default AdminLayout;