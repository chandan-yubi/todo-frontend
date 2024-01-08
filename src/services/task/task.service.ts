import { fetchWrapper } from "../../helpers/fetch.wrapper";

const baseUrl = "http://localhost:3000/api/v1"

export const taskService = {
    getAllTask,
    createTask,
    getSingleTask,
    deleteTask,
    createNewStatus,
    updateTask
}

function getAllTask() {
    return fetchWrapper.get(baseUrl + "/tasks")
}

function createTask(payload: any) {
    return fetchWrapper.post(baseUrl + "/tasks", payload)
}

function getSingleTask(taskId: any) {
    return fetchWrapper.get(baseUrl + "/tasks/" + taskId)
}

function deleteTask(taskId: any) {
    return fetchWrapper.delete(baseUrl + "/tasks/" + taskId)
}

function createNewStatus(payload: any) {
    return fetchWrapper.post(baseUrl + "/create_status" ,  payload)
}

function updateTask(taskId: any, payload: any) {
    return fetchWrapper.put(baseUrl + "/tasks/" + taskId, payload)
}

