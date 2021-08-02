import React from 'react';
import { ITaskItem } from '../interfaces';


type Props = {
    formData: ITaskItem | any
    saveTask: (e: React.FormEvent, formData: ITaskItem | any) => void
    setFormData: (obj: any) => void
}

const CreateTask: React.FC<Props> = ({ saveTask, formData, setFormData}) => {
    const handleForm = (e: any, key: string): void => {
        setFormData({
            ...formData,
            [key]: e.currentTarget.value,
        })
    }

    return (
        <form onSubmit={(e) => saveTask(e, formData)} className="form">
            <input
                type="text"
                placeholder="Task title"
                id="title"
                onChange={(e) => handleForm(e, 'title')}
                required
                className="task-input mb-4"
                value={formData.title || ''}
            />
            {/* <input onChange={handleForm} type='textarea' placeholder="Task Description" id='description' className="task-input mb-4" /> */}
            <textarea value={formData.description || ''} onChange={(e) => handleForm(e, 'description')} placeholder="Task Description" className="task-input mb-4" id="description" rows={2}></textarea>
            <div className="buttons">
                <button type="submit" className="btn add-task-btn">
                    Add Task
                </button>
            </div>
        </form>
    )
}

export default CreateTask;
