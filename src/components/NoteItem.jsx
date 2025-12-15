import React from 'react'

export default function NoteItem({ note, onEdit, onDelete, onToggleImportant, onShow }) {
  return (
    <div className={`card p-3 note-card ${note.important ? 'note-important' : ''}`}>
      <div className="d-flex gap-3">
        <div className="flex-grow-1" onClick={() => onShow(note)} style={{ cursor: 'pointer', minWidth: 0 }}>
          <h5 className="mb-1 note-item-title">{note.title} {note.important ? <span className="badge bg-warning text-dark note-badge ms-1">Importante</span> : null}</h5>
          <p className="mb-1 text-muted small">{new Date(note.createdAt).toLocaleString()}</p>
          <p className="mb-2 text-muted text-truncate" style={{ maxWidth: '100%' }}>{note.content}</p>
        </div>

        <div className="d-flex flex-column align-items-end" style={{ minWidth: 120 }}>
          <button className={`btn btn-sm ${note.important ? 'btn-warning' : 'btn-outline-secondary'} mb-2 w-100`} onClick={(e) => { e.stopPropagation(); onToggleImportant(note.id) }} aria-label="Marcar importante">
            <i className={`bi ${note.important ? 'bi-star-fill' : 'bi-star'}`}></i>
          </button>
          <div className="d-flex">
            <button className="btn btn-sm btn-outline-primary me-2" style={{ minWidth: 54 }} onClick={(e) => { e.stopPropagation(); onEdit(note) }}><i className="bi bi-pencil-fill me-1"></i>Editar</button>
            <button className="btn btn-sm btn-outline-danger" style={{ minWidth: 54 }} onClick={(e) => { e.stopPropagation(); onDelete(note.id) }}><i className="bi bi-trash-fill me-1"></i>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
