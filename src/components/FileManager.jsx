import React, { forwardRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable'
import { FiArrowLeft, FiArrowRight, FiArrowUp, FiChevronDown, FiChevronRight, FiCopy, FiFolder, FiHome, FiImage, FiMoreHorizontal, FiMusic, FiPlus, FiRefreshCw, FiScissors, FiShare2, FiTrash2, FiVideo, FiX } from "react-icons/fi";
import { HiOutlineViewGrid } from "react-icons/hi";
import { TbSortDescending } from "react-icons/tb";
import { AiOutlineFile } from "react-icons/ai";
import { MdComputer, MdOutlineDriveFolderUpload } from "react-icons/md";
import { BsPinAngle } from "react-icons/bs";
import Close from './close';
import Minimize from './minimize';
import Restore from './restore';
import Icon from "../components/icon";
import FileManagerIcon from './fileManagerIcon';



const FileManager = forwardRef(({ slug, content, onClose, isMaximized, onRestore, activePopup, openPopup, closePopup }, ref) => {
        const nodeRef = React.useRef(null);
        const [position, setPosition] = useState({ x: 0, y: 0 });
        const [selectedFolder, setSelectedFolder] = useState('This PC');
        const [navigationHistory, setNavigationHistory] = useState(['This PC']);
        const [currentHistoryIndex, setCurrentHistoryIndex] = useState(0);
        const [selectedItem, setSelectedItem] = useState(null);
        const [sortBy, setSortBy] = useState('name');
        const [sortOrder, setSortOrder] = useState('asc');
        const [viewSize, setViewSize] = useState('medium-icons');
        const [showSortMenu, setShowSortMenu] = useState(false);
        const [showViewMenu, setShowViewMenu] = useState(false);

        useEffect(() => {
            if (isMaximized) {
                setPosition({ x: 0, y: 0 });
            }
        }, [isMaximized]);

        const sidebarItems = [
        ];

        const defaultFolders = [
            { icon: 'Documents', name: 'Documents', pinned: true },
            { icon: 'Downloads', name: 'Downloads', pinned: true },
            { icon: 'Pictures', name: 'Pictures', pinned: true },
            { icon: 'Music', name: 'Music', pinned: true },
            { icon: 'Videos', name: 'Videos', pinned: true },
        ];

        // File data for different folders
        const fileData = {
            'This PC': [
                { type: 'folder', name: 'Documents', icon: '📄', fileType: 'Documents' },
                { type: 'folder', name: 'Downloads', icon: '⬇️', fileType: 'Downloads' },
                { type: 'folder', name: 'Pictures', icon: '🖼️', fileType: 'Pictures' },
                { type: 'folder', name: 'Music', icon: '🎵', fileType: 'Music' },
                { type: 'folder', name: 'Videos', icon: '🎬', fileType: 'Videos' },
            ],
            'Documents': [
                { type: 'folder', name: 'Projects', icon: '📁' },
                { type: 'folder', name: 'CSS Practices', icon: '📁' },
                { type: 'file', name: 'Resume.pdf', icon: '📄', fileType: 'PDF' },
                { type: 'file', name: 'Portfolio.docx', icon: '📝', fileType: 'Word' },
                { type: 'file', name: 'Cover Letter.docx', icon: '📝', fileType: 'Word' },
            ],
            'Projects': [
                { type: 'file', name: 'Butterfly Portfolio', icon: '📄', fileType: 'WebLink', url: 'https://nihap.io/' },
                { type: 'file', name: 'Digitallink', icon: '📄', fileType: 'WebLink', url: 'https://digitallink.ae/' },
                { type: 'file', name: 'TempMailHub', icon: '📄', fileType: 'WebLink', url: 'https://tempmailhub.org/' },
                { type: 'file', name: 'Dahua Dubai', icon: '📄', fileType: 'WebLink', url: 'https://dahua-dubai.com/' },
            ],
            'CSS Practices': [
                { type: 'file', name: 'Table Fan', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: '3D CPU', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: 'Mouse Compass', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: 'Multi Switch Bulb', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: 'Name With Snow', icon: '📄', fileType: 'Edge' },                
                { type: 'file', name: 'Circle Task', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: 'Mouse Tracking Eye', icon: '📄', fileType: 'Edge' },
                { type: 'file', name: 'Premium Calculator', icon: '📄', fileType: 'Edge' },               
            ],
            'Downloads': [
                { type: 'file', name: 'virus.exe', icon: '⚙️', fileType: 'Virus' },
                { type: 'file', name: 'background.png', icon: '🖼️', fileType: 'Image' },
                { type: 'file', name: 'profile.png', icon: '🖼️', fileType: 'Image' },
                { type: 'file', name: 'secret_files.zip', icon: '📦', fileType: 'Archive' },
            ],
            'Pictures': [
                { type: 'folder', name: 'Screenshots', icon: '📁' },
                { type: 'folder', name: 'Portfolio Images', icon: '📁' },
                { type: 'file', name: 'background.png', icon: '🖼️', fileType: 'Image' },
            ],
            'Screenshots': [
                { type: 'file', name: 'screenshot1.png', icon: '🖼️', fileType: 'Image' },
                { type: 'file', name: 'screenshot2.png', icon: '🖼️', fileType: 'Image' },
            ],
            'Portfolio Images': [
                { type: 'file', name: 'hero-image.jpg', icon: '🖼️', fileType: 'Image' },
                { type: 'file', name: 'logo.svg', icon: '🖼️', fileType: 'Image' },
            ],
            'Music': [
                { type: 'file', name: 'Song1.mp3', icon: '🎵', fileType: 'Audio' },
                { type: 'file', name: 'Song2.mp3', icon: '🎵', fileType: 'Audio' },
            ],
            'Videos': [
                { type: 'file', name: 'How_to_make_div_center.mp4', icon: '🎬', fileType: 'Video' },
                { type: 'file', name: 'Tutorial.mp4', icon: '🎬', fileType: 'Video' },
            ],
        };

        // Folder hierarchy mapping (child -> parent)
        const folderHierarchy = {
            'Documents': 'This PC',
            'Downloads': 'This PC',
            'Pictures': 'This PC',
            'Music': 'This PC',
            'Videos': 'This PC',
            'Projects': 'Documents',
            'CSS Practices': 'Documents',
            'Screenshots': 'Pictures',
            'Portfolio Images': 'Pictures'
        };

        const handleFolderClick = (folderName) => {
            setSelectedFolder(folderName);
        setSelectedItem(null);
            newHistory.push(folderName);
            setNavigationHistory(newHistory);
            setCurrentHistoryIndex(newHistory.length - 1);
        };

        const handleBack = () => {
            if (currentHistoryIndex > 0) {
                const newIndex = currentHistoryIndex - 1;
                setCurrentHistoryIndex(newIndex);
                setSelectedFolder(navigationHistory[newIndex]);
            }
        };

        const handleForward = () => {
            if (currentHistoryIndex < navigationHistory.length - 1) {
                const newIndex = currentHistoryIndex + 1;
                setCurrentHistoryIndex(newIndex);
                setSelectedFolder(navigationHistory[newIndex]);
            }
        };

        const handleUp = () => {
            const parentFolder = folderHierarchy[selectedFolder];
            if (parentFolder) {
                handleFolderClick(parentFolder);
            }
        };

        // Build breadcrumb path
        const getBreadcrumbPath = () => {
            const path = [selectedFolder];
            let current = selectedFolder;
            while (folderHierarchy[current]) {
                current = folderHierarchy[current];
                path.unshift(current);
            }
            return path;
        };

        const breadcrumbPath = getBreadcrumbPath();

        const handleSort = (criteria) => {
            if (sortBy === criteria) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortBy(criteria);
                setSortOrder('asc');
            }
            setShowSortMenu(false);
        };

        const handleViewChange = (size) => {
            setViewSize(size);
            setShowViewMenu(false);
        };

        const sortFiles = (files) => {
            const sorted = [...files].sort((a, b) => {
                let compareValue = 0;
                
                if (sortBy === 'name') {
                    compareValue = a.name.localeCompare(b.name);
                } else if (sortBy === 'type') {
                    const typeA = a.type === 'folder' ? 'folder' : (a.fileType || 'file');
                    const typeB = b.type === 'folder' ? 'folder' : (b.fileType || 'file');
                    compareValue = typeA.localeCompare(typeB);
                }
                
                return sortOrder === 'asc' ? compareValue : -compareValue;
            });
            
            // Always keep folders first
            const folders = sorted.filter(item => item.type === 'folder');
            const fileItems = sorted.filter(item => item.type === 'file');
            return [...folders, ...fileItems];
        };

        const currentFiles = sortFiles(fileData[selectedFolder] || []);

        const getGridCols = () => {
            switch(viewSize) {
                case 'small-icons': return 'grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12';
                case 'medium-icons': return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8';
                case 'large-icons': return 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
                case 'extra-large-icons': return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
                case 'list': return 'grid-cols-1';
                case 'details': return 'grid-cols-1';
                case 'tiles': return 'grid-cols-4 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3';
                case 'content': return 'grid-cols-1';
                default: return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8';
            }
        };

        const getIconSize = () => {
            switch(viewSize) {
                case 'small-icons': return 'w-10 h-10';
                case 'medium-icons': return 'w-16 h-16';
                case 'large-icons': return 'w-20 h-20';
                case 'extra-large-icons': return 'w-24 h-24';
                case 'list': return 'w-4 h-4';
                case 'details': return 'w-5 h-5';
                case 'tiles': return 'w-12 h-12';
                case 'content': return 'w-8 h-8';
                default: return 'w-16 h-16';
            }
        };

    return (
        <Draggable
            handle=".edge-drag-handle"
            bounds="parent"
            disabled={isMaximized}
            position={isMaximized ? { x: 0, y: 0 } : null}
            nodeRef={nodeRef}
            onStop={(e, data) => {
                setPosition({ x: data.x, y: data.y });
            }}
        >
            <div
                className={`bg-[#1e1e1e] ${isMaximized ? 'w-full h-[calc(100vh-3rem)]' : 'w-[900px] h-[600px]'} fixed top-0 left-0 z-50 text-white`}
                style={{ transition: 'width 0.3s, height 0.3s' }}
                ref={nodeRef}
            >
                {/* Title Bar */}
                <div className="absolute top-0 w-full h-9 flex justify-between bg-[#1c1c1c] edge-drag-handle">
                    <div className="flex items-center gap-3 pl-4">
                        <img src='/src/assets/icons/folder.svg' className='w-4 h-4' />
                        <span className="text-[13px] text-white">This PC</span>
                        <FiX className="cursor-pointer hover:bg-[#3f3f3f] p-1 w-7 h-7 rounded text-white" />
                        <FiPlus className="cursor-pointer hover:bg-[#3f3f3f] p-1 w-7 h-7 rounded text-white" />
                    </div>
                    <div className="flex items-center">
                        <Minimize onClose={onClose} />
                        <Restore onRestore={onRestore} />
                        <Close onClose={onClose} />
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="absolute top-9 w-full h-11 flex items-center gap-2 bg-[#2b2b2b] px-3">
                    <FiArrowLeft 
                        onClick={handleBack}
                        className={`p-2 w-8 h-8 rounded ${currentHistoryIndex > 0 ? 'hover:bg-[#3d3d3d] cursor-pointer text-white' : 'text-gray-600 cursor-not-allowed'}`} 
                    />
                    <FiArrowRight 
                        onClick={handleForward}
                        className={`p-2 w-8 h-8 rounded ${currentHistoryIndex < navigationHistory.length - 1 ? 'hover:bg-[#3d3d3d] cursor-pointer text-white' : 'text-gray-600 cursor-not-allowed'}`}
                    />
                    <FiArrowUp 
                        onClick={handleUp}
                        className={`p-2 w-8 h-8 rounded ${folderHierarchy[selectedFolder] ? 'hover:bg-[#3d3d3d] cursor-pointer text-white' : 'text-gray-600 cursor-not-allowed'}`}
                    />
                    <FiRefreshCw className='hover:bg-[#3d3d3d] p-2 w-8 h-8 rounded cursor-pointer text-white' />
                    
                    {/* Dropdown/Separator */}
                    <button className="hover:bg-[#3d3d3d] p-2 w-8 h-8 rounded cursor-pointer flex items-center justify-center">
                        <div className="w-[1px] h-4 bg-gray-600"></div>
                        <FiChevronDown className="w-3 h-3 text-white ml-1" />
                    </button>
                    
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-1 flex-1 text-[13px] ml-1">
                        {breadcrumbPath.map((folder, index) => (
                            <React.Fragment key={folder}>
                                <span 
                                    onClick={() => handleFolderClick(folder)}
                                    className="hover:bg-[#3d3d3d] px-3 py-1.5 rounded cursor-pointer text-white"
                                >
                                    {folder}
                                </span>
                                {index < breadcrumbPath.length - 1 && (
                                    <FiChevronRight className="text-gray-500 w-4 h-4" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder={`Search ${selectedFolder}`}
                            className="bg-[#3d3d3d] pl-3 pr-10 py-1.5 rounded text-[13px] w-72 border-none outline-none text-white placeholder-gray-400"
                        />
                        <div className="absolute right-2 w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-[#4d4d4d] rounded">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Toolbar */}
                <div className="absolute top-20 w-full h-12 flex items-center gap-4 bg-[#2b2b2b] border-t border-[#3d3d3d] px-3">
                    <button className="bg-transparent border-none flex items-center gap-1 hover:bg-[#3f3f3f] px-3 py-1.5 rounded text-sm">
                        <FiPlus className="w-4 h-4" />
                        New
                        <FiChevronDown className="w-3 h-3" />
                    </button>
                    <div className="w-px h-6 bg-[#3f3f3f]"></div>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Cut">
                        <FileManagerIcon name={"file-cut"} size="w-4 h-4"  />
                    </button>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Copy">
                        <FileManagerIcon name={"file-copy"} size="w-4 h-4"  />
                    </button>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Paste">
                        <FileManagerIcon name={"file-paste"} size="w-4 h-4"  />
                    </button>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Rename">
                        <FileManagerIcon name={"file-rename"} size="w-4 h-4" />
                    </button>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Share">
                        <FileManagerIcon name={"file-share"} size="w-4 h-4" />
                    </button>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded" title="Delete">
                        <FileManagerIcon name={"file-recycle"} size="w-4 h-4" />
                    </button>
                    <div className="w-px h-6 bg-[#3f3f3f]"></div>
                    <div className="relative">
                        <button 
                            onClick={() => setShowSortMenu(!showSortMenu)}
                            className="bg-transparent border-none flex items-center gap-1 hover:bg-[#3f3f3f] px-3 py-1.5 rounded text-sm"
                        >
                            <FileManagerIcon name={"file-sort"} size="w-4 h-4" />
                            Sort
                            <FiChevronDown className="w-3 h-3" />
                        </button>
                        {showSortMenu && (
                            <div className="absolute top-full mt-1 bg-[#2b2b2b] bg-opacity-90 backdrop-blur-sm border border-[#3f3f3f] rounded shadow-lg py-1 z-50 min-w-[150px]">
                                <button 
                                    onClick={() => handleSort('name')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center justify-between"
                                >
                                    Name
                                    {sortBy === 'name' && <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                                </button>
                                <button 
                                    onClick={() => handleSort('type')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center justify-between"
                                >
                                    Type
                                    {sortBy === 'type' && <span className="text-blue-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        <button 
                            onClick={() => setShowViewMenu(!showViewMenu)}
                            className="bg-transparent border-none flex items-center gap-1 hover:bg-[#3f3f3f] px-3 py-1.5 rounded text-sm"
                        >
                            <HiOutlineViewGrid className="w-4 h-4" />
                            View
                            <FiChevronDown className="w-3 h-3" />
                        </button>
                        {showViewMenu && (
                            <div className="absolute top-full bg-opacity-90 backdrop-blur-sm mt-1 bg-[#2b2b2b] border border-[#3f3f3f] rounded shadow-lg py-1 z-50 min-w-[180px]">
                                <button 
                                    onClick={() => handleViewChange('extra-large-icons')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <HiOutlineViewGrid className="w-4 h-4" />
                                    <span className="flex-1">Extra large icons</span>
                                    {viewSize === 'extra-large-icons' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('large-icons')}
                                    className="bg-transparent hover:bg-opacity-50 border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <HiOutlineViewGrid className="w-4 h-4" />
                                    <span className="flex-1">Large icons</span>
                                    {viewSize === 'large-icons' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('medium-icons')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <HiOutlineViewGrid className="w-4 h-4" />
                                    <span className="flex-1">Medium icons</span>
                                    {viewSize === 'medium-icons' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('small-icons')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <HiOutlineViewGrid className="w-3 h-3" />
                                    <span className="flex-1">Small icons</span>
                                    {viewSize === 'small-icons' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <div className="h-px bg-[#3f3f3f] my-1"></div>
                                <button 
                                    onClick={() => handleViewChange('list')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                        <rect x="0" y="2" width="16" height="2"/>
                                        <rect x="0" y="7" width="16" height="2"/>
                                        <rect x="0" y="12" width="16" height="2"/>
                                    </svg>
                                    <span className="flex-1">List</span>
                                    {viewSize === 'list' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('details')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                        <rect x="0" y="1" width="3" height="2"/>
                                        <rect x="4" y="1" width="12" height="2"/>
                                        <rect x="0" y="5" width="3" height="2"/>
                                        <rect x="4" y="5" width="12" height="2"/>
                                        <rect x="0" y="9" width="3" height="2"/>
                                        <rect x="4" y="9" width="12" height="2"/>
                                        <rect x="0" y="13" width="3" height="2"/>
                                        <rect x="4" y="13" width="12" height="2"/>
                                    </svg>
                                    <span className="flex-1">Details</span>
                                    {viewSize === 'details' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('tiles')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                        <rect x="0" y="0" width="7" height="4"/>
                                        <rect x="9" y="0" width="7" height="1"/>
                                        <rect x="9" y="2" width="7" height="1"/>
                                        <rect x="0" y="6" width="7" height="4"/>
                                        <rect x="9" y="6" width="7" height="1"/>
                                        <rect x="9" y="8" width="7" height="1"/>
                                        <rect x="0" y="12" width="7" height="4"/>
                                        <rect x="9" y="12" width="7" height="1"/>
                                        <rect x="9" y="14" width="7" height="1"/>
                                    </svg>
                                    <span className="flex-1">Tiles</span>
                                    {viewSize === 'tiles' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                                <button 
                                    onClick={() => handleViewChange('content')}
                                    className="hover:bg-opacity-50 bg-transparent border-none w-full text-left px-4 py-2 hover:bg-[#3f3f3f] text-sm flex items-center gap-3"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor">
                                        <rect x="0" y="0" width="5" height="5"/>
                                        <rect x="6" y="0" width="10" height="1"/>
                                        <rect x="6" y="2" width="10" height="1"/>
                                        <rect x="6" y="4" width="6" height="1"/>
                                        <rect x="0" y="7" width="5" height="5"/>
                                        <rect x="6" y="7" width="10" height="1"/>
                                        <rect x="6" y="9" width="10" height="1"/>
                                        <rect x="6" y="11" width="6" height="1"/>
                                    </svg>
                                    <span className="flex-1">Content</span>
                                    {viewSize === 'content' && <span className="text-blue-400 text-lg">•</span>}
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="bg-transparent border-none hover:bg-[#3f3f3f] p-2 rounded">
                        <FiMoreHorizontal className="w-4 h-4" />
                    </button>
                    <div className="flex-1"></div>
                  
                </div>

                {/* Main Content Area */}
                <div className="absolute top-[8rem] left-0 w-full h-[calc(100%-8rem)] flex">
                    {/* Sidebar */}
                    <div className="w-52 bg-[#1e1e1e] border-r border-[#3f3f3f] overflow-y-auto">
                        {/* Top Items */}
                        {sidebarItems.map((item, index) => (
                            <div 
                                key={index} 
                                onClick={() => handleFolderClick(item.name)}
                                className={`flex items-center gap-2 px-3 py-1.5 hover:bg-[#2c2c2c] cursor-pointer text-sm ${selectedFolder === item.name ? 'bg-[#2c2c2c] border-l-2 border-blue-500' : ''}`}
                            >
                                {item.expandable && <FiChevronRight className="w-3 h-3" />}
                                <span className="w-4 h-4">{item.icon}</span>
                                <span className="flex-1">{item.name}</span>
                            </div>
                        ))}

                        <div className="mt-4">
                        
                            <div 
                                onClick={() => handleFolderClick('This PC')}
                                className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm ${selectedFolder === 'This PC' ? 'bg-[#2c2c2c] border-l-2 border-blue-500' : 'hover:bg-[#2c2c2c]'}`}
                            >
                                <FileManagerIcon name="This PC" size="w-6 h-6" extension=".png" />
                                <span className="flex-1">This PC</span>
                            </div>
                        </div>

                        {/* Default Folders */}
                        <div className="mt-2">
                            {defaultFolders.map((folder, index) => (
                                <div 
                                    key={index} 
                                    onClick={() => handleFolderClick(folder.name)}
                                    className={`flex items-center gap-2 px-3 py-1.5 cursor-pointer text-sm ${selectedFolder === folder.name ? 'bg-[#2c2c2c] border-l-2 border-blue-500' : 'hover:bg-[#2c2c2c]'}`}
                                >
                                    <FileManagerIcon name={folder.icon} size="w-6 h-6" extension=".png" />
                                    <span className="flex-1 text-xs">{folder.name}</span>
                                    {folder.pinned && <BsPinAngle className="w-3 h-3 text-gray-500" />}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 bg-[#1e1e1e] overflow-y-auto p-4" onClick={(e) => { 
                        if (e.target === e.currentTarget) {
                            setSelectedItem(null);
                        }
                        setShowSortMenu(false); 
                        setShowViewMenu(false); 
                    }}>
                        {/* Grid of files and folders */}
                        <div className={`${viewSize.includes('icons') ? 'grid' : 'flex flex-col'} ${getGridCols()} ${viewSize.includes('icons') ? 'gap-4' : 'gap-0'}`}>
                            {currentFiles.map((item, index) => (
                                <div 
                                    key={index}
                                    className={`
                                        ${viewSize.includes('icons') ? 'flex flex-col items-center justify-center p-3 rounded' : ''}
                                        ${viewSize === 'list' ? 'flex flex-row items-center gap-2 px-3 py-1 text-sm' : ''}
                                        ${viewSize === 'details' ? 'flex flex-row items-center gap-3 px-3 py-1 text-sm border-b border-[#2c2c2c]' : ''}
                                        ${viewSize === 'tiles' ? 'flex flex-row items-center gap-3 p-3 border border-[#2c2c2c] rounded' : ''}
                                        ${viewSize === 'content' ? 'flex flex-row items-start gap-3 p-3 border-b border-[#2c2c2c]' : ''}
                                        ${selectedItem === item.name ? 'bg-[#37373d] border border-[#ffffff]' : 'hover:bg-[#2c2c2c]'}
                                        cursor-pointer group transition-colors
                                    `}
                                    onDoubleClick={() => {
                                        if (item.type === 'folder')  {
                                            handleFolderClick(item.name);
                                        } else if (item.fileType === 'Virus') {
                                            activePopup === 'virus' ? closePopup() : openPopup('virus');
                                        } else if (item.fileType === 'WebLink' && item.url) {
                                            const width = window.screen.availWidth;
                                            const height = window.screen.availHeight;
                                            window.open(item.url, '_blank', `width=${width},height=${height},left=0,top=0,menubar=no,toolbar=no,location=yes,status=no,scrollbars=yes,resizable=yes`);
                                        }  else if (item.fileType === 'Edge') {
                                            activePopup === item.name ? closePopup() : openPopup(item.name);
                                        }
                                    }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedItem(item.name);
                                    }}
                                >
                                    {/* Icon */}
                                    <div className={`${getIconSize()} flex items-center justify-center ${viewSize.includes('icons') ? 'mb-2' : 'flex-shrink-0'}`}>
                                        {item.type === 'folder' && !item.fileType ? (
                                            <FileManagerIcon name={"Folder"} size={getIconSize()} />
                                        ) : (
                                            <div className="relative">
                                                {item.fileType === 'PDF' && (
                                                <FileManagerIcon name={"pdf"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Word' && (
                                                    <FileManagerIcon name={"Microsoft-Word"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Image' && (
                                                    <FileManagerIcon name={"image"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Audio' && (
                                                    <FileManagerIcon name={"audio"} size={getIconSize()} extension='.png' />
                                                )}
                                                {item.fileType === 'Video' && (
                                                    <FileManagerIcon name={"vlc"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Application' && (
                                                    <FileManagerIcon name={"exe"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Virus' && (
                                                    <FileManagerIcon name={"exe"} size={getIconSize()} />
                                                )}
                                                {item.fileType === 'Archive' && (
                                                    <FileManagerIcon name={"zip"} size={getIconSize()} extension='.png' />
                                                )}
                                                   {item.fileType === 'WebLink' && (
                                                    <FileManagerIcon name={"weblink"} size={getIconSize()} />
                                                )}
                                                   {item.fileType === 'Edge' && (
                                                    <FileManagerIcon name={"Microsoft-Edge"} size={getIconSize()} />
                                                )}
                                                 {item.fileType === 'Documents' && (
                                                    <FileManagerIcon name={"Documents"} size={getIconSize()} extension='.png' />
                                                )}
                                                    {item.fileType === 'Downloads' && (
                                                    <FileManagerIcon name={"Downloads"} size={getIconSize()} extension='.png' />
                                                )}
                                                    {item.fileType === 'Pictures' && (
                                                    <FileManagerIcon name={"Pictures"} size={getIconSize()} extension='.png' />
                                                )}
                                                    {item.fileType === 'Music' && (
                                                    <FileManagerIcon name={"Music"} size={getIconSize()} extension='.png' />
                                                )}
                                                    {item.fileType === 'Videos' && (
                                                    <FileManagerIcon name={"Videos"} size={getIconSize()} extension='.png' />
                                                )}

                                            </div>
                                        )}
                                    </div>
                                    {/* Name and details */}
                                    <div className="flex-1 min-w-0">
                                        <span className={`
                                            ${viewSize.includes('icons') ? 'text-xs text-center break-all line-clamp-2 w-full block' : ''}
                                            ${viewSize === 'list' ? 'text-sm truncate block' : ''}
                                            ${viewSize === 'details' ? 'text-sm truncate block' : ''}
                                            ${viewSize === 'tiles' ? 'text-sm font-medium block' : ''}
                                            ${viewSize === 'content' ? 'text-sm font-medium block' : ''}
                                            text-white
                                        `}>
                                            {item.name}
                                        </span>
                                        {(viewSize === 'details' || viewSize === 'content') && (
                                            <div className="text-xs text-gray-400 mt-1">
                                                {item.type === 'folder' ? 'File folder' : item.fileType || 'File'}
                                            </div>
                                        )}
                                    </div>
                                    {viewSize === 'details' && (
                                        <>
                                            <span className="text-xs text-gray-400 w-24 text-right flex-shrink-0">
                                                {item.type === 'folder' ? '--' : '1 KB'}
                                            </span>
                                            <span className="text-xs text-gray-400 w-32 text-right flex-shrink-0">
                                                12/24/2025
                                            </span>
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>
                        
                        {/* Empty state */}
                        {currentFiles.length === 0 && (
                            <div className="flex items-center justify-center h-full text-gray-500">
                                <p>This folder is empty</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Draggable>
    )
});

export default FileManager;