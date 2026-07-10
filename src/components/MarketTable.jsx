import React from 'react';
import { marketData } from '../data/marketData';

const MarketTable = () => (
  <section className="section" id="market">
    <div className="section-header">
      <div className="section-label">Market Intelligence</div>
      <div className="section-title">Detailed Price Breakdown by Sector</div>
    </div>
    <div className="table-wrap">
      <table>
        <thead><tr><th>Sector</th><th>Flat (₹/sq ft)</th><th>Plot (₹/sq ft)</th><th>1 BHK Range</th><th>2 BHK Range</th><th>1-Yr Growth</th><th>Category</th></tr></thead>
        <tbody>
          {marketData.map((r, i) => (
            <tr key={i}>
              <td><span className="dot" style={{background:r.color}}></span><strong>{r.name}</strong></td>
              <td>{r.flat}</td><td>{r.plot}</td>
              <td style={{color:'var(--txt3)'}}>{r.bhk1}</td>
              <td style={{color:'var(--txt3)'}}>{r.bhk2}</td>
              <td className="growth-pos">{r.growth}</td>
              <td><span style={{fontSize:'11px', padding:'3px 8px', borderRadius:'8px', background:'var(--bg1)', border:'1px solid var(--border)'}}>{r.cat}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p style={{fontSize:'11px', color:'var(--txt3)', textAlign:'center', marginTop:'16px'}}>Source: NoBroker, 99acres — June 2026. Rates are indicative.</p>
  </section>
);
export default MarketTable;