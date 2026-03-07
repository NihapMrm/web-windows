import { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiGrid, FiRefreshCw, FiRotateCcw, FiPlusCircle,
  FiMonitor, FiEdit2, FiTerminal, FiCode, FiChevronRight,
  FiBarChart2, FiMoreHorizontal
} from 'react-icons/fi';

const menuGroups = [
  [
    { icon: FiGrid,         label: 'View',         hasArrow: true },
    { icon: FiBarChart2,   label: 'Sort by',      hasArrow: true },
    { icon: FiRefreshCw,    label: 'Refresh',      action: () => window.location.reload() },
  ],
  [
    { icon: FiRotateCcw,   label: 'Undo Rename',  shortcut: 'Ctrl+Z' },
    { icon: FiPlusCircle,  label: 'New',          hasArrow: true },
  ],
  [
    { icon: FiMonitor, label: 'Display settings' },
    { icon: FiEdit2,   label: 'Personalise' },
  ],
  [
    { icon: FiTerminal, label: 'Open in Terminal' },
    { icon: FiCode,     label: 'Open with Code' },
  ],
  [
    { icon: FiMoreHorizontal, label: 'Show more options' },
  ],
];

const ContextMenu = ({ x, y, onClose }) => {
  const MENU_WIDTH = 240;
  const MENU_HEIGHT = 380;
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
      className="fixed z-[9999] w-60 rounded-lg shadow-2xl backdrop-blur-[40px] backdrop-saturate-150 bg-[#1c1c1c82] border border-[#ffffff08] overflow-hidden p-1"
      onClick={(e) => e.stopPropagation()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {menuGroups.map((group, gi) => (
        <div key={gi}>
          {group.map((item, ii) => {
            const Icon = item.icon;
            return (
              <button
                key={ii}
                onClick={() => { item.action?.(); onClose(); }}
                className="w-full flex items-center gap-3 px-3 py-[7px] text-white text-sm hover:bg-[#ffffff15] transition-colors bg-transparent border-none"
              >
                <Icon className="w-4 h-4 opacity-80 flex-shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.shortcut && <span className="text-xs text-gray-400">{item.shortcut}</span>}
                {item.hasArrow && <FiChevronRight className="w-3 h-3 text-gray-400" />}
              </button>
            );
          })}
          {gi < menuGroups.length - 1 && (
            <div className="mx-3 my-1 border-t border-[#ffffff15]" />
          )}
        </div>
      ))}
    </motion.div>
  );
};

export default ContextMenu;
