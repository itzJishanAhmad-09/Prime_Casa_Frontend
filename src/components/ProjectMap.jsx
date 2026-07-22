// src/components/ProjectMap.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix default marker icons for v4
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const ProjectMap = ({ coordinates, title, location }) => {
  if (!coordinates || !coordinates.lat || !coordinates.lng) {
    return <p style={{ color: 'var(--txt3)' }}>Location data not available.</p>;
  }

  const position = [coordinates.lat, coordinates.lng];

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: '300px', width: '100%', borderRadius: '12px', marginBottom: '16px' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <strong>{title}</strong>
          <br />
          {location}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default ProjectMap;