import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePage(path) {
  const { pathname } = useLocation();
  const [isPage, setIsPage] = useState(false);

  useEffect(() => {
    if (pathname === path) setIsPage(true);
    else setIsPage(false);
  }, [pathname]);

  return isPage;
}

export default usePage;
