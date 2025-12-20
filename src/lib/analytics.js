import { supabase } from './supabaseClient';

// 세션 ID 가져오기
export const getSessionId = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('luxe_session_id');
  }
  return null;
};

// 클릭 이벤트 추적
export const trackClick = async (elementId, interactionType = 'click') => {
  const sessionId = getSessionId();
  if (!sessionId) return;
  
  await supabase.from('user_interactions').insert({
    session_id: sessionId,
    interaction_type: interactionType,
    element_id: elementId,
    page_path: window.location.pathname
  });
};

// 스크롤 이벤트 추적
export const trackScroll = async (sectionId) => {
  const sessionId = getSessionId();
  if (!sessionId) return;
  
  await supabase.from('user_interactions').insert({
    session_id: sessionId,
    interaction_type: 'scroll',
    element_id: sectionId,
    page_path: window.location.pathname
  });
};

// 폼 제출 추적
export const trackFormSubmission = async (formData) => {
  const sessionId = getSessionId();
  
  await supabase.from('form_submissions').insert({
    ...formData,
    session_id: sessionId
  });
}; 