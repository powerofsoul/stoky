import axios from 'axios'

const BASE_PATH = '/api/'

function urlWithQueryParam(path: string, queryParams: { [key: string]: string | number | any } | undefined) {
    let url = `${BASE_PATH}${path}`
    if (queryParams) {
        url = `${url}?${Object.entries(queryParams)
            .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
            .join('&')}`
    }
    return url
}

export function get<T>(
    path: string,
    queryParams?: {
        [key: string]: string | number | any
    }
) {
    const url = urlWithQueryParam(path, queryParams)
    return axios.get(url).then((r) => r.data as T)
}

export function post<T, K>(
    path: string,
    body?: K,
    queryParams?: {
        [key: string]: string
    }
) {
    const url = urlWithQueryParam(path, queryParams)

    return axios.post(url, body).then((r) => r.data as T)
}

export function del<T>(
    path: string,
    queryParams?: {
        [key: string]: string | number | any
    }
) {
    const url = urlWithQueryParam(path, queryParams)
    return axios.delete(url).then((r) => r.data as T)
}
