// src/components/Projects.jsx
import React, { useState, useEffect } from 'react';
import { getProperties } from '../services/api';

const Projects = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = filter !== 'all' ? { type: filter } : {};
        const data = await getProperties(params);
        setProperties(data.properties || []);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  if (loading) return <div style={{ textAlign: 'center', padding: '40px' }}>Loading properties...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>Error: {error}</div>;

  return (
    <section className="section" id="projects">
      {/* Same JSX as before, but map over `properties` */}
      <div className="proj-grid">
        {properties.map((p) => (
          <div className="proj-card" key={p._id}>
            {/* render card using p.title, p.builder, etc. */}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;