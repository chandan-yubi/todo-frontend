import React from 'react'
import './DeletePopup.css'
import { ModalProps } from '../../models/ModalProps'

const DeletePopup = (props: ModalProps) => {
    console.log("DeleteProps", props)

    const handleCancel = () => {
        props.closeModal();
    }

    const handleDelete = () => {
        props.items.deleteTaskFunction(props.items.taskId)
    }
  return (
    <div className="popup">
        <h3>Are you sure you want to delete the task?</h3>
        <div className="button-container">
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
  )
}

export default DeletePopup