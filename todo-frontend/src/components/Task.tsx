import React from 'react';
import { ITaskItem } from '../interfaces';


type Props = {
    task: ITaskItem
    updateTask: (task: ITaskItem) => void
    deleteTask: (_id: string) => void
}

const Task: React.FC<Props> = ({ task, updateTask, deleteTask }) => {
  return (
    <li className="list-item">
    <div>
        <h3 className="text-info">{task.title} </h3>
        <p className="text-light">{task.description}</p>
    </div>
      <div>
        {/* <button
          className="btn-edit task-btn"
          onClick={() => updateTask(task)}
        >
          <i className="fas fa-open"></i>
        </button>{' '} */}
        <button className="btn-delete task-btn" onClick={() => deleteTask(task._id)}>
          <i className="fas fa-trash-alt"></i>
        </button>
      </div>
    </li>
  )
}

export default Task;