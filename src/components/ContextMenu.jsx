import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  FiGrid, FiRefreshCw, FiRotateCcw, FiPlusCircle,
  FiMonitor, FiEdit2, FiTerminal, FiCode, FiChevronRight,
  FiBarChart2, FiMoreHorizontal, FiCheck
} from 'react-icons/fi';

const folderIcon = new URL('../assets/icons/Folder.svg', import.meta.url).href;
const fileIcon   = new URL('../assets/icons/TextFile.svg', import.meta.url).href;

const SUB_CLS = 'fixed w-52 rounded-lg shadow-2xl backdrop-blur-[40px] backdrop-saturate-150 bg-[#1c1c1c82] border border-[#ffffff08] p-1 z-[10001]';
const ROW = 'w-full flex items-center gap-3 px-3 py-[7px] text-white text-sm hover:bg-[#ffffff15] transition-colors bg-transparent border-none rounded-md';
const DIV = 'mx-3 my-1 border-t border-[#ffffff15]';

// Renders submenu via portal so it sits outside any transformed ancestor
const SubMenu = ({ anchorRef, children }) => {
  const [pos, setPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (!anchorRef.current) return;
    const r = anchorRef.current.getBoundingClientRect();
    setPos({ top: r.top, left: r.right });
  }, [anchorRef]);

  return createPortal(
    <div className={SUB_CLS} style={{ top: pos.top, left: pos.left }}>{children}</div>,
    document.body
  );
};

const SubBtn = ({ onClick, checked, children }) => (
  <button onClick={onClick} className={ROW}>
    <span className="w-4 flex-shrink-0 flex items-center justify-center">
      {checked && <FiCheck className="w-3 h-3 text-[#60CDFF]" />}
    </span>
    {children}
  </button>
);

const ContextMenu = ({ x, y, onClose, onNew, onView, onSort, viewSize, sortBy, sortOrder }) => {
  const [hovered, setHovered] = useState(null);

  const viewRef = useRef(null);
  const sortRef = useRef(null);
  const newRef  = useRef(null);

  const MENU_WIDTH = 240;
  const MENU_HEIGHT = 420;
  const adjustedX = x + MENU_WIDTH > window.innerWidth  ? x - MENU_WIDTH : x;
  const adjustedY = y + MENU_HEIGHT > window.innerHeight ? y - MENU_HEIGHT : y;

  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.08 }}
      style={{ top: adjustedY, left: adjustedX }}
      className="fixed z-[9999] w-60 rounded-lg shadow-2xl backdrop-blur-[40px] backdrop-saturate-150 bg-[#1c1c1c82] border border-[#ffffff08] p-1"
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* View */}
      <div ref={viewRef} onMouseEnter={() => setHovered('view')} onMouseLeave={() => setHovered(null)}>
        <button className={ROW}>
          <FiGrid className="w-4 h-4 opacity-80 flex-shrink-0" />
          <span className="flex-1 text-left">View</span>
          <FiChevronRight className="w-3 h-3 text-gray-400" />
        </button>
        {hovered === 'view' && (
          <SubMenu anchorRef={viewRef}>
            <SubBtn checked={viewSize === 'large-icons'}  onClick={() => { onView?.('large-icons');  onClose(); }}>Large icons</SubBtn>
            <SubBtn checked={viewSize === 'medium-icons'} onClick={() => { onView?.('medium-icons'); onClose(); }}>Medium icons</SubBtn>
            <SubBtn checked={viewSize === 'small-icons'}  onClick={() => { onView?.('small-icons');  onClose(); }}>Small icons</SubBtn>
          </SubMenu>
        )}
      </div>

      {/* Sort by */}
      <div ref={sortRef} onMouseEnter={() => setHovered('sort')} onMouseLeave={() => setHovered(null)}>
        <button className={ROW}>
          <FiBarChart2 className="w-4 h-4 opacity-80 flex-shrink-0" />
          <span className="flex-1 text-left">Sort by</span>
          <FiChevronRight className="w-3 h-3 text-gray-400" />
        </button>
        {hovered === 'sort' && (
          <SubMenu anchorRef={sortRef}>
            <SubBtn checked={sortBy === 'name'} onClick={() => { onSort?.('name'); onClose(); }}>
              <span className="flex-1 text-left">Name</span>
              {sortBy === 'name' && <span className="text-xs text-gray-400 ml-auto">{sortOrder === 'asc' ? 'A→Z' : 'Z→A'}</span>}
            </SubBtn>
            <SubBtn checked={sortBy === 'type'} onClick={() => { onSort?.('type'); onClose(); }}>
              <span className="flex-1 text-left">Type</span>
              {sortBy === 'type' && <span className="text-xs text-gray-400 ml-auto">{sortOrder === 'asc' ? 'A→Z' : 'Z→A'}</span>}
            </SubBtn>
          </SubMenu>
        )}
      </div>

      {/* Refresh */}
      <button className={ROW} onMouseEnter={() => setHovered(null)} onClick={() => { window.location.reload(); onClose(); }}>
        <FiRefreshCw className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Refresh</span>
      </button>

      <div className={DIV} />

      {/* Undo Rename */}
      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiRotateCcw className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Undo Rename</span>
        <span className="text-xs text-gray-400">Ctrl+Z</span>
      </button>

      {/* New */}
      <div ref={newRef} onMouseEnter={() => setHovered('new')} onMouseLeave={() => setHovered(null)}>
        <button className={ROW}>
          <FiPlusCircle className="w-4 h-4 opacity-80 flex-shrink-0" />
          <span className="flex-1 text-left">New</span>
          <FiChevronRight className="w-3 h-3 text-gray-400" />
        </button>
        {hovered === 'new' && (
          <SubMenu anchorRef={newRef}>
            <button onClick={() => { onNew('folder'); onClose(); }} className={ROW}>
              <img src={folderIcon} className="w-4 h-4 flex-shrink-0" alt="" />
              <span>Folder</span>
            </button>
            <div className={DIV} />
            <button onClick={() => { onNew('file'); onClose(); }} className={ROW}>
              <img src={fileIcon} className="w-4 h-4 flex-shrink-0" alt="" />
              <span>Text Document</span>
            </button>
          </SubMenu>
        )}
      </div>

      <div className={DIV} />

      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiMonitor className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Display settings</span>
      </button>
      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiEdit2 className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Personalise</span>
      </button>

      <div className={DIV} />

      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiTerminal className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Open in Terminal</span>
      </button>
      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiCode className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Open with Code</span>
      </button>

      <div className={DIV} />

      <button className={ROW} onMouseEnter={() => setHovered(null)}>
        <FiMoreHorizontal className="w-4 h-4 opacity-80 flex-shrink-0" />
        <span className="flex-1 text-left">Show more options</span>
      </button>
    </motion.div>
  );
};

export default ContextMenu;
