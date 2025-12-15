import React from 'react'

export default function NoteModal({ note, onClose, onEdit, onDelete, onToggleImportant }) {
  if (!note) return null

  return (
    <div className="modal show d-block" tabIndex={-1} role="dialog" aria-modal="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header bg-light">
            <div>
              <h5 className="modal-title mb-0">{note.title}</h5>
              <small className="text-muted">{new Date(note.createdAt).toLocaleString()}</small>
            </div>
            <button type="button" className="btn-close" aria-label="Cerrar modal" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p className="note-content">{note.content}</p>
            <p className="small mt-3">Importante: {note.important ? <span className="badge bg-warning text-dark">Sí</span> : 'No'}</p>
          </div>
          <div className="modal-footer">
            <button className={`btn ${note.important ? 'btn-warning' : 'btn-outline-secondary'}`} onClick={() => onToggleImportant(note.id)}>
              <i className={`bi ${note.important ? 'bi-star-fill' : 'bi-star'}`}></i> {note.important ? 'Quitar importante' : 'Marcar importante'}
            </button>
            <button className="btn btn-primary" onClick={() => onEdit(note)}><i className="bi bi-pencil-fill me-1"></i>Editar</button>
            <button className="btn btn-danger" onClick={() => { onDelete(note.id); onClose(); }}><i className="bi bi-trash-fill me-1"></i>Eliminar</button>
            <button className="btn btn-secondary" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show" onClick={onClose}></div>
    </div>
  )
}
