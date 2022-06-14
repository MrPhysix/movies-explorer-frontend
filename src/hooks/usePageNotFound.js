import { useState, useEffect } from 'react';

function useResolution(width) {
  const [resolution, setResolution] = useState(
    window.matchMedia(`(max-width: ${width}px)`).matches,
  );

  useEffect(() => {
    const setSize = () => {
      setResolution(window.matchMedia(`(max-width: ${width}px)`).matches);
    };
    window.addEventListener('resize', setSize, false);
    return () => window.removeEventListener('resize', setSize, false);
  }, []);

  return resolution;
}

export default useResolution;
