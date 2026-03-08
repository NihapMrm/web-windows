import React, { useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FiCheck, FiImage, FiMonitor } from 'react-icons/fi';
import Close from '../close';
import Minimize from '../minimize';
import Restore from '../restore';

// Add more entries here as you drop images into src/images/bg/
//we have total 10 images
const WALLPAPERS = [
    { id: 'desktop-bg',    label: 'Background 1',  src: '/src/images/bg/desktop-bg.webp' },
    { id: 'desktop-bg-1',    label: 'Background 2',  src: '/src/images/bg/desktop-bg-1.webp' },
    { id: 'desktop-bg-2',    label: 'Background 3',  src: '/src/images/bg/desktop-bg-2.webp' },
    { id: 'desktop-bg-3',    label: 'Background 4',  src: '/src/images/bg/desktop-bg-3.webp' },
    { id: 'desktop-bg-4',    label: 'Background 5',  src: '/src/images/bg/desktop-bg-4.webp' },
    { id: 'desktop-bg-5',    label: 'Background 6',  src: '/src/images/bg/desktop-bg-5.webp' },
    { id: 'desktop-bg-6',    label: 'Background 7',  src: '/src/images/bg/desktop-bg-6.webp' },
    { id: 'desktop-bg-7',    label: 'Background 8',  src: '/src/images/bg/desktop-bg-7.webp' },
    { id: 'desktop-bg-8',    label: 'Background 9',  src: '/src/images/bg/desktop-bg-8.webp' },
    { id: 'desktop-bg-9',    label: 'Background 10', src: '/src/images/bg/desktop-bg-9.webp' },
    { id: 'desktop-bg-10',    label: 'Background 11', src: '/src/images/bg/desktop-bg-10.webp' },

];


const PersonalizationModel = ({ onClose, currentWallpaper, onWallpaperChange }) => {
    const nodeRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [selectedWallpaper, setSelectedWallpaper] = useState(
        WALLPAPERS.find(w => w.src === currentWallpaper)?.id ?? WALLPAPERS[0].id
    );

    const handleSelect = (id) => {
        setSelectedWallpaper(id);
        const wp = WALLPAPERS.find(w => w.id === id);
        if (wp) onWallpaperChange(wp.src);
    };

    return (
        <Draggable
            handle=".personalization-drag-handle"
            bounds="parent"
            disabled={isMaximized}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                className={`bg-[#202020] ${isMaximized ? 'w-full h-[calc(100vh-3rem)]' : 'w-[900px] h-[580px]'} fixed top-0 left-0 z-50 text-white flex flex-col`}
                style={{ transition: 'width 0.3s, height 0.3s' }}
                onContextMenu={(e) => e.stopPropagation()}
            >
                {/* Title bar */}
                <div className="h-9 flex items-center justify-between bg-[#1a1a1a] personalization-drag-handle shrink-0 select-none">
                    <div className="flex items-center gap-2 px-4">
                        <FiMonitor className="w-4 h-4 text-gray-400" />
                        <span className="text-[13px]">Personalization</span>
                    </div>
                    <div className="flex items-center">
                        <Minimize onClose={onClose} />
                        <Restore onRestore={() => setIsMaximized(p => !p)} />
                        <Close onClose={onClose} />
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-52 bg-[#1a1a1a] shrink-0 py-4 overflow-y-auto">
                        <p className="px-4 text-xs text-gray-500 uppercase tracking-wider mb-2">Personalization</p>
                        <div className="w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 bg-[#2d2d2d] text-white select-none">
                            <FiImage className="w-4 h-4 shrink-0" />
                            Background
                            <div className="ml-auto w-1 h-4 rounded-full bg-blue-500" />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-6">
                        <>
                            {/* Preview */}
                            <div className="relative w-full h-36 rounded-lg overflow-hidden mb-6 border border-[#3a3a3a]">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `url(${WALLPAPERS.find(w => w.id === selectedWallpaper)?.src})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                />
                                <div className="absolute bottom-1 right-2 bg-black/50 text-[10px] px-2 py-0.5 rounded text-gray-300">Preview</div>
                            </div>

                                <h2 className="text-sm font-semibold mb-1">Personalize your background</h2>
                                <p className="text-xs text-gray-400 mb-4">Choose a background image for your desktop.</p>

                                {/* Wallpaper grid */}
                                <div className="grid grid-cols-4 gap-3 mb-6">
                                    {WALLPAPERS.map(wp => (
                                        <button
                                            key={wp.id}
                                            onClick={() => handleSelect(wp.id)}
                                            className={`relative rounded-md overflow-hidden aspect-video border-2 cursor-pointer p-0 transition-all ${
                                                selectedWallpaper === wp.id
                                                    ? 'border-blue-500 ring-2 ring-blue-500/40'
                                                    : 'border-transparent hover:border-[#555]'
                                            }`}
                                        >
                                            <img src={wp.src} alt={wp.label} className="w-full h-full object-cover" />
                                            {selectedWallpaper === wp.id && (
                                                <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-0.5">
                                                    <FiCheck className="w-2.5 h-2.5 text-white" />
                                                </div>
                                            )}
                                            <span className="absolute bottom-0 left-0 right-0 text-[10px] text-center text-white bg-black/50 py-0.5 truncate px-1">
                                                {wp.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                        </>
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default PersonalizationModel;
