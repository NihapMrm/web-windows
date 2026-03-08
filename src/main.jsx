import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; 
import './index.css';
import Laptop3D from './components/Laptop3D';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Laptop3D />
  </StrictMode>
);
