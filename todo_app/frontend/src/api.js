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

export const updateTask = (id, title, content) => {
    const reqBody = {
        title: title,
        content: content
    }
    return fetch(`${API_ENDPOINT}/tasks/${id}`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
    });
}

export const deleteTask = (id) => {
    const reqBody = {
        hoge: 'hoge'
    }
    return fetch(`${API_ENDPOINT}/tasks/${id}/delete`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
    });
}