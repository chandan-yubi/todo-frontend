import React, { useEffect, useState } from "react";
import "./Task.css";
import Card from "../../components/Card/Card";
import { TaskData } from "../../models/TaskData";
import { taskService } from "../../services/task/task.service";
import useOpenModal from "../../helpers/useOpenModal";
import SingleTask from "../../components/SingleTask/SingleTask";
import Loader from "../../components/Loader/Loader";
import CreateTask from "../../components/Createtask/CreateTask";
import ImageUploadComponent from "../../components/ImageUploadComponent";

const Task = () => {
  const [myTasks, setMyTasks] = useState<TaskData[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal, ModalWrapper } = useOpenModal();

  const fetchAllTasks = () => {
    taskService
      .getAllTask()
      .then((response) => {
        setMyTasks(response);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  

  useEffect(() => {
    fetchAllTasks();
  }, []);

  const openModalFunction = (taskId: any) => {
    openModal(SingleTask, { taskId, fetchAllTasks });
  };

  const openCreateTaskModal = () => {
    openModal(CreateTask, {fetchAllTasks, isEdit: false});
  }


  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="task-container">
          <div className="task-header">
            <h2>My Tasks</h2>
            <button onClick={openCreateTaskModal}>Add Task</button>
          </div>
          <div className="task-content">
            {myTasks.map((task) => (
              <div key={task.id} onClick={() => openModalFunction(task.id)}>
                <Card task={task} />
              </div>
            ))}
          </div>
        </div>
      )}
      {ModalWrapper}
    </>
  );
};

export default Task;
