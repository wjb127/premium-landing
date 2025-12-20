'use client';

import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { v4 as uuidv4 } from 'uuid';

export default function VisitTracker() {
  useEffect(() => {
    const trackPageVisit = async () => {
      // 세션 ID 생성 또는 가져오기
      let sessionId = localStorage.getItem('luxe_session_id');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('luxe_session_id', sessionId);
      }
      
      // 페이지 방문 기록
      await supabase.from('page_visits').insert({
        page_path: window.location.pathname,
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        session_id: sessionId
      });
    };
    
    trackPageVisit();
  }, []);
  
  return null; // 이 컴포넌트는 UI를 렌더링하지 않습니다
} 