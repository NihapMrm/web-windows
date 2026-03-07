import React, { useCallback, useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FiX, FiPlus, FiBold, FiItalic, FiLink, FiList, FiChevronDown, FiSave } from 'react-icons/fi';
import { LuHeading1 } from 'react-icons/lu';
import { RxLetterCaseCapitalize } from 'react-icons/rx';
import { AiOutlineTable } from 'react-icons/ai';
import Close from '../close';
import Minimize from '../minimize';
import Restore from '../restore';

const NotepadModel = ({ fileName, fileId, onClose }) => {
    const nodeRef = useRef(null);
    const [isMaximized, setIsMaximized] = useState(false);
    const [content, setContent] = useState('');
    const [isDirty, setIsDirty] = useState(false);
    const [savedFlash, setSavedFlash] = useState(false);
    const storageKey = `notepad_${fileId ?? fileName}`;

    // Load saved content on open
    useEffect(() => {
        const saved = localStorage.getItem(storageKey);
        if (saved !== null) setContent(saved);
        setIsDirty(false);
    }, [storageKey]);

    const handleSave = useCallback(() => {
        localStorage.setItem(storageKey, content);
        setIsDirty(false);
        setSavedFlash(true);
        setTimeout(() => setSavedFlash(false), 1500);
    }, [storageKey, content]);

    // Ctrl+S / Cmd+S
    useEffect(() => {
        const handler = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                handleSave();
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [handleSave]);

    const handleChange = (e) => {
        setContent(e.target.value);
        setIsDirty(true);
    };

    const ToolBtn = ({ children, label }) => (
        <button
            title={label}
            className="flex items-center gap-0.5 px-2 py-1 rounded hover:bg-[#2b2b2b] bg-transparent border-none text-white text-sm cursor-pointer"
        >
            {children}
        </button>
    );

    return (
        <Draggable
            handle=".notepad-drag-handle"
            bounds="parent"
            disabled={isMaximized}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
            nodeRef={nodeRef}
        >
            <div
                ref={nodeRef}
                className={`bg-[#1c1c1c] ${isMaximized ? 'w-full h-[calc(100vh-3rem)]' : 'w-[820px] h-[580px]'} fixed top-0 left-0 z-50 text-white flex flex-col`}
                style={{ transition: 'width 0.3s, height 0.3s' }}
                onContextMenu={(e) => e.stopPropagation()}
            >
                {/* Title bar / tab row */}
                <div className="h-9 flex items-center justify-between bg-[#1c1c1c] notepad-drag-handle shrink-0 select-none">
                    <div className="flex items-center h-full">
                        {/* Active tab */}
                        <div className="flex items-center gap-2 bg-[#2b2b2b] px-4 h-full border-t-2 border-blue-500">
                            <img src="/src/assets/icons/TextFile.svg" className="w-4 h-4 shrink-0" alt="" />
                            <span className="text-[13px] max-w-[200px] truncate">
                                {isDirty && <span className="text-blue-400 mr-1">●</span>}
                                {fileName}
                            </span>
                            <FiX
                                className="w-4 h-4 p-0.5 hover:bg-[#4f4f4f] rounded cursor-pointer shrink-0"
                                onClick={onClose}
                            />
                        </div>
                        <FiPlus className="ml-2 w-6 h-6 p-1 hover:bg-[#2b2b2b] rounded cursor-pointer text-gray-400 shrink-0" />
                    </div>
                    <div className="flex items-center">
                        <Minimize onClose={onClose} />
                        <Restore onRestore={() => setIsMaximized(p => !p)} />
                        <Close onClose={onClose} />
                    </div>
                </div>

                {/* Menu bar */}
                <div className="h-8 flex items-center bg-[#1c1c1c] px-3 gap-1 shrink-0 border-b border-[#2b2b2b] select-none">
                    <button onClick={handleSave} className="px-3 py-1 text-sm hover:bg-[#2b2b2b] rounded bg-transparent border-none text-white cursor-pointer">File</button>
                    {['Edit', 'View'].map(m => (
                        <button key={m} className="px-3 py-1 text-sm hover:bg-[#2b2b2b] rounded bg-transparent border-none text-white cursor-pointer">{m}</button>
                    ))}
                    {savedFlash && (
                        <span className="ml-auto mr-2 text-xs text-green-400 flex items-center gap-1">
                            <FiSave className="w-3 h-3" /> Saved
                        </span>
                    )}
                </div>

                {/* Toolbar */}
                <div className="h-10 flex items-center justify-between bg-[#1c1c1c] px-3 border-b border-[#2b2b2b] shrink-0 select-none">
                    <div className="flex items-center gap-0.5">
                        <ToolBtn label="Heading">
                            <LuHeading1 className="w-4 h-4" />
                            <FiChevronDown className="w-3 h-3 text-gray-400" />
                        </ToolBtn>
                        <ToolBtn label="List">
                            <FiList className="w-4 h-4" />
                            <FiChevronDown className="w-3 h-3 text-gray-400" />
                        </ToolBtn>
                        <div className="w-px h-5 bg-[#3f3f3f] mx-1" />
                        <ToolBtn label="Bold"><FiBold className="w-4 h-4" /></ToolBtn>
                        <ToolBtn label="Italic"><FiItalic className="w-4 h-4" /></ToolBtn>
                        <ToolBtn label="Link"><FiLink className="w-4 h-4" /></ToolBtn>
                        <ToolBtn label="Table">
                            <AiOutlineTable className="w-4 h-4" />
                            <FiChevronDown className="w-3 h-3 text-gray-400" />
                        </ToolBtn>
                        <div className="w-px h-5 bg-[#3f3f3f] mx-1" />
                        <ToolBtn label="Format"><RxLetterCaseCapitalize className="w-4 h-4" /></ToolBtn>
                    </div>
                    {/* Right side icons (decorative) */}
                    <div className="flex items-center gap-1">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-400 shrink-0" />
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-[#2b2b2b] rounded bg-transparent border-none text-gray-400 cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
                            </svg>
                        </button>
                        <button className="w-7 h-7 flex items-center justify-center hover:bg-[#2b2b2b] rounded bg-transparent border-none text-gray-400 cursor-pointer">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                                <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Text area */}
                <textarea
                    className="flex-1 bg-[#1c1c1c] text-white p-8 resize-none outline-none text-sm leading-relaxed font-[system-ui,sans-serif] placeholder-gray-600"
                    value={content}
                    onChange={handleChange}
                    autoFocus
                    spellCheck={false}
                    placeholder="Start typing..."
                />
            </div>
        </Draggable>
    );
};

export default NotepadModel;
