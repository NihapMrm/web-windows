import './css/Desktop.css';
import Taskbar from './sections/Taskbar';
import { useState } from 'react';
import AppsModel from './components/models/AppsModel';
import ContextMenu from './components/ContextMenu';
import { AnimatePresence } from 'framer-motion';

const Desktop = ({onLogout}) =>{
    const [activePopup, setActivePopup] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);

    const openPopup = (id) => {
        setActivePopup(id);
    };
    
    const closePopup = () => setActivePopup(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const closeContextMenu = () => setContextMenu(null);

    return(
       <div className="h-screen desktopContainer" onContextMenu={handleContextMenu} onClick={closeContextMenu}>
            <Taskbar activePopup={activePopup} openPopup={openPopup} closePopup={closePopup} />
            <AnimatePresence>
                {activePopup === 'apps' && <AppsModel onClose={closePopup} openPopup={openPopup} onLogout={onLogout} />}
                {contextMenu && <ContextMenu key="ctx" x={contextMenu.x} y={contextMenu.y} onClose={closeContextMenu} />}
            </AnimatePresence>
       </div>
    )
}

export default Desktop;