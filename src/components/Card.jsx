import React from 'react';
import { FaRegFileAlt } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import { IoCloseSharp, IoScale } from "react-icons/io5";
import { motion } from "motion/react"


function Card({data, refrence}) {
  return (
    <motion.div drag dragConstraints={refrence} whileDrag={{scale:1.2}} className="relative w-60 h-72 bg-zinc-900/90 rounded-[50px] shadow-lg px-8 py-5 overflow-hidden text-white">
      <FaRegFileAlt />
      <p className='text-sm font-semibold mt-5'>{data.desc}</p>
      <div className='absolute w-full h-30 bottom-0 left-0'>
        <div className='flex justify-between items-center px-8 mb-0 py-5'>
          <h5>{data.filesize}</h5>
          <span className='w-7 h-5 bg-zinc-600 rounded-full flex items-center justify-center'>
            {data.close ? <IoCloseSharp />
:   <LuDownload size='0.8em' color='#fff' /> }
            
          </span>
        </div>
        {data.tag.isOpen  && (
          <div className={`w-full py-4 ${data.tag.tagColor} flex items-center justify-center`}>
              <h3 className='sm-text font-semibold'>{data.tag.tagTitle}</h3>
          </div>
        )}
       
      </div>
    </motion.div>
  );
}

export default Card;
