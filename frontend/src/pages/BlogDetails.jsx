import { useEffect,useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/BlogDetail.css";

/* SEO */
import { Helmet } from "react-helmet-async";

function BlogDetail(){

const {slug} = useParams();
const [blog,setBlog] = useState(null);

useEffect(() => {
  axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/blogs/${slug}`)
    .then(res => {
      setBlog(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}, [slug]);

if(!blog) return <p className="loading">Loading...</p>;

return(

<div className="blog-detail-page">

{/* DYNAMIC SEO */}
<Helmet>
  <title>
    {blog.metaTitle || `${blog.title} | Advocate Sapna Sisodiya`}
  </title>

  <meta
    name="description"
    content={
      blog.metaDescription ||
      `Read about ${blog.title}. Legal insights by Advocate Sapna Sisodiya, expert lawyer in Bhopal.`
    }
  />

  {/* KEYWORDS */}
  <meta
    name="keywords"
    content={`Advocate Sapna Sisodiya, ${blog.title}, lawyer in Bhopal, legal advice, law blog`}
  />

  {/* OPEN GRAPH (WhatsApp / Facebook share) */}
  <meta property="og:title" content={blog.title} />
  <meta
    property="og:description"
    content={blog.metaDescription || blog.content.slice(0,150)}
  />
  <meta property="og:type" content="article" />
</Helmet>

<div className="blog-container">

{/* H1 */}
<h1 className="blog-title">
  {blog.title}
</h1>

<div className="blog-content">

<p>
  {blog.content}
</p>

</div>

</div>

</div>

);

}

export default BlogDetail;