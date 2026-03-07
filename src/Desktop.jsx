import './css/Desktop.css';
import Taskbar from './sections/Taskbar';
import { useState, useRef } from 'react';
import AppsModel from './components/models/AppsModel';
import ContextMenu from './components/ContextMenu';
import DesktopFile from './components/DesktopFile';
import { AnimatePresence } from 'framer-motion';

const GRID_PADDING = 8;
const TASKBAR_H = 48;
const VIEW_SIZES = {
  'large-icons':  { cellW: 100, cellH: 112, iconClass: 'w-14 h-14' },
  'medium-icons': { cellW: 88,  cellH: 100, iconClass: 'w-10 h-10' },
  'small-icons':  { cellW: 72,  cellH: 86,  iconClass: 'w-8 h-8'  },
};

const Desktop = ({ onLogout }) => {
    const [activePopup, setActivePopup] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [desktopItems, setDesktopItems] = useState([]);
    const [viewSize, setViewSize] = useState('medium-icons');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [projectsFolder, setProjectsFolder] = useState('Desktop');
    const projectsRef = useRef(null);

    const { cellW, cellH, iconClass } = VIEW_SIZES[viewSize];
    const maxRows = Math.floor((window.innerHeight - TASKBAR_H - GRID_PADDING * 2) / cellH);
    const maxCols = Math.floor((window.innerWidth - GRID_PADDING * 2) / cellW);

    const openPopup = (id) => setActivePopup(id);
    const closePopup = () => setActivePopup(null);

    const handleContextMenu = (e) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const closeContextMenu = () => setContextMenu(null);

    const findEmptyCell = (prefCol, prefRow, items) => {
        if (!items.find(i => i.col === prefCol && i.row === prefRow)) return { col: prefCol, row: prefRow };
        for (let c = 0; c < maxCols; c++)
            for (let r = 0; r < maxRows; r++)
                if (!items.find(i => i.col === c && i.row === r)) return { col: c, row: r };
        return { col: 0, row: 0 };
    };

    const handleNew = (type) => {
        const base = type === 'folder' ? 'New Folder' : 'New Text Document';
        const existing = desktopItems.filter(i => i.type === type).map(i => i.name);
        let name = base;
        let count = 2;
        while (existing.includes(name)) name = `${base} (${count++})`;
        const prefCol = Math.max(0, Math.min(maxCols - 1, Math.round((contextMenu.x - GRID_PADDING) / cellW)));
        const prefRow = Math.max(0, Math.min(maxRows - 1, Math.round((contextMenu.y - GRID_PADDING) / cellH)));
        const { col, row } = findEmptyCell(prefCol, prefRow, desktopItems);
        setDesktopItems(prev => [...prev, { id: Date.now(), type, name, col, row, isNew: true }]);
    };

    const canMove = (id, col, row) => !desktopItems.find(i => i.id !== id && i.col === col && i.row === row);

    const handleMove = (id, col, row) => {
        setDesktopItems(prev => prev.map(i => i.id === id ? { ...i, col, row } : i));
    };

    const handleRename = (id, newName) => {
        setDesktopItems(prev => prev.map(i => i.id === id ? { ...i, name: newName, isNew: false } : i));
    };

    const handleSort = (by) => {
        const newOrder = by === sortBy ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
        setSortBy(by);
        setSortOrder(newOrder);
        setDesktopItems(prev => {
            const sorted = [...prev].sort((a, b) => {
                let cmp = 0;
                if (by === 'name') cmp = a.name.localeCompare(b.name);
                else if (by === 'type') cmp = a.type.localeCompare(b.type);
                return newOrder === 'asc' ? cmp : -cmp;
            });
            return sorted.map((item, idx) => ({
                ...item,
                col: Math.floor(idx / maxRows),
                row: idx % maxRows,
                isNew: false,
            }));
        });
    };

    const handleView = (size) => setViewSize(size);

    const handleOpenFolder = (folderName) => {
        if (activePopup === 'projects' && projectsRef.current) {
            projectsRef.current.navigate(folderName);
        } else {
            setProjectsFolder(folderName);
            openPopup('projects');
        }
    };

    return (
       <div className="h-screen desktopContainer relative" onContextMenu={handleContextMenu} onClick={closeContextMenu}>
            <Taskbar
                activePopup={activePopup}
                openPopup={openPopup}
                closePopup={closePopup}
                desktopItems={desktopItems}
                projectsRef={projectsRef}
                projectsFolder={projectsFolder}
            />
            {desktopItems.map(item => (
                <DesktopFile
                    key={item.id}
                    {...item}
                    cellW={cellW}
                    cellH={cellH}
                    iconClass={iconClass}
                    onRename={handleRename}
                    onMove={handleMove}
                    canMove={canMove}
                    onOpen={handleOpenFolder}
                />
            ))}
            <AnimatePresence>
                {contextMenu && (
                    <ContextMenu
                        key="ctx"
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={closeContextMenu}
                        onNew={handleNew}
                        onView={handleView}
                        onSort={handleSort}
                        viewSize={viewSize}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                    />
                )}
            </AnimatePresence>
            <div onContextMenu={(e) => e.stopPropagation()}>
                <AnimatePresence>
                    {activePopup === 'apps' && <AppsModel onClose={closePopup} openPopup={openPopup} onLogout={onLogout} />}
                </AnimatePresence>
            </div>
       </div>
    );
};

export default Desktop;