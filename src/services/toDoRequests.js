import http from "./http";

export const getToDoList = async () => {
    const response = await http.get('todos?limit=5');
    return response.data.todos;
}

export const getSingleToDo = async (id) => {
    const response = await http.get(`todos/${id}`);
    return response.data;
}