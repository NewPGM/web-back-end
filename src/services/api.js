import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  }
})

export const instructorAPI = {
  getAll() {
    return apiClient.get('/instructors')
  },
  create(data) {
    return apiClient.post('/instructors', data)
  },
  update(id, data) {
    return apiClient.put(`/instructors/${id}`, data)
  },
  delete(id) {
    return apiClient.delete(`/instructors/${id}`)
  }
}

export const roomAPI = {
  getAll() {
    return apiClient.get('/rooms')
  },
  create(data) {
    return apiClient.post('/rooms', data)
  },
  update(id, data) {
    return apiClient.put(`/rooms/${id}`, data)
  },
  delete(id) {
    return apiClient.delete(`/rooms/${id}`)
  }
}