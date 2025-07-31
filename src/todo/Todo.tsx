import { useState } from "react";
import CustomSelect from "../components/CustomSelect";
import Task from "../components/Task";
import CreateTaskModal from "../components/CreateTaskModal";
import { AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from 'react-toastify';

function Todo() {
  
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [newUserTask, setNewUserTask] = useState('')
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreateTask, setIsCreateTask] = useState(true);
  const [editableTask, setEditableTask] = useState<any | null>(null);
  function editTask(task: any) {
    setEditableTask(task);
    setIsCreateTask(false);
    setIsOpenModal(true);
    
  }
  function handleNewUserTask(taskTitle: string) {
    if (!isCreateTask && editableTask) {
      const updatedTasks = tasks.map(task =>
        task.id === editableTask.id
          ? { ...task, title: taskTitle }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      setEditableTask(null);
      setIsCreateTask(true);
    } else {
      addNewTask(taskTitle);
    }
    setNewUserTask('');
  }
  function deleteTask(taskId: number) {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success('Successfully deleted!')
  }
  
  function addNewTask(taskTitle: string) {
    const newTask = {
      id: Date.now(),
      title: taskTitle,
      createdAt: new Date().toLocaleString(),
      isCompleted: false,
    };
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }



  function toggleTaskCompletion(taskId: number) {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  }

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
      setIsOpenModal={setIsOpenModal}
      setNewUserTask={handleNewUserTask}
      isCreateTask={isCreateTask}
      defaultValue={editableTask?.title || ''}
    />
  )}
</AnimatePresence>


      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[700px] w-full">
        <div className="flex justify-between items-center">
          <button
            className="px-[20px] text-[18px] py-[5px] text-white rounded-sm bg-[rgb(94,114,227)] hover:bg-[rgb(84,104,217)] transition-colors duration-200"
            onClick={() => setIsOpenModal(true)}
          >
            Add Task
          </button>
          <CustomSelect />
        </div>
        <div className="bg-[rgb(235,237,244)] flex flex-col gap-[15px] rounded-sm mt-[10px] p-[20px]">
          {tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <Task
              deleteTask={deleteTask}
  key={task.id}
  id={task.id}
  title={task.title}
  createdAt={task.createdAt}
  isCompleted={task.isCompleted}
  onToggleCompletion={toggleTaskCompletion}
  onEdit={editTask}
/>

            ))
          ) : (
            <p className="text-center">There's nothing yet</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Todo;