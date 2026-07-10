// src/components/Sectors.jsx
import React, { useState, useEffect } from 'react';
import { getSectors } from '../services/api';

const Sectors = () => {
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSectors();
        setSectors(data.sectors || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Loading sectors...</div>;

  return (
    <section className="section section-alt" id="sectors">
      {/* Render sectors from state */}
    </section>
  );
};

export default Sectors;