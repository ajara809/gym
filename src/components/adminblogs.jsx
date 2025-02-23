import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from "firebase/firestore";
import "../styles/adminblogs.css";

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: "", content: "", keyPoints: "" });

  // Fetch blogs from Firestore
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogsCollection = collection(db, "blogs");
      const blogSnapshot = await getDocs(blogsCollection);
      const blogList = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogList);
    };

    fetchBlogs();
  }, []);

  // Add a new blog
  const addBlog = async () => {
    if (!newBlog.title || !newBlog.content) {
      alert("Please fill in all fields.");
      return;
    }
    
    const keyPointsArray = newBlog.keyPoints.split(",").map(point => point.trim());
    const blogRef = await addDoc(collection(db, "blogs"), { ...newBlog, keyPoints: keyPointsArray });
    setBlogs([...blogs, { id: blogRef.id, ...newBlog, keyPoints: keyPointsArray }]);
    setNewBlog({ title: "", content: "", keyPoints: "" });
  };

  // Update a blog
  const updateBlog = async (id, title, content, keyPoints) => {
    const newTitle = prompt("Update title:", title);
    const newContent = prompt("Update content:", content);
    const newKeyPoints = prompt("Update key points (comma-separated):", keyPoints.join(", "));

    if (newTitle && newContent && newKeyPoints) {
      const updatedData = {
        title: newTitle,
        content: newContent,
        keyPoints: newKeyPoints.split(",").map(point => point.trim()),
      };
      await updateDoc(doc(db, "blogs", id), updatedData);
      setBlogs(blogs.map(blog => (blog.id === id ? { id, ...updatedData } : blog)));
    }
  };

  // Delete a blog
  const deleteBlog = async (id) => {
    await deleteDoc(doc(db, "blogs", id));
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  return (
    <div className="admin-blogs-container">
      <h2 className="admin-blogs-title">Admin - Manage Blogs</h2>

      <div className="add-blog-form">
        <input
          type="text"
          placeholder="Blog Title"
          value={newBlog.title}
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
        />
        <textarea
          placeholder="Blog Content"
          value={newBlog.content}
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Key Points (comma-separated)"
          value={newBlog.keyPoints}
          onChange={(e) => setNewBlog({ ...newBlog, keyPoints: e.target.value })}
        />
        <button onClick={addBlog} className="add-blog-button">Add Blog</button>
      </div>
      <button onClick={() => window.history.back()}>Go Back</button>

      <table className="admin-blogs-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Content</th>
            <th>Key Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.content}</td>
              <td>
                <ul>
                  {blog.keyPoints.map((point, index) => (
                    <li key={index}>{point}</li>
                  ))}
                </ul>
              </td>
              <td>
                <button onClick={() => updateBlog(blog.id, blog.title, blog.content, blog.keyPoints)} className="edit-button">Edit</button>
                <button onClick={() => deleteBlog(blog.id)} className="delete-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBlogs;
