import React, { forwardRef, useState } from 'react'
import Edge from '../edge';
import FileManager from '../FileManager';
import CssPracticeModel from './CssPracticeModel';
import VirusModel from './VirusModel';

const ProjectsModel = forwardRef(({ onClose, desktopItems, initialFolder, onOpenNotepad, onRenameDesktopItem }, ref) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const [activePopup, setActivePopup] = useState(null);
  const handleRestore = () => setIsMaximized(prev => !prev);
  const openPopup = (popupName) => setActivePopup(popupName);
  const closePopup = () => setActivePopup(null);
    const content = (
        <section className="" id="projects">
        </section>
      );
      
    return(
        <>
        <FileManager ref={ref} slug={"projects"} content={content} onClose={onClose} isMaximized={isMaximized} onRestore={handleRestore} activePopup={activePopup} openPopup={openPopup} closePopup={closePopup} desktopItems={desktopItems} initialFolder={initialFolder} onOpenNotepad={onOpenNotepad} onRenameDesktopItem={onRenameDesktopItem} />
        {activePopup === 'virus' && <VirusModel onClose={closePopup} />}
        {activePopup && activePopup !== 'virus' && <CssPracticeModel onClose={closePopup} practiceName={activePopup} />}
        </>
    )
});

export default ProjectsModel;