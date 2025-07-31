import { ChevronDown } from 'lucide-react';
import {useState} from 'react'
import { motion, AnimatePresence } from 'framer-motion';
type CustomSelectProps = {
    selectedFilter: string;
    setSelectedFilter: (value: string) => void;
};
function CustomSelect({setSelectedFilter, selectedFilter}: CustomSelectProps){
    // const [selectedFilter, setSelectedFilter] = useState('All')
    const [isActiveSelect, setIsActiveSelect] = useState(false)
    return(
        <div className='relative'>
           <button onClick={() => setIsActiveSelect(!isActiveSelect)} className={`${isActiveSelect ? 'rounded-tl-sm rounded-tr-sm' : 'rounded-sm'} px-[10px] text-[18px] py-[5px] bg-[rgb(203,205,219)] w-[130px] flex justify-between items-center text-black hover:bg-[rgb(193,195,209)] transition-colors duration-200`}> {selectedFilter} <ChevronDown className="w-4" /></button>
           <AnimatePresence>
        {isActiveSelect && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="bg-[rgb(203,205,219)] overflow-hidden top-[99%] absolute w-full rounded-bl-sm rounded-br-sm shadow-lg z-10"
          >
            <ul>
              <li onClick={() => setSelectedFilter('All')} className="py-1 px-[10px] hover:bg-[rgb(193,195,209)] cursor-pointer">All</li>
              <li onClick={() => setSelectedFilter('Active')} className="py-1 px-[10px] hover:bg-[rgb(193,195,209)] cursor-pointer">Active</li>
              <li onClick={() => setSelectedFilter('Completed')} className="py-1 px-[10px] hover:bg-[rgb(193,195,209)] cursor-pointer">Completed</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
        </div>
    )
}
export default CustomSelect;