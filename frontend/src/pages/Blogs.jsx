import { useEffect, useState } from "react";
import AdminLayout from "../components/AdminLayout";
import axios from "axios";
import { getBlogs } from "../services/api";

import "../styles/Blogs.css";

function Blogs() {

  const [blogs, setBlogs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    metaTitle: "",
    metaDescription: "",

  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await getBlogs();
      setBlogs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "title") {

      setFormData({
        ...formData,
        title: value,
        slug: generateSlug(value)
      });

    } else if (name === "image") {

      setFormData({
        ...formData,
      });

    } else {

      setFormData({
        ...formData,
        [name]: value
      });

    }

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const form = new FormData();

      Object.keys(formData).forEach((key)=>{
        if(formData[key]){
          form.append(key,formData[key]);
        }
      });

      const token = localStorage.getItem("adminToken");

      if (editId) {

        await axios.put(
          `http://localhost:5000/api/blogs/update/${editId}`,
          form,
          { headers:{ Authorization:`Bearer ${token}` } }
        );

        alert("Blog updated");

      } else {

        await axios.post(
          "http://localhost:5000/api/blogs/create",
          form,
          { headers:{ Authorization:`Bearer ${token}` } }
        );

        alert("Blog created");

      }

      setShowForm(false);
      setEditId(null);

      setFormData({
        title:"",
        slug:"",
        content:"",
        metaTitle:"",
        metaDescription:"",
      });

      fetchBlogs();

    } catch (error) {

      console.log(error);
      alert("Operation failed");

    }

  };

  const handleEdit = (blog) => {

    setShowForm(true);
    setEditId(blog._id);

    setFormData({
      title: blog.title,
      slug: blog.slug,
      content: blog.content,
      metaTitle: blog.metaTitle || "",
      metaDescription: blog.metaDescription || "",
    });

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this blog?")) return;

    try {

      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `http://localhost:5000/api/blogs/delete/${id}`,
        { headers:{ Authorization:`Bearer ${token}` } }
      );

      alert("Blog deleted");
      fetchBlogs();

    } catch (error) {

      console.log(error);
      alert("Delete failed");

    }

  };

  return (

    <AdminLayout>

      <div className="blogs-page">

        <div className="blogs-header">

          <h2>Blogs</h2>

          {!showForm && (
            <button
              className="primary-btn"
              onClick={()=>setShowForm(true)}
            >
              Add Blog
            </button>
          )}

        </div>


        {/* BLOG TABLE */}

        {!showForm && (

          <div className="table-card">

            <table className="blogs-table">

              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>

                {blogs.map((blog)=>(
                  <tr key={blog._id}>

                    <td>{blog.title}</td>

                    <td>{blog.slug}</td>

                    <td>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>

                    <td>

                      <button
                        className="edit-btn"
                        onClick={()=>handleEdit(blog)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={()=>handleDelete(blog._id)}
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


        {/* BLOG FORM */}

        {showForm && (

  <div className="modal-overlay">

    <div className="modal-form">

      <div className="modal-header">

        <h3>{editId ? "Edit Blog" : "Create Blog"}</h3>

        <button
          className="close-btn"
          onClick={()=>setShowForm(false)}
        >
          ✕
        </button>

      </div>

      <form
        className="blog-form"
        onSubmit={handleSubmit}
      >

        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={formData.slug}
          onChange={handleChange}
          required
        />

        <textarea
          name="content"
          placeholder="Content"
          value={formData.content}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="metaTitle"
          placeholder="Meta Title"
          value={formData.metaTitle}
          onChange={handleChange}
        />

        <input
          type="text"
          name="metaDescription"
          placeholder="Meta Description"
          value={formData.metaDescription}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="primary-btn"
        >
          {editId ? "Update Blog" : "Create Blog"}
        </button>

      </form>

    </div>

  </div>

)}

      </div>  

    </AdminLayout>

  );

}
export default Blogs;