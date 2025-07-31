import { Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';

interface ITasks {
    id: number;
    title: string;
    createdAt: string;
    isCompleted: boolean;
    onToggleCompletion: (taskId: number) => void;
    onEdit: (task: { id: number; title: string; createdAt: string; isCompleted: boolean }) => void; 
    deleteTask: (taskId: number) => void; 
}

function Task({ id, title, createdAt, isCompleted, onToggleCompletion, onEdit, deleteTask }: ITasks) {
    const [isShowMore, setIsShowMore] = useState(false);
    

    return (
        <div className="bg-white flex items-center justify-between rounded-sm w-full p-[10px] hover:shadow-md transition-all duration-200">
            <div className="flex items-center gap-[10px] w-full">
                <input
                    type="checkbox"
                    checked={isCompleted}
                    onChange={() => onToggleCompletion(id)}
                    className="min-w-[30px] w-[30px] h-[30px] rounded-sm cursor-pointer accent-[rgb(94,114,227)] hover:scale-110 transition-transform duration-200"
                />
                <div className='relative w-full'>
                    <p className={`font-[500] break-all ${isShowMore ? 'line-clamp-none' : 'line-clamp-2'} leading-5 ${isCompleted ? 'line-through text-gray-500' : 'text-black'}`}>
                        {title}
                    </p>
                    <p className='text-[14px]'>{createdAt}</p>
                    <button onClick={() => setIsShowMore(!isShowMore)} className='absolute font-bold text-[13px] right-[15px] bottom-0 hover:text-blue-600 transition-colors duration-200'>
                        <span>{isShowMore ? 'show less' : 'show more'}</span>
                    </button>
                </div>
            </div>

            <div className="flex gap-[5px]">
            <button
  onClick={() => deleteTask(id)} // ← ВАЖНО!
  className="w-[30px] h-[30px] p-[5px] rounded-sm bg-[rgb(237,237,237)] flex justify-center items-center hover:bg-red-100 hover:scale-110 transition-all duration-200 group"
>
  <Trash2 className="w-full h-full text-[rgb(88,88,88)] group-hover:text-red-600 transition-colors duration-200" />
</button>

                <button
                    className="w-[30px] h-[30px] p-[5px] rounded-sm bg-[rgb(237,237,237)] flex justify-center items-center hover:bg-blue-100 hover:scale-110 transition-all duration-200 group"
                    onClick={() => onEdit({ id, title, createdAt, isCompleted })} 
                >
                    <Pencil className='w-full h-full text-[rgb(88,88,88)] group-hover:text-blue-600 transition-colors duration-200' />
                </button>
            </div>
        </div>
    );
}

export default Task;
