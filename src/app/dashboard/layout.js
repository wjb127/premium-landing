import './dashboard.css';

export const metadata = {
  title: 'LUXE - 대시보드',
  description: '랜딩 페이지 성과 측정 대시보드',
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-wrapper">
      {children}
    </div>
  );
} 