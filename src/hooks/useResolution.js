import { useState, useEffect } from 'react';

function userResolution() {
  const [resolution, setResolution] = useState(
    window.matchMedia('(max-width: 880px)').matches,
  );

  useEffect(() => {
    const setSize = () => {
      setResolution(window.matchMedia('(max-width: 880px)').matches);
    };
    window.addEventListener('resize', setSize, false);
    return () => window.removeEventListener('resize', setSize, false);
  }, []);

  return resolution;
}

export default userResolution;
