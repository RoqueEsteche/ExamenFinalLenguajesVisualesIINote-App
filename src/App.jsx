import React, { useEffect, useState } from 'react'
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  patchNote,
} from './api/notes'
import NoteList from './components/NoteList'
import NoteForm from './components/NoteForm'
import SearchBar from './components/SearchBar'
import FilterBar from './components/FilterBar'
import ChartStats from './components/ChartStats'
import NoteModal from './components/NoteModal'

function App() {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [preset, setPreset] = useState('any')
  const [editing, setEditing] = useState(null)
  const [detail, setDetail] = useState(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  const load = async () => {
    setLoading(true)
    try {
      const data = await getNotes()
      setNotes(data.sort((a,b)=> new Date(b.createdAt) - new Date(a.createdAt)))
    } catch (e) {
      console.error('Error fetching notes', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const handleCreate = async (note) => {
    const created = await createNote({ ...note, createdAt: new Date().toISOString() })
    setNotes(prev => [created, ...prev])
  }

  const handleUpdate = async (id, note) => {
    const updated = await updateNote(id, note)
    setNotes(prev => prev.map(n => n.id === id ? updated : n))
    setEditing(null)
  }

  const handleDelete = async (id) => {
    await deleteNote(id)
    setNotes(prev => prev.filter(n => n.id !== id))
  }

  const toggleImportant = async (id) => {
    const note = notes.find(n => n.id === id)
    if (!note) return
    const patched = await patchNote(id, { important: !note.important })
    setNotes(prev => prev.map(n => n.id === id ? patched : n))
  }

  const showDetail = (note) => setDetail(note)
  const closeDetail = () => setDetail(null)

  const filtered = notes.filter(n => {
    if (filter === 'important' && !n.important) return false
    if (query && !(n.title + ' ' + n.content).toLowerCase().includes(query.toLowerCase())) return false
    if (preset !== 'any') {
      const days = Number(preset)
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - days)
      if (new Date(n.createdAt) < cutoff) return false
    }
    return true
  })

  return (
    <div className="container py-4">
      <nav className="navbar mb-3">
        <div className="container-fluid px-0">
          <div className="d-flex align-items-center gap-3">
            <span className="navbar-brand mb-0 h4">Note App</span>
            <small className="text-muted d-none d-md-inline">Notas rápidas · CRUD · Estadísticas</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <button className="btn btn-outline-secondary btn-sm" title="Cambiar tema" onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>
              <i className={`bi ${theme === 'dark' ? 'bi-moon-stars-fill' : 'bi-sun-fill'}`}></i>
            </button>
            <button className="btn btn-outline-primary btn-sm d-desktop-only" onClick={load} title="Actualizar notas"><i className="bi bi-arrow-clockwise"></i></button>
          </div>
        </div>
      </nav>

      <div className="app-hero mb-4">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <h2 className="h4 mb-1">Tus notas, organizadas</h2>
            <p className="mb-0 text-muted">Crea, busca y marca notas importantes. Interfaz responsiva y ligera.</p>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-primary">{notes.length} notas</span>
            <button className="btn btn-outline-secondary btn-sm d-desktop-only" onClick={load}>Actualizar</button>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-7">
          <NoteForm
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            editing={editing}
            cancelEdit={() => setEditing(null)}
          />
        </div>
        <div className="col-md-5">
          <ChartStats notes={notes} />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-8">
          <SearchBar value={query} onChange={setQuery} />
        </div>
        <div className="col-md-4">
          <FilterBar filter={filter} onChange={setFilter} preset={preset} onPresetChange={setPreset} />
        </div>
      </div>

      <NoteList
        notes={filtered}
        loading={loading}
        onEdit={(note) => setEditing(note)}
        onDelete={handleDelete}
        onToggleImportant={toggleImportant}
        onShow={showDetail}
      />

      {detail ? (
        <NoteModal note={detail} onClose={closeDetail} onEdit={(n) => { setEditing(n); closeDetail() }} onDelete={handleDelete} onToggleImportant={toggleImportant} />
      ) : null}

    </div>
  )
}

export default App
