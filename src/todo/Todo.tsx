import {useEffect, useState} from "react";
import CustomSelect from "../components/CustomSelect";
import Task from "../components/Task";
import CreateTaskModal from "../components/CreateTaskModal";
import {AnimatePresence} from "framer-motion";
import {ToastContainer, toast} from 'react-toastify';
import axios from 'axios';

function Todo() {
    const [selectedFilter, setSelectedFilter] = useState('All')
    const [isOpenModal, setIsOpenModal] = useState(false)
    const [newUserTask, setNewUserTask] = useState('')
    const [tasks, setTasks] = useState<any[]>([]);
    const [editableTask, setEditableTask] = useState<any | null>(null);
    const [currentEditTask, setCurrentEditTask] = useState('');
    const [isEdit, setIsEdit] = useState(false);


    async function toggleTaskCompletion(taskId: string) {
        try {
            await axios.put(`http://localhost:3005/tasks/${taskId}`, {
                completed: !tasks.find(task => task._id === taskId)?.completed,
            });
            fetchTasks();
        } catch (err) {
            console.log(err);
        }
    }


    async function deleteTask(taskId: number) {
        console.log('START DELETE TASK', taskId);
        try {
            await axios.delete(`http://localhost:3005/tasks/${taskId}`)
            fetchTasks()
            toast.success('Task deleted!')
        }
        catch(err) {
            console.log(err)
        }
        finally {
            console.log('ПРОВЕРКА')
        }
    }
    async function editTask(taskId: number){

        try{
            await axios.put(`http://localhost:3005/tasks/${taskId}`, {
                title: newUserTask,
            })
            fetchTasks()
            toast.success('Task edited!')
        }
        catch(err){
            console.log(err)
        }
        finally {
            setIsOpenModal(false)
        }
    }

    // async function toggleTaskCompletion(taskId: number) {
    //     try{
    //         await axios.put(`http://localhost:3005/tasks/${taskId}`, {
    //             completed: ,
    //         })
    //         fetchTasks()
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    //
    // }

    async function fetchTasks() {
        try{
            const data = await axios.get('http://localhost:3005/tasks')
            setTasks(data.data)
            console.log(data.data)
        }
        catch(err){
            console.log(err)
        }
    }



    useEffect(() => {
        fetchTasks()
    }, [])

    const filteredTasks = (() => {
        if (selectedFilter === 'Active') {
            return tasks.filter(task => !task.completed);
        }
        if (selectedFilter === 'Completed') {
            return tasks.filter(task => task.completed);
        }
        return tasks;
    })();
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnHover={false}
                draggable
                pauseOnFocusLoss
            />
            <AnimatePresence>
                {isOpenModal && (
                    <CreateTaskModal
                        editTask={editTask}
                        fetchTasks={fetchTasks}
                        setNewUserTask={setNewUserTask}
                        setIsOpenModal={setIsOpenModal}
                        currentEditTask={currentEditTask}
                        isCreateTask={!isEdit}
                        defaultValue={editableTask?.title || ''}
                    />
                )}
            </AnimatePresence>


            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[700px] w-full">
                <div className="flex justify-between items-center">
                    <button
                        className="px-[20px] text-[18px] py-[5px] text-white rounded-sm bg-[rgb(94,114,227)] hover:bg-[rgb(84,104,217)] transition-colors duration-200"
                        onClick={() => {setIsOpenModal(true); setIsEdit(false)}}
                    >
                        Add Task
                    </button>
                    <CustomSelect selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
                </div>
                <div className="bg-[rgb(235,237,244)] flex flex-col gap-[15px] rounded-sm mt-[10px] p-[20px]">
                    {tasks && tasks.length > 0 ? (
                        filteredTasks.length > 0 ? (
                            filteredTasks.map(task => (
                                <Task
                                    key={task._id}
                                    id={task._id}
                                    title={task.title}
                                    createdAt={task.createdAt}
                                    isCompleted={task.completed}
                                    deleteTask={deleteTask}
                                    editTask={editTask}
                                    setIsOpenModal={setIsOpenModal}
                                    setCurrentEditTask={setCurrentEditTask}
                                    onToggleCompletion={toggleTaskCompletion}
                                    // onEdit={editTask}
                                    setIsEdit={setIsEdit}
                                />
                            ))
                        ) : (
                            <p className="text-center">Clean</p>
                        )
                    ) : (
                        <p className="text-center">There's nothing yet</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Todo;