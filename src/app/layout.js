import { Cormorant_Garamond, Noto_Sans_KR } from 'next/font/google';
import Script from 'next/script';
import './globals.css';

// 폰트 설정
const cormorant = Cormorant_Garamond({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-cormorant',
});
const notoSansKr = Noto_Sans_KR({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-noto-sans-kr',
});

export const metadata = {
  title: 'LUXE - 프리미엄 경험',
  description: '럭셔리의 새로운 기준을 경험하세요',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${cormorant.variable} ${notoSansKr.variable}`} suppressHydrationWarning>
      <head>
        {/* 번역 방지 메타 태그 */}
        <meta name="google" content="notranslate" />
        
        {/* Font Awesome은 Script 컴포넌트로 로드 */}
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
} 