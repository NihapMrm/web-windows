import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPower } from 'react-icons/fi';
import Icon from '../icon';

const AppsModel = ({ onClose, openPopup, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const pinnedApps = [
    { name: 'linkedin', label: 'LinkedIn', link: 'https://www.linkedin.com/in/nihapmrm' },
    { name: 'github', label: 'GitHub', link: 'https://github.com/NihapMrm' },
    { name: 'youtube', label: 'YouTube', link: 'https://www.youtube.com' },
    { name: 'codepen', label: 'CodePen', link: 'https://codepen.io' },
    { name: 'geeksforgeeks', label: 'GeeksforGeeks', link: 'https://www.geeksforgeeks.org' },
    { name: 'leetcode', label: 'LeetCode', link: 'https://leetcode.com' },
    { name: 'stackoverflow', label: 'Stack Overflow', link: 'https://stackoverflow.com' },
    { name: 'chatgpt', label: 'ChatGPT', link: 'https://chat.openai.com' },
    { name: 'Skills', label: 'Skills', extension: '.png', size: 'w-14 h-14', model: 'skills' },
    { name: 'Experience', label: 'Experience', extension: '.png', size: 'w-14 h-14', model: 'experience' },
    { name: 'projects', label: 'Projects', model: 'projects' },
    { name: 'Education', label: 'Education', extension: '.png', size: 'w-14 h-14', model: 'education' },
    { name: 'Contact', label: 'Contact', extension: '.png', size: 'w-14 h-14', model: 'contact' },
    {name: 'Portfolio', label: 'Portfolio', link: 'https://nihap.io/'},
    {name: 'pdf', label: 'Resume', link: '/src/assets/Nihap_Mrm_Resume.pdf' },
  ];

  const handleAppClick = (app) => {
    if (app.link) {
      window.open(app.link, '_blank');
    } else if (app.model) {
      openPopup(app.model);
    }
  };

  // Filter apps based on search query
  const filteredApps = pinnedApps.filter(app => 
    app.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
        <div className="w-[660px] fixed bottom-14 left-1/2 transform -translate-x-1/2">
        <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="flex justify-between flex-col h-[720px] rounded-lg shadow-2xl z-50 backdrop-blur-[40px] backdrop-saturate-150 bg-[#1c1c1c82] overflow-hidden border border-[#ffffff08]"
            >
        {/* Search Bar */}
        <div>
        <div className="p-6 pb-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#60CDFF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search for apps, settings, and documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white bg-opacity-10 border border-white border-opacity-10 w-full pl-11 pr-4 py-2.5 rounded-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#60CDFF]"
            />
          </div>
        </div>

        {/* Pinned Section */}
        <div className="px-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-semibold">
              {searchQuery ? `Search Results (${filteredApps.length})` : 'Pinned'}
            </h3>
            {!searchQuery && (
              <button className="text-white text-sm flex items-center gap-1 hover:bg-[#ffffff15] px-2 py-1 rounded">
                All
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-5 gap-4">
            {filteredApps.length > 0 ? (
              filteredApps.map((app, index) => (
                <div 
                  key={index} 
                  onClick={() => handleAppClick(app)}
                  className="flex flex-col justify-between items-center gap-2 p-2 hover:bg-[#ffffff10] rounded-md cursor-pointer transition-colors"
                >
                  <Icon name={app.name} size={app.size || "w-12 h-12"} extension={app.extension || '.svg'} />
                  <span className="text-white text-xs text-center leading-tight whitespace-pre-line">{app.label}</span>
                </div>
              ))
            ) : (
              <div className="col-span-5 text-center py-8">
                <p className="text-gray-400 text-sm">No apps found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </div>

      </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#ffffff15] flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer hover:bg-[#ffffff10] px-2 py-1.5 rounded-md transition-colors">
            <div className="w-8 h-8 rounded-full overflow-hidden border-none">
  <img src="/src/images/Profile.webp" alt="Nihap Mrm" className="w-full h-full object-cover" />
</div>
            <span className="text-white text-sm">Nihap Mrm</span>
          </div>
          
          <button onClick={onLogout} className="hover:bg-[#ffffff10] p-2 rounded-md transition-colors bg-transparent border-none" title="Sign out">
            <FiPower className="w-5 h-5 text-white" />
          </button>
        </div>
      </motion.div></div>
    </AnimatePresence>
  );
};

export default AppsModel;
