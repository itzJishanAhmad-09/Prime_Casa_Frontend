// src/pages/BlogDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { news } from '../data/news';

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = news.find(item => item.slug === slug);

  if (!blog) {
    return (
      <div style={{ padding: '60px 2rem', textAlign: 'center' }}>
        <h2>Blog post not found</h2>
        <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none' }}>
          ← Back to Home
        </Link>
      </div>
    );
  }

  const currentIndex = news.findIndex(item => item.slug === slug);
  const prevBlog = currentIndex > 0 ? news[currentIndex - 1] : null;
  const nextBlog = currentIndex < news.length - 1 ? news[currentIndex + 1] : null;

  return (
    <div style={{ padding: '60px 2rem', maxWidth: '900px', margin: '0 auto' }}>
      <Link to="/" style={{ color: 'var(--red)', textDecoration: 'none', display: 'inline-block', marginBottom: '30px' }}>
        ← Back to Home
      </Link>

      <div style={{ 
        background: 'var(--bg)', 
        borderRadius: '20px', 
        padding: '40px',
        border: '1px solid var(--border)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>{blog.emoji}</div>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <span style={{ 
            background: 'var(--red)', 
            color: '#fff', 
            padding: '4px 12px', 
            borderRadius: '20px',
            fontSize: '12px',
            fontWeight: '600'
          }}>
            {blog.tag}
          </span>
          <span style={{ color: 'var(--txt3)', fontSize: '14px' }}>
            {blog.date}
          </span>
        </div>

        <h1 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '36px', 
          marginBottom: '20px',
          lineHeight: '1.3'
        }}>
          {blog.title}
        </h1>

        <div style={{ 
          fontSize: '18px', 
          lineHeight: '1.8',
          color: 'var(--txt2)'
        }}>
          {blog.fullContent || blog.excerpt}
        </div>

        <div style={{ 
          marginTop: '30px', 
          paddingTop: '20px', 
          borderTop: '1px solid var(--border)'
        }}>
          <p style={{ color: 'var(--txt3)', fontSize: '14px' }}>
            <strong>Author:</strong> {blog.author || 'Prime Casa Team'}
          </p>
          <p style={{ color: 'var(--txt3)', fontSize: '14px' }}>
            <strong>Published:</strong> {blog.date}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginTop: '24px' }}>
          <Link to="/#insights">
            <button className="btn-red" style={{ padding: '14px 32px' }}>
              <i className="ti ti-arrow-left"></i> All Insights
            </button>
          </Link>
          <a 
            href="https://wa.me/918130504006" 
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px',
              background: '#25D366', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '9px', 
              padding: '14px 28px', 
              fontSize: '14px', 
              fontWeight: '600', 
              textDecoration: 'none' 
            }}
          >
            <i className="ti ti-brand-whatsapp"></i> Share on WhatsApp
          </a>
        </div>
      </div>

      {/* Previous / Next navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '30px' }}>
        {prevBlog && (
          <Link 
            to={`/blog/${prevBlog.slug}`}
            style={{ color: 'var(--red)', textDecoration: 'none' }}
          >
            ← {prevBlog.title.length > 40 ? prevBlog.title.substring(0, 40) + '...' : prevBlog.title}
          </Link>
        )}
        {nextBlog && (
          <Link 
            to={`/blog/${nextBlog.slug}`}
            style={{ color: 'var(--red)', textDecoration: 'none', marginLeft: 'auto' }}
          >
            {nextBlog.title.length > 40 ? nextBlog.title.substring(0, 40) + '...' : nextBlog.title} →
          </Link>
        )}
      </div>
    </div>
  );
};

export default BlogDetail;