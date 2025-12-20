'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [dateRange, setDateRange] = useState('7days');
  
  return (
    <div className="dashboard-container">
      <Link href="/" className="back-link">
        <i className="fas fa-arrow-left"></i> 랜딩 페이지로 돌아가기
      </Link>
      
      <div className="dashboard-header">
        <h1 className="dashboard-title">LUXE 성과 대시보드</h1>
        <div className="date-filter">
          <span>기간:</span>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="7days">최근 7일</option>
            <option value="30days">최근 30일</option>
            <option value="90days">최근 90일</option>
          </select>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">총 방문자 수</div>
          <div className="stat-value">386</div>
          <div className="stat-change positive">+12.5%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">고유 방문자 수</div>
          <div className="stat-value">214</div>
          <div className="stat-change positive">+8.3%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">상호작용 수</div>
          <div className="stat-value">160</div>
          <div className="stat-change negative">-2.1%</div>
        </div>
        <div className="stat-card">
          <div className="stat-title">전환율</div>
          <div className="stat-value">4.67%</div>
          <div className="stat-change positive">+0.8%</div>
        </div>
      </div>
      
      <div className="table-section">
        <div className="chart-header">
          <h2 className="chart-title">최근 문의 내역</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>이름</th>
              <th>이메일</th>
              <th>관심 분야</th>
              <th>제출 시간</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>김**동</td>
              <td>k***g@n***r.com</td>
              <td>제품 문의</td>
              <td>2023-05-07 14:23</td>
            </tr>
            <tr>
              <td>이**희</td>
              <td>l***e@g***l.com</td>
              <td>협업 제안</td>
              <td>2023-05-06 09:12</td>
            </tr>
            <tr>
              <td>박**수</td>
              <td>p***s@d***n.com</td>
              <td>기타</td>
              <td>2023-05-05 16:45</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 