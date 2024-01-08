import React, { useEffect, useState } from "react";
import { TaskData } from "../../models/TaskData";
import { taskService } from "../../services/task/task.service";
import { ModalProps } from "../../models/ModalProps";
import Loader from "../Loader/Loader";
import "./SingleTask.css";
import Label from "../Label/Label";
import toast from "react-hot-toast";
import useOpenModal from "../../helpers/useOpenModal";
import CreateTask from "../Createtask/CreateTask";
import DeletePopup from "../DeletePopup/DeletePopup";

const SingleTask = (props: ModalProps) => {
  const [task, setTask] = useState<TaskData>();
  const [loading, setLoading] = useState(true);
  const [taskStatus, setTaskStatus] = useState<string | undefined>(undefined);
  const {ModalWrapper, openModal}  = useOpenModal()

  const fetchTaskData = () => {
    taskService
      .getSingleTask(props.items?.taskId)
      .then((response) => {
        setTask(response.data);
        setTaskStatus(response.data.attributes.status);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchTaskData();
  }, []);

  const deleteTaskFunction = (taskId: any) => {
    taskService
      .deleteTask(taskId)
      .then((response) => {
        toast.success("Successfully deleted!");
        props.items?.fetchAllTasks();
        props.closeModal();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong!");
      });
  }

  const handleDeleteTask = (taskId: any) => {
    openModal(DeletePopup, {deleteTaskFunction, taskId})
  };

  const handleStatusChange = (e: any) => {
    console.log("status ch", e.target.value);
    const payload = {
      task_id: props.items?.taskId,
      status: e.target.value,
    };

    taskService.createNewStatus(payload).then((response) => {
      toast.success("Successfully updated!");
      props.items?.fetchAllTasks();
    });
    setTaskStatus(e.target.value);
  };


  const handleEditTask = (taskId: any) => {
    openModal(CreateTask, {fetchAllTasks: props.items?.fetchAllTasks, isEdit: true}, {task, fetchTaskData});
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="task-details-page">
          <div className="task-details-container">
            <div className="task-details-header">
              <h2>{task?.attributes.title}</h2>
              <div className="task-details-header-buttons">
                <button
                  className="edit-icon"
                  onClick={() => handleEditTask(task?.id)}
                >
                  Edit
                </button>
                <button
                  className="delete-icon"
                  onClick={() => handleDeleteTask(task?.id)}
                >
                  Delete
                </button>
              </div>
            </div>

            <img
              src={
                task?.attributes.attachment ??
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyVaxs3qBS_MeNaG5dioG8xKand1IJoBULoNm3UmqQHg&s"
              }
              alt="Main Task Image"
              className="main-image"
            />

            <p>{task?.attributes.description}</p>

            <div className="task-details-tags">
              <strong>Group:</strong>
              <Label label={task?.attributes?.group ?? ""} $number={9} />
            </div>
            <div className="task-details-tags">
              <strong>Priority:</strong>
              <Label label={task?.attributes?.priority ?? ""} $number={6} />
            </div>
            <div className="task-details-tags">
              <strong>Remainder:</strong>
              <Label label={task?.attributes?.remainder ?? ""} $number={7} />
            </div>
            <div className="task-details-tags">
              <strong>Due Date:</strong>
              <Label label={task?.attributes?.due_date ?? ""} $number={8} />
            </div>
            <div className="task-details-tags">
              <strong>Tags:</strong>
              {task?.attributes.tags.map((tag, index) => (
                <div key={index}>
                  <Label label={tag.tag} $number={index + 1} />
                </div>
              ))}
            </div>

            <div className="task-details-tags">
              <strong>Due Date:</strong>
              <select
                id="statusDropdown"
                value={taskStatus || ""}
                onChange={handleStatusChange}
              >
                <option value="TO-DO">TO-DO</option>
                <option value="IN-PROGRESS">In Progress</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
          </div>
          {ModalWrapper}
        </div>
      )}
    </>
  );
};

export default SingleTask;
