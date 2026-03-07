import React, { useState } from 'react'
import Edge from '../edge';
import '../../css/Model.css';

const cssPractices = [
  {
    name: 'Table Fan',
    slug: 'table-fan',
    title: 'Table Fan With Switches Using HTML,CSS,JS',
    src: 'https://codepen.io/nihap/embed/WNVNGzz?default-tab=html%2Cresult',
    height: '900'
  },
  {
    name: '3D CPU',
    slug: '3d-cpu',
    title: '3D System Unit Model Using Pure CSS (without images)',
    src: 'https://codepen.io/nihap/embed/jOgOMYx?default-tab=html%2Cresult',
    height: '700'
  },
  {
    name: 'Mouse Compass',
    slug: 'mouse-compass',
    title: 'Mouse Tracking Compass with Glowing Particles',
    src: 'https://codepen.io/nihap/embed/BaXaLwd?default-tab=html%2Cresult',
    height: '700'
  },
  {
    name: 'Multi Switch Bulb',
    slug: 'multi-switch-bulb',
    title: 'Advanced Multi Switch Bulb HTML,CSS,JS',
    src: 'https://codepen.io/nihap/embed/vYoYXgL?default-tab=result',
    height: '800'
  },  {
    name: 'Name With Snow',
    slug: 'name-with-snow',
    title: 'Name With Snow Effect',
    src: 'https://codepen.io/nihap/embed/mdNdrGW?default-tab=result&editable=true',
    height: '700'
  },
  {
    name: 'Circle Task',
    slug: 'circle-task',
    title: 'Circle Task CSS',
    src: 'https://codepen.io/nihap/embed/mdNdrMr?default-tab=html%2Cresult',
    height: '700'
  },
  {
    name: 'Mouse Tracking Eye',
    slug: 'mouse-tracking-eye',
    title: 'Mouse Tracking Eye Using JS',
    src: 'https://codepen.io/nihap/embed/ZEgEpyq?default-tab=html%2Cresult',
    height: '700'
  },
  {
    name: 'Premium Calculator',
    slug: 'premium-calculator',
    title: 'Premium Calculator Using HTML,CSS,JS',
    src: 'https://codepen.io/nihap/embed/MWNWjpB?default-tab=html%2Cresult',
    height: '700'
  },
];

const CssPracticeModel = ({ onClose, practiceName = 'Table Fan' }) => {
  const [isMaximized, setIsMaximized] = useState(true);
  const handleRestore = () => setIsMaximized(prev => !prev);

  // Find the practice by name
  const practice = cssPractices.find(p => p.name === practiceName) || cssPractices[0];

  const content = (
    <section
      id="contact"
      className={`min-h-screen bg-gradient-to-br from-[#e7f0ff] via-[#d8e7ff] to-[#eef4ff] ${isMaximized ? 'px-4 sm:px-6 lg:px-10 py-4' : 'px-3 py-6'}`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{practice.title}</h2>
      <iframe 
        height={practice.height} 
        style={{ width: '100%' }} 
        scrolling="no" 
        title={practice.title} 
        src={practice.src} 
        frameBorder="0" 
        loading="lazy" 
        allowTransparency="true"
      >
      </iframe>
    </section>
  );

  return (
    <Edge slug={practice.slug} content={content} onClose={onClose} isMaximized={isMaximized} onRestore={handleRestore} />
  )
}

export default CssPracticeModel;