'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 간단한 비밀번호 확인 (실제 프로덕션에서는 더 안전한 방법 사용)
    if (password === process.env.NEXT_PUBLIC_DASHBOARD_PASSWORD) {
      // 로그인 성공 시 세션 스토리지에 인증 상태 저장
      sessionStorage.setItem('dashboard_authenticated', 'true');
      router.push('/dashboard');
    } else {
      setError('비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>LUXE 대시보드</h1>
        <p>대시보드에 접근하려면 비밀번호를 입력하세요.</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-primary">로그인</button>
        </form>
        
        <Link href="/" className="back-link">
          <i className="fas fa-arrow-left"></i> 랜딩 페이지로 돌아가기
        </Link>
      </div>
    </div>
  );
} 