// src/components/PriceChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const PriceChart = ({ data, label = 'Price (₹/sq ft)' }) => {
  if (!data || data.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--txt3)' }}>No price data available</p>;
  }

  const years = data.map(item => item.year);
  const prices = data.map(item => item.price);

  const startPrice = prices[0];
  const currentPrice = prices[prices.length - 1];
  const appreciation = ((currentPrice - startPrice) / startPrice * 100).toFixed(2);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: label,
        data: prices,
        borderColor: '#059669',                // GREEN line
        backgroundColor: (context) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(5, 150, 105, 0.25)');   // green gradient
          gradient.addColorStop(1, 'rgba(5, 150, 105, 0.0)');
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#059669',       // green points
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0,0,0,0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            return `₹${context.raw.toLocaleString('en-IN')}/sq ft`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0,0,0,0.05)',
          drawBorder: false,
        },
        ticks: {
          callback: (value) => {
            if (value >= 1000) {
              return '₹' + (value / 1000).toFixed(0) + 'k';
            }
            return '₹' + value.toLocaleString('en-IN');
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index',
    },
  };

  return (
    <div style={{ 
      background: '#fff', 
      borderRadius: '16px', 
      padding: '24px 20px 20px',
      border: '1px solid var(--border)',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
    }}>
      {/* Summary Stats */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <h3 style={{ 
          fontFamily: "'Playfair Display', serif", 
          fontSize: '18px', 
          margin: 0 
        }}>
          Price Appreciation
        </h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '14px' }}>
          <div>
            <span style={{ color: 'var(--txt3)' }}>Start</span>
            <br />
            <strong style={{ color: '#059669' }}>₹{startPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--txt3)' }}>Current</span>
            <br />
            <strong style={{ color: '#059669' }}>₹{currentPrice.toLocaleString('en-IN')}</strong>
          </div>
          <div>
            <span style={{ color: 'var(--txt3)' }}>Growth</span>
            <br />
            <strong style={{ color: '#059669' }}>{appreciation}%</strong>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: '280px' }}>
        <Line data={chartData} options={options} />
      </div>

      {/* Year labels */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        marginTop: '12px',
        fontSize: '11px',
        color: 'var(--txt3)',
        padding: '0 8px'
      }}>
        {years.map((year, idx) => (
          <span key={idx}>{year}</span>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;