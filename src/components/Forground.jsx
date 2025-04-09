import React, { useState } from 'react'
import Card from './Card'

function Forground() {
  const ref=React.useRef(null);
    const data=[
      {
        desc:"Background color will be green with click on the button",
        filesize:"0.9mb",
        close:true,
        tag:{isOpen:true,tagTitle:"Download Now",tagColor:"bg-green-600"},
        
    }
    ,
    {
      desc:"Background color will be green with click on the button",
      filesize:"0.9mb",
      close:true,
      tag:{isOpen:true,tagTitle:"Download Now",tagColor:"bg-green-600"},
  },
  {
    desc:"Background color will be green with click on the button",
    filesize:"0.9mb",
    close:true,
    tag:{isOpen:true,tagTitle:"Download Now",tagColor:"bg-green-600"},
}
  ];
  return (
    <div>
      <div ref={ref} className='fixed top-0 left-0 w-full h-screen z-[3] gap-10 flex justify-center items-center flex-wrap'>
          {data.map((item, index) => (
            <Card data={item} refrence={ref}/>
          ))
            }

          </div>
    </div>
  )
}

export default Forground
