'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import './globals.css';

export default function Home() {
  useEffect(() => {
    // GSAP 초기화
    gsap.registerPlugin(ScrollTrigger);
    
    // 로더 애니메이션
    setTimeout(() => {
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // 히어로 섹션 애니메이션
        const heroTexts = document.querySelectorAll('.hero .reveal-text');
        heroTexts.forEach(text => {
          text.classList.add('active');
        });
      }
    }, 2000);
    
    // 스크롤 이벤트에 따른 헤더 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    });
    
    // 스크롤 애니메이션 설정
    setupScrollAnimations();
    
    // 테스티모니얼 슬라이더 설정
    setupTestimonialSlider();
    
    // 스무스 스크롤 구현
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // 제품 상세 뷰 모달
    document.querySelectorAll('.btn-tertiary').forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('제품 상세 정보는 준비 중입니다.');
      });
    });
    
    // 폼 제출 이벤트
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
          name: this.querySelector('#name').value,
          email: this.querySelector('#email').value,
          phone: this.querySelector('#phone').value,
          interest: this.querySelector('#interest').value,
          message: this.querySelector('#message').value
        };
        
        console.log('폼 데이터:', formData);
        alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.');
        this.reset();
      });
    }
  }, []);

  // 스크롤 애니메이션 설정 함수
  function setupScrollAnimations() {
    // 텍스트 애니메이션
    const revealTexts = document.querySelectorAll('.reveal-text:not(.hero .reveal-text)');
    revealTexts.forEach(text => {
      ScrollTrigger.create({
        trigger: text,
        start: 'top 80%',
        onEnter: () => text.classList.add('active'),
        once: true
      });
    });
    
    // 라인 애니메이션
    const revealLines = document.querySelectorAll('.reveal-line');
    revealLines.forEach(line => {
      ScrollTrigger.create({
        trigger: line,
        start: 'top 80%',
        onEnter: () => line.classList.add('active'),
        once: true
      });
    });
    
    // 이미지 애니메이션
    const revealImages = document.querySelectorAll('.reveal-image');
    revealImages.forEach(image => {
      ScrollTrigger.create({
        trigger: image,
        start: 'top 80%',
        onEnter: () => image.classList.add('active'),
        once: true
      });
    });
    
    // 특징 아이템 애니메이션
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
      ScrollTrigger.create({
        trigger: feature,
        start: 'top 80%',
        onEnter: () => feature.classList.add('active'),
        once: true
      });
    });
    
    // 패럴랙스 효과
    gsap.to('.parallax-image', {
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      scale: 1
    });
    
    // 제품 이미지 애니메이션
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach((item, index) => {
      const direction = index % 2 === 0 ? -50 : 50;
      
      gsap.from(item, {
        scrollTrigger: {
          trigger: item,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        },
        x: direction,
        opacity: 0.5
      });
    });
  }

  // 테스티모니얼 슬라이더 설정 함수
  function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    let currentIndex = 0;
    
    // 슬라이드 변경 함수
    function changeSlide(index) {
      // 현재 활성화된 슬라이드와 닷 비활성화
      testimonials[currentIndex]?.classList.remove('active');
      dots[currentIndex]?.classList.remove('active');
      
      // 새 인덱스로 업데이트
      currentIndex = index;
      
      // 인덱스가 범위를 벗어나면 조정
      if (currentIndex < 0) {
        currentIndex = testimonials.length - 1;
      } else if (currentIndex >= testimonials.length) {
        currentIndex = 0;
      }
      
      // 새 슬라이드와 닷 활성화
      testimonials[currentIndex]?.classList.add('active');
      dots[currentIndex]?.classList.add('active');
    }
    
    // 이벤트 리스너 설정
    prevBtn?.addEventListener('click', () => {
      changeSlide(currentIndex - 1);
    });
    
    nextBtn?.addEventListener('click', () => {
      changeSlide(currentIndex + 1);
    });
    
    // 닷 클릭 이벤트
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        changeSlide(index);
      });
    });
    
    // 자동 슬라이드
    const interval = setInterval(() => {
      changeSlide(currentIndex + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }

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
        <section className="hero" id="hero">
          <div className="hero-content">
            <h1 className="reveal-text">완벽함을 향한<br/>끝없는 여정</h1>
            <p className="reveal-text delay-1">럭셔리의 새로운 기준을 경험하세요</p>
            <div className="hero-cta reveal-text delay-2">
              <a href="#product" className="btn-primary">컬렉션 보기</a>
              <a href="#story" className="btn-secondary">브랜드 스토리</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="parallax-image" style={{backgroundImage: "url('https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80')"}}></div>
          </div>
          <div className="scroll-indicator">
            <div className="mouse"></div>
            <p>스크롤하여 탐색</p>
          </div>
        </section>

        <section className="story" id="story">
          <div className="section-header">
            <h2 className="reveal-text">우리의 이야기</h2>
            <div className="section-line reveal-line"></div>
          </div>
          <div className="story-content">
            <div className="story-text">
              <h3 className="reveal-text">장인 정신의 유산</h3>
              <p className="reveal-text delay-1">1920년부터 이어져 온 장인 정신과 혁신의 조화. LUXE는 단순한 제품이 아닌 세대를 초월하는 유산을 만들어 냅니다.</p>
              <p className="reveal-text delay-2">최고급 소재와 전통적인 제작 기법을 현대적 디자인과 결합하여 시간이 지나도 변치 않는 가치를 선사합니다.</p>
            </div>
            <div className="story-image reveal-image">
              <Image 
                src="https://images.unsplash.com/photo-1459257831348-f0cdd359235f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80" 
                alt="장인 정신"
                width={800}
                height={600}
              />
            </div>
          </div>
        </section>

        <section className="product" id="product">
          <div className="section-header">
            <h2 className="reveal-text">프리미엄 컬렉션</h2>
            <div className="section-line reveal-line"></div>
          </div>
          <div className="product-showcase">
            <div className="product-item">
              <div className="product-image reveal-image">
                <Image 
                  src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" 
                  alt="제품 1"
                  width={600}
                  height={400}
                />
              </div>
              <div className="product-details">
                <h3 className="reveal-text">아르테미스 컬렉션</h3>
                <p className="reveal-text delay-1">자연에서 영감을 받은 우아함과 현대적 감각의 조화</p>
                <a href="#" className="btn-tertiary reveal-text delay-2">자세히 보기</a>
              </div>
            </div>
            <div className="product-item reverse">
              <div className="product-image reveal-image">
                <Image 
                  src="https://images.unsplash.com/photo-1549439602-43ebca2327af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80" 
                  alt="제품 2"
                  width={600}
                  height={400}
                />
              </div>
              <div className="product-details">
                <h3 className="reveal-text">크로노스 시리즈</h3>
                <p className="reveal-text delay-1">시간을 초월하는 디자인과 최고급 소재의 만남</p>
                <a href="#" className="btn-tertiary reveal-text delay-2">자세히 보기</a>
              </div>
            </div>
            <div className="product-item">
              <div className="product-image reveal-image">
                <Image 
                  src="https://images.unsplash.com/photo-1560343776-97e7d202ff0e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80" 
                  alt="제품 3"
                  width={600}
                  height={400}
                />
              </div>
              <div className="product-details">
                <h3 className="reveal-text">엘리시움 라인</h3>
                <p className="reveal-text delay-1">완벽한 조화와 균형을 추구하는 미니멀리즘의 정수</p>
                <a href="#" className="btn-tertiary reveal-text delay-2">자세히 보기</a>
              </div>
            </div>
          </div>
        </section>

        <section className="experience" id="experience">
          <div className="section-header">
            <h2 className="reveal-text">특별한 경험</h2>
            <div className="section-line reveal-line"></div>
          </div>
          <div className="experience-content">
            <div className="experience-video">
              <video autoPlay muted loop playsInline>
                <source src="https://assets.mixkit.co/videos/preview/mixkit-hands-holding-a-smart-watch-with-white-band-42954-large.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="experience-features">
              <div className="feature reveal-text">
                <i className="fas fa-gem"></i>
                <h3>맞춤형 디자인</h3>
                <p>고객의 취향과 요구에 맞춘 특별한 제품을 제작합니다.</p>
              </div>
              <div className="feature reveal-text delay-1">
                <i className="fas fa-hand-holding-heart"></i>
                <h3>평생 보증</h3>
                <p>모든 제품은 평생 보증과 함께 제공됩니다.</p>
              </div>
              <div className="feature reveal-text delay-2">
                <i className="fas fa-concierge-bell"></i>
                <h3>VIP 서비스</h3>
                <p>전담 컨시어지 서비스로 특별한 경험을 선사합니다.</p>
              </div>
              <div className="feature reveal-text delay-3">
                <i className="fas fa-globe-asia"></i>
                <h3>글로벌 배송</h3>
                <p>전 세계 어디서나 안전하고 신속한 배송을 보장합니다.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonials">
          <div className="section-header">
            <h2 className="reveal-text">고객 후기</h2>
            <div className="section-line reveal-line"></div>
          </div>
          <div className="testimonial-slider">
            <div className="testimonial-item active">
              <div className="testimonial-content">
                <p>"LUXE의 제품은 단순한 소유물이 아닌 예술 작품입니다. 세심한 디테일과 완벽한 마감은 다른 브랜드와 차원이 다릅니다."</p>
                <div className="testimonial-author">
                  <h4>김준호</h4>
                  <p>컬렉터</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-content">
                <p>"맞춤 제작 서비스는 정말 특별했습니다. 제 아이디어를 완벽하게 구현해 주셨고, 결과물은 기대 이상이었습니다."</p>
                <div className="testimonial-author">
                  <h4>이서연</h4>
                  <p>디자이너</p>
                </div>
              </div>
            </div>
            <div className="testimonial-item">
              <div className="testimonial-content">
                <p>"VIP 서비스는 럭셔리의 새로운 기준을 제시합니다. 세심한 배려와 전문적인 조언으로 완벽한 구매 경험을 선사했습니다."</p>
                <div className="testimonial-author">
                  <h4>박민지</h4>
                  <p>기업 CEO</p>
                </div>
              </div>
            </div>
            <div className="testimonial-controls">
              <button className="prev"><i className="fas fa-chevron-left"></i></button>
              <div className="testimonial-dots">
                <span className="dot active"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
              <button className="next"><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>
        </section>

        <section className="contact" id="contact">
          <div className="section-header">
            <h2 className="reveal-text">특별한 경험을 시작하세요</h2>
            <div className="section-line reveal-line"></div>
          </div>
          <div className="contact-content">
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <label htmlFor="name">성함</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="email">이메일</label>
                  <input type="email" id="email" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">연락처</label>
                  <input type="tel" id="phone" />
                </div>
                <div className="form-group">
                  <label htmlFor="interest">관심 분야</label>
                  <select id="interest">
                    <option value="">선택해주세요</option>
                    <option value="product">제품 문의</option>
                    <option value="custom">맞춤 제작</option>
                    <option value="appointment">방문 예약</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">메시지</label>
                  <textarea id="message" rows={4}></textarea>
                </div>
                <button type="submit" className="btn-primary">문의하기</button>
              </form>
            </div>
            <div className="contact-info">
              <div className="info-item">
                <i className="fas fa-map-marker-alt"></i>
                <div>
                  <h3>방문 주소</h3>
                  <p>서울특별시 강남구 테헤란로 123<br/>LUXE 플래그십 스토어</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-clock"></i>
                <div>
                  <h3>운영 시간</h3>
                  <p>월-금: 10:00 - 19:00<br/>토-일: 11:00 - 18:00</p>
                </div>
              </div>
              <div className="info-item">
                <i className="fas fa-phone-alt"></i>
                <div>
                  <h3>연락처</h3>
                  <p>02-123-4567<br/>vip@luxe.co.kr</p>
                </div>
              </div>
              <div className="social-links">
                <a href="#"><i className="fab fa-instagram"></i></a>
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-youtube"></i></a>
                <a href="#"><i className="fab fa-pinterest"></i></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-logo">LUXE</div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>쇼핑</h4>
              <ul>
                <li><a href="#">신제품</a></li>
                <li><a href="#">베스트셀러</a></li>
                <li><a href="#">컬렉션</a></li>
                <li><a href="#">맞춤 제작</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>고객 서비스</h4>
              <ul>
                <li><a href="#">문의하기</a></li>
                <li><a href="#">배송 정보</a></li>
                <li><a href="#">반품 및 교환</a></li>
                <li><a href="#">제품 관리</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>회사 소개</h4>
              <ul>
                <li><a href="#">브랜드 스토리</a></li>
                <li><a href="#">장인 정신</a></li>
                <li><a href="#">지속가능성</a></li>
                <li><a href="#">채용 정보</a></li>
              </ul>
            </div>
            <div className="footer-column">
              <h4>법적 고지</h4>
              <ul>
                <li><a href="#">이용약관</a></li>
                <li><a href="#">개인정보처리방침</a></li>
                <li><a href="#">쿠키 정책</a></li>
                <li><a href="#">접근성</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2023 LUXE. All rights reserved.</p>
          <div className="language-selector">
            <select>
              <option value="ko">한국어</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="zh">中文</option>
            </select>
          </div>
        </div>
      </footer>
    </>
  );
} 