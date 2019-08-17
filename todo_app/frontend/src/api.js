const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_BASE;

export const fetchTasks = () => {
    return fetch(`${API_ENDPOINT}/tasks`)
}

export const createTask = (title, content) => {
    const reqBody = {
        title: title,
        content: content,
    }
    return fetch(`${API_ENDPOINT}/tasks`,{
        method: 'POST',
        body: JSON.stringify(reqBody)
    });
}