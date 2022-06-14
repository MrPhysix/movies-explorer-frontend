import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function usePageNotFound() {
  const { pathname } = useLocation();
  const [pageNotFound, setPageNotFound] = useState(false);

  useEffect(() => {
    if (pathname === '/404') setPageNotFound(true);
    else setPageNotFound(false);
  }, [pathname]);

  return pageNotFound;
}

export default usePageNotFound;
