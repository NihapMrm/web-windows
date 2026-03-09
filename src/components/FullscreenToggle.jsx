import React, { useState, useEffect } from 'react';
import { FiMaximize, FiMinimize } from "react-icons/fi";

const FullscreenToggle = () => {
    const [isFullscreen, setIsFullscreen] = useState(false);

    // Check if already in fullscreen on component mount
    useEffect(() => {
        const checkFullscreen = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener('fullscreenchange', checkFullscreen);
        checkFullscreen(); // Check initial state

        return () => {
            document.removeEventListener('fullscreenchange', checkFullscreen);
        };
    }, []);

    const toggleFullscreen = async () => {
        try {
            if (!document.fullscreenElement) {
                await document.documentElement.requestFullscreen();
            } else {
                await document.exitFullscreen();
            }
        } catch (error) {
            console.error('Error toggling fullscreen:', error);
        }
    };

    return (
        <button 
            onClick={toggleFullscreen}
            className="fixed bottom-20 right-10 z-[9999] bg-white backdrop-blur-md border border-white/20 rounded-full p-3 text-black  hover:scale-110 transition-all duration-200 shadow-lg"
            title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
        >
            {isFullscreen ? <FiMinimize size={20} /> : <FiMaximize size={20} />}
        </button>
    );
};

export default FullscreenToggle;