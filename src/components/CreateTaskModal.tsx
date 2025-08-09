import { useState } from "react";
import { motion } from 'framer-motion';
import {  toast } from 'react-toastify';
import axios from "axios";

interface CreateTaskModalProps {
    setIsOpenModal: (value: boolean) => void;
    setNewUserTask: (value: string) => void;
    currentEditTask: string;
    fetchTasks: () => void;
    editTask: (value: number) => void;
    isCreateTask: boolean;
    defaultValue?: string;
}


function CreateTaskModal({ setIsOpenModal, fetchTasks, editTask, currentEditTask, isCreateTask, setNewUserTask, defaultValue = '' }: CreateTaskModalProps) {
    const [currentText, setCurrentText] = useState(defaultValue || '');
    async function postTask(){
        try{
            await axios.post('http://localhost:3005/tasks', {
                title: currentText,
            })
            fetchTasks();
            toast.success('Task created!')
        }
        catch(err){
            console.log(err)
        }
        finally {
            setCurrentText('')
            setIsOpenModal(false)
        }
    }



    // function submitForm(e: React.FormEvent<HTMLFormElement>) {
    //     e.preventDefault();
    //     if(currentText.trim() === ''){
    //         toast.error('Task cannot be empty!')
    //
    //     }
    //     try {
    //         postTask(currentText); // ждем завершения запроса
    //         setIsOpenModal(false);
    //         toast.success('Success!')
    //     } catch (err) {
    //         console.log(err)
    //         toast.error('Failed to create task!')
    //     }
    //
    //
    // }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="w-full h-full bg-black/50 fixed top-0 left-0 z-10 flex justify-center items-center"
            onClick={() => setIsOpenModal(false)}
        >
            <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg p-6 w-[400px] shadow-xl"
            >
                <h2 className="text-xl font-semibold mb-4">{isCreateTask ? 'Создать новую задачу' : 'Редактировать задачу'}</h2>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        isCreateTask ? postTask() : editTask(currentEditTask);
                    }}
                    className="space-y-4"
                >
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Название задачи
                        </label>
                        <input
                            onChange={(e) => isCreateTask ? setCurrentText(e.target.value) : setNewUserTask(e.target.value)}
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Введите название задачи..."
                        />
                    </div>
                    <div className="flex gap-3 pt-2">
                        <button
                            onClick={() => setIsOpenModal(false)}
                            type="button"
                            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
                        >
                            Отмена
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isCreateTask ? 'Создать' : 'Сохранить'}
                        </button>



                    </div>
                </form>
            </motion.div>
        </motion.div>



    )
}
export default CreateTaskModal;