import api from "./api";

export const getTasks = () => api.get("/tasks");
export const addTask = (task) => api.post("/tasks", task);
export const updateTaskOrder = (tasks) => api.put("/tasks", tasks);
