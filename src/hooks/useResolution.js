import { useState, useEffect } from 'react';

function useResolution(min, max) {
  const [resolution, setResolution] = useState(
    window.matchMedia(`(min-width: ${min}px)`).matches
    && max ? window.matchMedia(`(max-width: ${max}px)`).matches : window.matchMedia(`(min-width: ${min}px)`).matches && true,
  );

  useEffect(() => {
    const setSize = () => {
      setResolution(
        window.matchMedia(`(min-width: ${min}px)`).matches
        && max ? window.matchMedia(`(max-width: ${max}px)`).matches : window.matchMedia(`(min-width: ${min}px)`).matches && true,
      );
    };
    window.addEventListener('resize', setSize, false);
    return () => window.removeEventListener('resize', setSize, false);
  }, []);

  return resolution;
}

export default useResolution;
