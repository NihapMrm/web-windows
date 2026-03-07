import { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';

const folderIcon = new URL('../assets/icons/Folder.svg', import.meta.url).href;
const fileIcon   = new URL('../assets/icons/TextFile.svg', import.meta.url).href;

const PADDING = 8;

const DesktopFile = ({ id, type, name, col, row, cellW, cellH, iconClass, isNew, onRename, onMove, canMove, onOpen }) => {
  const [editing, setEditing] = useState(!!isNew);
  const [label, setLabel] = useState(name);
  const [selected, setSelected] = useState(false);
  const [pos, setPos] = useState({ x: PADDING + col * cellW, y: PADDING + row * cellH });
  const storedCol = useRef(col);
  const storedRow = useRef(row);
  const inputRef = useRef(null);
  const nodeRef = useRef(null);

  useEffect(() => {
    if (isNew) setTimeout(() => inputRef.current?.select(), 50);
  }, []);

  // Sync position when col/row change from parent (sort / view-size change)
  useEffect(() => {
    storedCol.current = col;
    storedRow.current = row;
    setPos({ x: PADDING + col * cellW, y: PADDING + row * cellH });
  }, [col, row, cellW, cellH]);

  useEffect(() => { setLabel(name); }, [name]);

  const commitRename = () => {
    setEditing(false);
    onRename(id, label.trim() || name);
  };

  return (
    <Draggable
      nodeRef={nodeRef}
      position={pos}
      onDrag={(_, d) => setPos({ x: d.x, y: d.y })}
      onStop={(_, d) => {
        const newCol = Math.max(0, Math.round((d.x - PADDING) / cellW));
        const newRow = Math.max(0, Math.round((d.y - PADDING) / cellH));
        if (canMove(id, newCol, newRow)) {
          setPos({ x: PADDING + newCol * cellW, y: PADDING + newRow * cellH });
          onMove(id, newCol, newRow);
          storedCol.current = newCol;
          storedRow.current = newRow;
        } else {
          setPos({ x: PADDING + storedCol.current * cellW, y: PADDING + storedRow.current * cellH });
        }
      }}
      bounds="parent"
    >
      <div
        ref={nodeRef}
        style={{ position: 'absolute', top: 0, left: 0, width: cellW - 8 }}
        className="flex flex-col items-center gap-1 cursor-default select-none"
        onClick={(e) => { e.stopPropagation(); setSelected(true); }}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setSelected(false); }}
        onContextMenu={(e) => e.stopPropagation()}
        tabIndex={0}
      >
        <div
          className={`p-2 rounded-md w-full flex justify-center transition-colors ${selected ? 'bg-[#4a7eff40]' : 'hover:bg-[#ffffff10]'}`}
          onDoubleClick={() => {
            if (type === 'folder' && onOpen) {
              onOpen(name);
            } else {
              setEditing(true);
              setTimeout(() => inputRef.current?.select(), 50);
            }
          }}
        >
          <img src={type === 'folder' ? folderIcon : fileIcon} className={iconClass} alt="" />
        </div>
        {editing ? (
          <input
            ref={inputRef}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            onBlur={commitRename}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') { setLabel(name); setEditing(false); }
            }}
            className="bg-[#1c3a6e] text-white text-[11px] text-center w-full rounded px-1 outline-none border border-blue-400"
            autoFocus
          />
        ) : (
          <span className={`text-white text-[11px] text-center leading-tight px-1 rounded w-full break-words ${selected ? 'bg-[#4a7eff80]' : ''}`}>
            {label}
          </span>
        )}
      </div>
    </Draggable>
  );
};

export default DesktopFile;
