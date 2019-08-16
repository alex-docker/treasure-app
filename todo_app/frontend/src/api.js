const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_BASE;

export const fetchTasks = () => {
    console.log(API_ENDPOINT)
    return fetch(`${API_ENDPOINT}/tasks`)
}