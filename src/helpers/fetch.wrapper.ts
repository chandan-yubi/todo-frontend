export const fetchWrapper = {
    get,
    post,
    put,
    delete: _delete
}

async function get(url:string, params?: any) {
    const authToken = localStorage.getItem('authToken')

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        },
        body: JSON.stringify(params)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

async function post(url:string, body: any) {
    const authToken = localStorage.getItem('authToken')

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        },
        body: JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

async function put(url:string, body: any) {
    const authToken = localStorage.getItem('authToken')

    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        },
        body: JSON.stringify(body)
    }
    return fetch(url, requestOptions).then(handleResponse)
}

async function _delete(url:string) {
    const authToken = localStorage.getItem('authToken')

    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${authToken}`
        },
    }
    return fetch(url, requestOptions).then(handleResponse)
}


async function handleResponse(response: any) {
    return response.text().then((text: string) => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            const error = ((data && data.message) ??
            data.message ??
            data.errors ??
            data.msg ??
            data.error) || response.statusText;
            return Promise.reject(error);
        }
        console.log("Resopnse", data)
        return data;
    })
}