'use client';

import { useEffect, useState, ReactElement } from 'react';
// @ts-ignore
import Image from 'next/image';
// @ts-ignore
import Link from 'next/link';
// @ts-ignore
import Script from 'next/script';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Home(): ReactElement {
  const [isMounted, setIsMounted] = useState(false);
  const [isTranslated, setIsTranslated] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
    
    // 번역 확장 프로그램 감지
    const htmlElement = document.documentElement;
    if (htmlElement.className.includes('translated') || htmlElement.lang !== 'ko') {
      setIsTranslated(true);
    }
    
    // GSAP 초기화 및 애니메이션
    if (!isTranslated) {
      gsap.registerPlugin(ScrollTrigger);
      
      // 로더 애니메이션
      const loaderTl = gsap.timeline();
      loaderTl.to('.loader-bar', { width: '100%', duration: 1.5, ease: 'power2.inOut' });
      loaderTl.to('.loader', { 
        y: '-100%', 
        duration: 0.8, 
        ease: 'power2.inOut',
        onComplete: () => {
          document.body.classList.add('loaded');
        }
      });
      
      // 텍스트 애니메이션
      gsap.utils.toArray('.reveal-text').forEach((text: any) => {
        gsap.from(text, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
          }
        });
      });
      
      // 이미지 애니메이션
      gsap.utils.toArray('.reveal-image').forEach((img: any) => {
        gsap.from(img, {
          scale: 0.8,
          opacity: 0,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: img,
            start: 'top 85%',
          }
        });
      });
      
      // 섹션 애니메이션
      gsap.utils.toArray('section').forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleClass: { targets: section, className: 'active' },
          onEnter: () => {
            if (i > 0) {
              document.body.setAttribute('data-section', section.id);
            }
          },
          onLeaveBack: () => {
            if (i > 0) {
              const prevSection = i > 1 ? document.querySelectorAll('section')[i-1].id : '';
              document.body.setAttribute('data-section', prevSection);
            }
          }
        });
      });
      
      // 스크롤 기반 헤더 스타일 변경
      ScrollTrigger.create({
        start: 'top -80',
        toggleClass: { targets: 'header', className: 'scrolled' }
      });
      
      // 폼 제출 이벤트
      const contactForm = document.querySelector('.contact-form form');
      if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const formData = new FormData(form);
          
          // 폼 데이터 처리 (실제 구현에서는 API 호출 등으로 대체)
          console.log('Form submitted:', Object.fromEntries(formData));
          
          // 성공 메시지 표시
          const successMsg = document.querySelector('.form-success');
          if (successMsg) {
            successMsg.classList.add('visible');
            form.reset();
            
            // 3초 후 성공 메시지 숨기기
            setTimeout(() => {
              successMsg.classList.remove('visible');
            }, 3000);
          }
        });
      }
    }
  }, [isTranslated]);
  
  if (!isMounted) {
    return (
      <div className="initial-loading">
        <div className="loader-logo">LUXE</div>
      </div>
    );
  }
  
  return (
    <>
      {isTranslated && (
        <div className="translation-notice">
          <p>
            최상의 경험을 위해 브라우저의 번역 기능을 비활성화해 주세요.
            <button onClick={() => window.location.reload()}>
              새로고침
            </button>
          </p>
        </div>
      )}
      
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
        <section id="hero" className="hero">
          <div className="hero-content">
            <h1 className="reveal-text">럭셔리의 새로운 기준</h1>
            <p className="reveal-text">평범함을 넘어서는 특별한 경험을 선사합니다.</p>
            <div className="hero-cta">
              <a href="#product" className="btn-primary">제품 살펴보기</a>
              <a href="#experience" className="btn-secondary">경험 알아보기</a>
            </div>
          </div>
          <div className="hero-image reveal-image">
            <Image 
              src="https://via.placeholder.com/800x600?text=Luxury+Hero" 
              alt="럭셔리 제품 이미지" 
              width={800} 
              height={600}
              priority
            />
          </div>
        </section>
        
        <section id="story" className="story">
          <div className="container">
            <div className="story-content">
              <h2 className="section-title reveal-text">우리의 이야기</h2>
              <p className="reveal-text">
                LUXE는 2010년, 장인정신과 혁신을 결합하여 탄생했습니다. 
                우리는 최고급 소재와 정교한 기술력으로 럭셔리의 새로운 기준을 제시합니다.
                단순한 제품이 아닌, 라이프스타일과 가치를 전달합니다.
              </p>
              <p className="reveal-text">
                장인들의 손길이 닿은 모든 제품은 세심한 디테일과 완벽함을 추구합니다.
                우리는 전통을 존중하면서도 현대적 감각을 더해 시대를 초월한 아름다움을 창조합니다.
              </p>
            </div>
            <div className="story-image reveal-image">
              <Image 
                src="https://via.placeholder.com/600x800?text=Our+Story" 
                alt="브랜드 스토리" 
                width={600} 
                height={800}
              />
            </div>
          </div>
        </section>
        
        <section id="product" className="product">
          <div className="container">
            <h2 className="section-title reveal-text">프리미엄 컬렉션</h2>
            <div className="product-grid">
              <div className="product-item reveal-image">
                <div className="product-image">
                  <Image 
                    src="https://via.placeholder.com/400x500?text=Product+1" 
                    alt="제품 1" 
                    width={400} 
                    height={500}
                  />
                </div>
                <div className="product-info">
                  <h3>시그니처 컬렉션</h3>
                  <p>LUXE의 정체성을 담은 시그니처 라인입니다.</p>
                  <a href="#contact" className="btn-tertiary">자세히 보기</a>
                </div>
              </div>
              <div className="product-item reveal-image">
                <div className="product-image">
                  <Image 
                    src="/images/product-2.jpg" 
                    alt="제품 2" 
                    width={400} 
                    height={500}
                  />
                </div>
                <div className="product-info">
                  <h3>리미티드 에디션</h3>
                  <p>한정된 수량으로 제작되는 특별한 컬렉션입니다.</p>
                  <a href="#contact" className="btn-tertiary">자세히 보기</a>
                </div>
              </div>
              <div className="product-item reveal-image">
                <div className="product-image">
                  <Image 
                    src="/images/product-3.jpg" 
                    alt="제품 3" 
                    width={400} 
                    height={500}
                  />
                </div>
                <div className="product-info">
                  <h3>맞춤 제작</h3>
                  <p>고객의 요구에 맞춰 특별히 제작되는 서비스입니다.</p>
                  <a href="#contact" className="btn-tertiary">자세히 보기</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="experience" className="experience">
          <div className="container">
            <h2 className="section-title reveal-text">특별한 경험</h2>
            <div className="experience-content">
              <div className="experience-text">
                <p className="reveal-text">
                  LUXE는 단순한 제품 이상의 가치를 제공합니다. 
                  우리의 쇼룸에서는 제품을 직접 체험하고, 
                  전문가의 상담을 통해 당신만의 스타일을 찾을 수 있습니다.
                </p>
                <p className="reveal-text">
                  VIP 고객을 위한 프라이빗 이벤트, 신제품 프리뷰, 
                  장인과의 만남 등 특별한 경험을 제공합니다.
                </p>
                <a href="#contact" className="btn-primary reveal-text">경험 예약하기</a>
              </div>
              <div className="experience-video reveal-image">
                <video autoPlay muted loop playsInline>
                  <source src="/videos/luxury-experience.mp4" type="video/mp4" />
                  브라우저가 비디오를 지원하지 않습니다.
                </video>
              </div>
            </div>
          </div>
        </section>
        
        <section id="contact" className="contact">
          <div className="container">
            <h2 className="section-title reveal-text">문의하기</h2>
            <div className="contact-content">
              <div className="contact-info reveal-text">
                <h3>연락처</h3>
                <p>서울특별시 강남구 테헤란로 123</p>
                <p>이메일: info@luxe.com</p>
                <p>전화: 02-123-4567</p>
                <div className="social-links">
                  <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
                  <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
                  <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
                </div>
              </div>
              <div className="contact-form reveal-text">
                <form>
                  <div className="form-group">
                    <label htmlFor="name">이름</label>
                    <input type="text" id="name" name="name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">이메일</label>
                    <input type="email" id="email" name="email" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="interest">관심 분야</label>
                    <select id="interest" name="interest">
                      <option value="">선택해주세요</option>
                      <option value="product">제품 문의</option>
                      <option value="experience">경험 예약</option>
                      <option value="custom">맞춤 제작</option>
                      <option value="other">기타</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">메시지</label>
                    <textarea id="message" name="message" rows={5}></textarea>
                  </div>
                  <button type="submit" className="btn-primary">보내기</button>
                  <div className="form-success">
                    메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <footer>
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">LUXE</div>
            <div className="footer-links">
              <div className="footer-column">
                <h4>회사 소개</h4>
                <ul>
                  <li><a href="#story">스토리</a></li>
                  <li><a href="#">연혁</a></li>
                  <li><a href="#">팀</a></li>
                  <li><a href="#">채용</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>제품</h4>
                <ul>
                  <li><a href="#product">컬렉션</a></li>
                  <li><a href="#">신제품</a></li>
                  <li><a href="#">베스트셀러</a></li>
                  <li><a href="#">맞춤 제작</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>고객 지원</h4>
                <ul>
                  <li><a href="#contact">문의하기</a></li>
                  <li><a href="#">FAQ</a></li>
                  <li><a href="#">배송 정보</a></li>
                  <li><a href="#">반품 및 교환</a></li>
                </ul>
              </div>
              <div className="footer-column">
                <h4>법적 정보</h4>
                <ul>
                  <li><a href="#">이용약관</a></li>
                  <li><a href="#">개인정보처리방침</a></li>
                  <li><a href="#">쿠키 정책</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2023 LUXE. All rights reserved.</p>
            <a href="/dashboard" className="dashboard-link">대시보드</a>
          </div>
        </div>
      </footer>
    </>
  );
}
