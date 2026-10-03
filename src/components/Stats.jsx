// src/components/Stats.jsx
import React from 'react';

const METRICS = [
  { value: '100%', label: 'RERA-verified projects',  accent: false },
  { value: '0%',   label: 'Brokerage charged',        accent: true  },
  { value: '12%',  label: 'Average annual return',    accent: false },
  { value: '98%',  label: 'On-time delivery rate',    accent: false },
];

const Stats = () => (
  <section className="metrics-bar" aria-label="Key metrics">
    <div className="metrics-bar-inner">
      {METRICS.map((m) => (
        <div className="metric" key={m.label}>
          <span className={`metric-value${m.accent ? ' is-accent' : ''}`}>
            {m.value}
          </span>
          <span className="metric-label">{m.label}</span>
        </div>
      ))}
    </div>
  </section>
);

export default Stats;