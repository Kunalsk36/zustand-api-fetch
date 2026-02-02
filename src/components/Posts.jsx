import { useEffect, useRef, useState } from "react";
import usePostStore from "../state/usePostStore";

function Posts() {
  const posts = usePostStore((state) => state.posts);
  const loading = usePostStore((state) => state.loading);
  const error = usePostStore((state) => state.error);
  const fetchPosts = usePostStore((state) => state.fetchPosts);
  const observer = useRef();
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts.length > 0) {
      const options = {
        threshold: 0.1,
      };

      const handleReveal = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal");
          }
        });
      };

      observer.current = new IntersectionObserver(handleReveal, options);

      const elements = document.querySelectorAll(".book-card");
      elements.forEach((el) => observer.current.observe(el));
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [posts]);

  if (loading) {
    return (
      <div className="wand-loader">
        <div className="wand"></div>
        <p style={{ fontFamily: "Eagle Lake", marginTop: "20px" }}>
          Summoning the books...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-message">
        <h2>Expecto Patronum!</h2>
        <p>Something went wrong: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="book-grid">
        {posts.map((post) => (
          <div
            key={post.number}
            className="book-card"
            onClick={() => setSelectedBook(post)}
          >
            <div className="book-cover-wrapper">
              <img src={post.cover} alt={post.title} className="book-cover" />
            </div>
            <div className="book-info">
              <span className="book-number">Volume {post.number}</span>
              <h2 className="book-title">{post.title}</h2>
              <div className="book-description">{post.description}</div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="modal-overlay" onClick={() => setSelectedBook(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close"
              onClick={() => setSelectedBook(null)}
            >
              &times;
            </button>
            <div className="modal-image-wrapper">
              <img
                src={selectedBook.cover}
                alt={selectedBook.title}
                className="modal-image"
              />
            </div>
            <div className="modal-details">
              <span className="book-number">Volume {selectedBook.number}</span>
              <h2>{selectedBook.title}</h2>
              <p>{selectedBook.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Posts;
