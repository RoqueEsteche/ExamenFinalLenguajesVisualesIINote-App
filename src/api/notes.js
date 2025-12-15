import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001' })

export const getNotes = async () => {
  const res = await API.get('/notes')
  return res.data
}

export const getNote = async (id) => {
  const res = await API.get(`/notes/${id}`)
  return res.data
}

export const createNote = async (note) => {
  const res = await API.post('/notes', note)
  return res.data
}

export const updateNote = async (id, note) => {
  const res = await API.put(`/notes/${id}`, note)
  return res.data
}

export const patchNote = async (id, partial) => {
  const res = await API.patch(`/notes/${id}`, partial)
  return res.data
}

export const deleteNote = async (id) => {
  const res = await API.delete(`/notes/${id}`)
  return res.data
}
