import React, { forwardRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable'
import { FiArrowLeft, FiGlobe, FiLayers, FiLayout, FiMinimize2, FiMinus, FiMoreHorizontal, FiPlus, FiX } from "react-icons/fi";
import Close from './close';
import Minimize from './minimize';
import Restore from './restore';
import { PiFileDoc, PiListStar } from 'react-icons/pi';
import { MdOutlineRefresh } from 'react-icons/md';
import { AiOutlineExclamation, AiOutlineExclamationCircle } from 'react-icons/ai';

const Edge = forwardRef(({ slug, content, onClose, isMaximized, onRestore }, ref) => {
        const nodeRef = React.useRef(null); // 👈 use your own ref for Draggable
        const [position, setPosition] = useState({ x: 0, y: 0 });

        // Whenever maximized is true, reset position
        useEffect(() => {
            if (isMaximized) {
                setPosition({ x: 0, y: 0 });
            }
            // Trigger window resize event to update Tailwind responsive classes
            setTimeout(() => {
                window.dispatchEvent(new Event('resize'));
            }, 350); // Match transition duration
        }, [isMaximized]);

    return (
        <Draggable
            handle=".edge-drag-handle"
            bounds="parent"
            disabled={isMaximized}
            position={isMaximized ? { x: 0, y: 0 } : null} // 👈 controlled when maximized
            nodeRef={nodeRef}
            onStop={(e, data) => {
                setPosition({ x: data.x, y: data.y });
            }}
        >
            <div
                className={`bg-[#2e2e2e] ${isMaximized ? 'w-full h-[calc(100vh-3rem)]' : 'w-[600px] h-[500px]'} fixed top-0 left-0 z-50`}
                style={{ transition: 'width 0.3s, height 0.3s' }}
                ref={nodeRef}
            >
                <div className="absolute top-0 w-full h-10 flex justify-between edge-drag-handle">
                    <div className="items flex items-center">
                        <div className='w-24 500 h-full flex after:content-[""] after:w-4 after:h-4 after:bg-[#2e2e2e] after:bottom-0 after:right-0 after:absolute relative after:rounded-full z-50'>
                            <FiLayers className="bg-transparent flex w-10 h-9 group active:scale-100 p-[0.6rem] hover:bg-[#ffffff20] duration-300 rounded" />
                            <FiLayout className="bg-transparent flex w-10 h-9 group active:scale-100 p-[0.6rem] hover:bg-[#ffffff20] duration-300 rounded" />
                        </div>
                        <div className='flex items-center justify-between pl-5 pr-5 bg-[#3b3b3b] w-64 h-full rounded-tl-xl rounded-tr-xl after:content-[""] after:w-3 after:h-3 after:bg-[#3b3b3b] after:bottom-[-2px] after:left-[-0.5rem] after:absolute relative after:rounded-full before:content-[""] before:w-3 before:h-3 before:bg-[#3b3b3b] before:bottom-[-2px] before:right-[-0.5rem] before:absolute  before:rounded-full'>
                            <div className='flex items-center justify-center gap-2  '>
                                <FiGlobe />
                                Nihap Mrm
                            </div>
                            <FiX />
                        </div>
                        <div className='after:content-[""] after:w-4 after:h-4 after:bg-[#2e2e2e] after:bottom-0 after:left-0 after:absolute relative after:rounded-full z-50'>
                            <FiPlus className="bg-transparent flex w-10 h-9 group active:scale-100 p-[0.6rem] hover:bg-[#ffffff20] duration-300 rounded ml-4" />
                        </div>
                    </div>
                    <div className="actions w-1/4 flex justify-end items-center">
                        <Minimize onClose={onClose} />
                        <Restore onRestore={onRestore} />
                        <Close onClose={onClose} />
                    </div>
                </div>
                <div className="bg-[#3b3b3b] absolute top-[2.5rem] w-full h-9 flex p-1 gap-4">
                    <div className="flex items-center h-full gap-2 w-20 text-xl justify-between">
                        <FiArrowLeft className='bg-transparent flex w-10 h-full group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded' />
                        <MdOutlineRefresh className='bg-transparent flex w-10 h-full group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded' />
                    </div>

                    <div className="bg-[#2e2e2e] w-full h-full rounded-full border flex items-center justify-start border-white border-opacity-20 gap-2 hover:bg-[#3b3b3b] transition-all">
                        <AiOutlineExclamationCircle className='bg-[#3b3b3b] bg-opacity-50 h-full rounded-full w-7 p-1 hover:bg-opacity-100' />
                        <p className='text-base pb-[2px]'>nihap.io/{slug}</p>
                    </div>
                    <div className="w-44 flex items-center justify-between gap-2">
                        <PiListStar className='bg-transparent flex w-10 h-full group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded' />
                        <img src='/src/images/profile.webp' className='h-full bg-transparent flex  group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded-full' />
                        <FiMoreHorizontal className='bg-transparent flex w-10 h-full group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded' />
                        <img src="/src/assets/icons/copilot.svg" className='bg-transparent flex w-10 h-full group active:scale-100 p-1 hover:bg-[#ffffff20] duration-300 rounded' />

                    </div>

                </div>

                <div className="absolute top-[4.75rem] h-[calc(100vh-7.75rem)] w-full bg-white rounded-lg overflow-y-scroll overflow-x-hidden">
                {content}
                </div>

            </div>
        </Draggable>
    )
});

export default Edge;