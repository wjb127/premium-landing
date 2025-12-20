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
        {/* 나머지 통계 카드... */}
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
            {/* 나머지 테이블 행... */}
          </tbody>
        </table>
      </div>
    </div>
  );
} 