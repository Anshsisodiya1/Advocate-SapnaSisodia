  import { useEffect, useState } from "react";
  import axios from "axios";
  import { Link } from "react-router-dom";
  import "../styles/BlogList.css";

  function BlogList(){

  const [blogs,setBlogs] = useState([]);



  useEffect(() => {
   axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/blogs`)
      .then(res => {
        setBlogs(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return(

  <div className="blog-page">

  <h2>Our Blogs</h2>

  <div className="blog-container">

  {blogs.map(blog=>(
  <div key={blog._id} className="blog-card">


  <h3>{blog.title}</h3>

  <p>{blog.metaDescription}</p>

  <Link to={`/blog/${blog.slug}`}>
  Read More
  </Link>

  </div>
  ))}

  </div>

  </div>

  );



  }

  export default BlogList;