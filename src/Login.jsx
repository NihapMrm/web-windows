import { useState } from 'react';
import './css/Login.css';
import Time from './components/time';
import Date from './components/date';
import Wifi from './components/wifi';
import Battery from './components/battery';
import Loader from './components/loader';


const Login = ({onLogin}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);         
    onLogin();                 
  };


  const [isOpen, setIsOpen] = useState(false);

  const openLogin = () => {
    setIsOpen(true);
  };

  const closeLogin = () => {
    setIsOpen(false);
  };



  return (
    <>
    <div className="mainContainer" onClick={openLogin}>
     <h1 className="text-9xl mt-12"><Time /></h1>
     <p><Date/></p>
     <div className="footer">
      <Wifi/>
      <Battery/>
      </div>
    </div>

    {isOpen && (
    <div className="loginContainer" onClick={closeLogin}>
      <div className="content"  onClick={(e) => e.stopPropagation()}>
         <div className="profile"></div>
      <h1 className="name">Nihap Mrm</h1>
      {!isLoading ? (
      <button className="enter"  onClick={handleClick}>Sign In</button>
    ) : (
      <div className="flex flex-col items-center justify-center">
      
        <Loader/>
        <h1 className="text-2xl">Welcome</h1>
      </div>
        
      )}
      </div>

    
     
    </div>
    )}
 
    </>
  )
}

export default Login
