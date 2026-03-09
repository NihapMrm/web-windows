import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import LoadingScreen from './components/LoadingScreen';
import Laptop3D from './components/Laptop3D';

function Root() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 18);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setFading(true);
      const doneTimer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(doneTimer);
    }
  }, [progress]);

  return (
    <>
      {loading && <LoadingScreen progress={progress} fading={fading} />}
      <Laptop3D />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
