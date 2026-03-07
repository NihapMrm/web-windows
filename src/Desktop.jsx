import './css/Desktop.css';
import Taskbar from './sections/Taskbar';
import { useState } from 'react';
import AppsModel from './components/models/AppsModel';
import { AnimatePresence } from 'framer-motion';

const Desktop = ({onLogout}) =>{
    const [activePopup, setActivePopup] = useState(null);

    const openPopup = (id) => {
        setActivePopup(id);
    };
    
    const closePopup = () => setActivePopup(null);

    return(
       <div className="h-screen desktopContainer">
            <Taskbar activePopup={activePopup} openPopup={openPopup} closePopup={closePopup} />
            <AnimatePresence>
                {activePopup === 'apps' && <AppsModel onClose={closePopup} openPopup={openPopup} onLogout={onLogout} />}
            </AnimatePresence>
       </div>
    )
}

export default Desktop;