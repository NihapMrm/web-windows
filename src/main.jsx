import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import LoadingScreen from './components/LoadingScreen';
import Laptop3D from './components/Laptop3D';
import FullscreenToggle from './components/FullscreenToggle';
import FullscreenNotification from './components/FullscreenNotification';

const LOADER_DURATION = 4000; // ms — change this to adjust loading screen length

function Root() {
  const [loading, setLoading] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), LOADER_DURATION);
    const hideTimer = setTimeout(() => setLoading(false), LOADER_DURATION + 500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  return (
    <>
      {/* {loading && <LoadingScreen fading={fading} duration={LOADER_DURATION} />} */}
       <FullscreenToggle />
      <FullscreenNotification />
      <App />
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
