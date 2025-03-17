// 페이지 로드 시 로더 애니메이션
document.addEventListener('DOMContentLoaded', () => {
    // GSAP 초기화
    gsap.registerPlugin(ScrollTrigger);
    
    // 로더 애니메이션
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // 히어로 섹션 애니메이션
        const heroTexts = document.querySelectorAll('.hero .reveal-text');
        heroTexts.forEach(text => {
            text.classList.add('active');
        });
    }, 2000);
    
    // 스크롤 이벤트에 따른 헤더 스타일 변경
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // 스크롤 애니메이션
    setupScrollAnimations();
    
    // 테스티모니얼 슬라이더
    setupTestimonialSlider();
});

// 스크롤 애니메이션 설정
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

// 테스티모니얼 슬라이더 설정
function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.testimonial-controls .prev');
    const nextBtn = document.querySelector('.testimonial-controls .next');
    let currentIndex = 0;
    
    // 슬라이드 변경 함수
    function changeSlide(index) {
        // 현재 활성화된 슬라이드와 닷 비활성화
        testimonials[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        // 새 인덱스로 업데이트
        currentIndex = index;
        
        // 인덱스가 범위를 벗어나면 조정
        if (currentIndex < 0) {
            currentIndex = testimonials.length - 1;
        } else if (currentIndex >= testimonials.length) {
            currentIndex = 0;
        }
        
        // 새 슬라이드와 닷 활성화
        testimonials[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // 이벤트 리스너 설정
    prevBtn.addEventListener('click', () => {
        changeSlide(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        changeSlide(currentIndex + 1);
    });
    
    // 닷 클릭 이벤트
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeSlide(index);
        });
    });
    
    // 자동 슬라이드 (선택 사항)
    setInterval(() => {
        changeSlide(currentIndex + 1);
    }, 5000);
}

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

// 제품 상세 뷰 모달 (선택 사항)
document.querySelectorAll('.btn-tertiary').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // 여기에 모달 표시 로직 추가
        alert('제품 상세 정보는 준비 중입니다.');
    });
});

// 폼 제출 이벤트
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 폼 데이터 수집 및 처리 로직
        const formData = {
            name: this.querySelector('#name').value,
            email: this.querySelector('#email').value,
            phone: this.querySelector('#phone').value,
            interest: this.querySelector('#interest').value,
            message: this.querySelector('#message').value
        };
        
        // 여기에 폼 제출 로직 추가 (API 호출 등)
        console.log('폼 데이터:', formData);
        
        // 성공 메시지 표시
        alert('문의가 성공적으로 접수되었습니다. 곧 연락드리겠습니다.');
        this.reset();
    });
} 