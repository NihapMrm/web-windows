import React, { useState } from 'react';
import Login from './Login';
import Desktop from './Desktop';

import './css/App.css';



function App() {
  const [view, setView] = useState("login"); // login, desktop // need to chnage to login finally
  const [fadeClass, setFadeClass] = useState("fade-in");

  const handleLogin = () => {
    setTimeout(() => {
      setFadeClass("fade-out");
      setTimeout(() => {
        setView("desktop");
        setFadeClass("fade-in");
      }, 500);
    }, 2000); 
  };

  const handleLogout = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setView("login");
      setFadeClass("fade-in");
    }, 500);
  };

  return (
    <div className={`fadeContainer ${fadeClass}`}>
    
      {view === "login" && <Login onLogin={handleLogin} />}
      {view === "desktop" && <Desktop onLogout={handleLogout} />}
    </div>
  );
}

export default App;
