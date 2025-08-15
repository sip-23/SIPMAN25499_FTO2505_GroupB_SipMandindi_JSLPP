import { initialTasks } from '../utils/fetchdataApi.js';

export function saveTask() {
    localStorage.setItem("initialTasks", JSON.stringify(initialTasks));
}