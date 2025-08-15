import { initialTasks } from '../../fetchdataApi.js';

export function saveTask() {
    localStorage.setItem("initialTasks", JSON.stringify(initialTasks));
}