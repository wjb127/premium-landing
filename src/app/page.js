'use client';

import './globals.css';

export default function Home() {
  return (
    <>
      <div className="loader">
        <div className="loader-content">
          <div className="loader-logo">LUXE</div>
          <div className="loader-bar"></div>
        </div>
      </div>

      <header>
        <div className="header-content">
          <div className="logo">LUXE</div>
          <nav>
            <ul>
              <li><a href="#story">스토리</a></li>
              <li><a href="#product">제품</a></li>
              <li><a href="#experience">경험</a></li>
              <li><a href="#contact">문의</a></li>
            </ul>
          </nav>
          <div className="header-cta">
            <a href="#contact" className="btn-primary">지금 경험하기</a>
          </div>
        </div>
      </header>

      <main>
        {/* 여기에 메인 콘텐츠 */}
        <section id="hero" className="hero">
          <div className="hero-content">
            <h1 className="reveal-text">럭셔리의 새로운 기준</h1>
            <p className="reveal-text">평범함을 넘어서는 특별한 경험을 선사합니다.</p>
            <div className="hero-cta">
              <a href="#product" className="btn-primary">제품 살펴보기</a>
              <a href="#experience" className="btn-secondary">경험 알아보기</a>
            </div>
          </div>
          <div className="hero-image">
            {/* 이미지 */}
          </div>
        </section>
        
        {/* 다른 섹션들... */}
      </main>

      <footer>
        {/* 푸터 콘텐츠 */}
      </footer>
    </>
  );
} 