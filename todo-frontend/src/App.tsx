import React, { useState, useEffect } from 'react';
import './App.scss'
import { ITaskItem } from './interfaces';

import Task from './components/Task';
import CreateTask from './components/CreateTask';

import { getTasks, createTask, updateTask, deleteTask } from './Api';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<ITaskItem[]>([]);
  const [formData, setFormData] = useState<ITaskItem | {}>({});


  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = (): void => {
    getTasks()
      .then(({ data }: ITaskItem[] | any) => setTasks(data))
      .catch((err: Error) => console.log(err))
  }

  const handleSaveTask = (e: React.FormEvent, formData: ITaskItem): void => {
    e.preventDefault()
    createTask(formData)
      .then(({ status, data }: ITaskItem | any) => {
        if (status !== 201) {
          throw new Error('Error! Task not saved')
        }
        setFormData({});
        setTasks([data, ...tasks]);
      })
      .catch((err) => console.log(err))
  }

  const handleUpdateTask = (task: ITaskItem): void => {
    updateTask(task)
      .then(({ status, data }: any) => {
        if (status !== 200) {
          throw new Error('Error! Task not updated')
        }
        setTasks(tasks.map(_task => {
          if (_task._id === data._id) {
            return data;
          }
          return task;
        }));
      })
      .catch((err) => console.log(err))
  }

  const handleDeleteTask = (_id: string): void => {
    deleteTask(_id)
      .then(({ status }: any) => {
        if (status !== 204) {
          throw new Error('Error! Task not deleted')
        }
        setTasks(tasks.filter(task => task._id !== _id));
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className="container">
      <div className="app-wrapper">
        <div className="main">
          <h2 className="text-center text-white mb-4">My Task Manager</h2>
          <CreateTask saveTask={handleSaveTask} formData={formData} setFormData={setFormData}/>
          <div>
            <ul className="list">
            {tasks.map((task: ITaskItem) => (
                <Task
                  key={task._id}
                  updateTask={handleUpdateTask}
                  deleteTask={handleDeleteTask}
                  task={task}
                />
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
