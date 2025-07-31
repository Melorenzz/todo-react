import { ChevronDown } from 'lucide-react';
import {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';

function CustomSelect(){
    const [isActiveSelect, setIsActiveSelect] = useState(false)
    return(
        <div className='relative'>
           <button onClick={() => setIsActiveSelect(!isActiveSelect)} className={`${isActiveSelect ? 'rounded-tl-sm rounded-tr-sm' : 'rounded-sm'} px-[20px] text-[18px] py-[5px] bg-[rgb(203,205,219)] w-[130px] flex justify-between items-center text-black hover:bg-[rgb(193,195,209)] transition-colors duration-200`}> All <ChevronDown className="w-4" /></button>
           <AnimatePresence>
        {isActiveSelect && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="p-[5px] bg-[rgb(203,205,219)] top-[99%] absolute w-full rounded-bl-sm rounded-br-sm shadow-lg z-10"
          >
            <ul>
              <li className="py-1 px-2 hover:bg-gray-300 cursor-pointer">All</li>
              <li className="py-1 px-2 hover:bg-gray-300 cursor-pointer">Active</li>
              <li className="py-1 px-2 hover:bg-gray-300 cursor-pointer">Completed</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    )
}
export default CustomSelect;