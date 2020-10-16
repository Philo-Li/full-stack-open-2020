import axios from 'axios'
const baseUrl = '/api/users'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// const create = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.post(baseUrl, newObject, config)
//   return response.data
// }

// const update = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
//   return response.data
// }

// const deleteBlog = async newObject => {
//   const config = {
//     headers: { Authorization: token },
//   }

//   const response = await axios.delete(`${baseUrl}/${newObject.id}`, config)
//   return response.data
// }

// export default { getAll, create, update, deleteBlog, setToken }
export default { getAll, setToken }