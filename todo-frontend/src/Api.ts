import axios, { AxiosResponse } from 'axios';
import { ITaskItem, ApiDataType } from './interfaces';

const baseUrl: string = 'http://localhost:8000/api'

export const getTasks = async (): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const tasks: AxiosResponse<ApiDataType> = await axios.get(
            baseUrl + '/task'
        )
        return tasks
    } catch (error) {
        throw new Error(error)
    }
}

export const createTask = async (
    formData: ITaskItem
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const task: Omit<ITaskItem, '_id'> = {
            title: formData.title,
            description: formData.description,
        }
        const saveTask: AxiosResponse<ApiDataType> = await axios.post(
            baseUrl + '/task',
            task
        )

        return saveTask;
    } catch (error) {
        throw new Error(error);
    }
}

export const updateTask = async (
    task: ITaskItem
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const taskUpdate: Omit<ITaskItem, '_id'> = {
            title: task.title,
            description: task.description
        }
        const updatedTask: AxiosResponse<ApiDataType> = await axios.put(
            `${baseUrl}/task/${task._id}`,
            taskUpdate
        )
        return updatedTask
    } catch (error) {
        throw new Error(error)
    }
}

export const deleteTask = async (
    _id: string
): Promise<AxiosResponse<ApiDataType>> => {
    try {
        const deletedTask: AxiosResponse<ApiDataType> = await axios.delete(
            `${baseUrl}/task/${_id}`
        )
        return deletedTask
    } catch (error) {
        throw new Error(error)
    }
}
