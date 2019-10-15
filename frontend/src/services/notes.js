import axios from 'axios'
/*
  Because in our situation both the frontend and the backend
  are at the same address, we can declare baseUrl as a relative URL.
  This means we can leave out the part declaring the server.
  const baseUrl = 'https://infinite-fortress-16348.herokuapp.com/notes'
*/
const baseUrl = '/api/notes'

const getAll = () => {
  const request = axios.get(baseUrl)
  // return request.then(response => response.data)
  const nonExisting = {
    id: 10000,
    content: 'This note is not saved to server',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  }
  return request.then(response => response.data.concat(nonExisting))
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update }