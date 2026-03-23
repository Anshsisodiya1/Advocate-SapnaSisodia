import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import { FaBlog, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard, MdMessage } from "react-icons/md";

import "../styles/Sidebar.css";

export default function Sidebar(){

const navigate = useNavigate();
const location = useLocation();

const [collapsed,setCollapsed] = useState(true);

const logout = () => {
localStorage.removeItem("adminToken");
navigate("/admin/login");
};

const menuItems = [
{ name:"Dashboard", path:"/admin/dashboard", icon:<MdDashboard size={20}/> },
{ name:"Blogs", path:"/admin/blogs", icon:<FaBlog size={20}/> },
{ name:"Inquiries", path:"/admin/inquiries", icon:<MdMessage size={20}/> },
];

return(

<div
className={`sidebar ${collapsed ? "collapsed" : ""}`}
onMouseEnter={()=>setCollapsed(false)}
onMouseLeave={()=>setCollapsed(true)}
>

{/* Logo */}

<div className="sidebar-logo">
{!collapsed && <h2>Admin Panel</h2>}
</div>

{/* Menu */}

<div className="sidebar-menu">

{menuItems.map((item)=>{

const active = location.pathname === item.path;

return(

<Link
key={item.name}
to={item.path}
title={collapsed ? item.name : ""}
className={`sidebar-link ${active ? "active" : ""}`}
>

{item.icon}

{!collapsed && <span>{item.name}</span>}

</Link>

);

})}

{/* Logout */}

<button
onClick={logout}
className="sidebar-logout"
>

<FaSignOutAlt/>

{!collapsed && "Logout"}

</button>

</div>

</div>

);
}