import React from 'react'
import NoteItem from './NoteItem'

export default function NoteList({ notes, loading, onEdit, onDelete, onToggleImportant }) {
  if (loading) return <div className="alert alert-secondary">Cargando notas...</div>
  if (!notes.length) return <div className="alert alert-info">No hay notas que mostrar.</div>

  return (
    <div className="row gy-3">
      {notes.map(note => (
        <div className="col-12 col-sm-6 col-md-4" key={note.id}>
          <NoteItem note={note} onEdit={onEdit} onDelete={onDelete} onToggleImportant={onToggleImportant} />
        </div>
      ))}
    </div>
  )
}
