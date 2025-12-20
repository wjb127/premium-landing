/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.mixkit.co',
      },
    ],
  },
  // 개발 모드에서 하이드레이션 경고 억제
  reactStrictMode: false,
  // ESLint 검사 건너뛰기
  eslint: {
    ignoreDuringBuilds: true,
  },
  // 추가 설정 (일반적으로 필요하지 않음)
  // experimental: {
  //   appDir: true,
  // },
}

module.exports = nextConfig 