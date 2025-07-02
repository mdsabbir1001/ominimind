import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "pathname" পরিবর্তন হলে পেজটিকে টপে স্ক্রল করুন
    window.scrollTo(0, 0);
  }, [pathname]); // pathname কে dependency হিসেবে যোগ করুন

  return null; // এই কম্পোনেন্টটি UI-তে কিছু রেন্ডার করবে না
}

export default ScrollToTop;