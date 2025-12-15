import React, { useEffect, useState } from 'react'

export default function NoteForm({ onCreate, onUpdate, editing, cancelEdit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [important, setImportant] = useState(false)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editing) {
      setTitle(editing.title)
      setContent(editing.content)
      setImportant(!!editing.important)
    } else {
      setTitle('')
      setContent('')
      setImportant(false)
    }
    setErrors({})
  }, [editing])

  const validate = () => {
    const e = {}
    if (!title.trim()) e.title = 'El título es obligatorio.'
    if (content.trim().length < 5) e.content = 'El contenido debe tener al menos 5 caracteres.'
    if (title.trim().length > 100) e.title = 'El título no puede exceder 100 caracteres.'
    if (content.trim().length > 1000) e.content = 'El contenido no puede exceder 1000 caracteres.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev) => {
    ev.preventDefault()
    if (!validate()) return
    const payload = { title: title.trim(), content: content.trim(), important }
    if (editing) {
      await onUpdate(editing.id, { ...payload, createdAt: editing.createdAt })
    } else {
      await onCreate(payload)
    }
    setTitle('')
    setContent('')
    setImportant(false)
  }

  return (
    <div className="card card-small">
      <h5 className="mb-3">{editing ? 'Editar nota' : 'Nueva nota'}</h5>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-2">
          <label className="form-label" htmlFor="title">Título</label>
          <input id="title" aria-invalid={!!errors.title} aria-describedby={errors.title ? 'title-error' : undefined} maxLength={100} className={`form-control ${errors.title ? 'is-invalid' : ''}`} value={title} onChange={e => setTitle(e.target.value)} />
          {errors.title && <div id="title-error" className="invalid-feedback">{errors.title}</div>}
        </div>
        <div className="mb-2">
          <label className="form-label" htmlFor="content">Contenido</label>
          <textarea id="content" aria-invalid={!!errors.content} aria-describedby={errors.content ? 'content-error' : undefined} maxLength={1000} className={`form-control ${errors.content ? 'is-invalid' : ''}`} rows={4} value={content} onChange={e => setContent(e.target.value)} />
          {errors.content && <div id="content-error" className="invalid-feedback">{errors.content}</div>}
        </div>
        <div className="mb-3 form-check">
          <input id="important" className="form-check-input" type="checkbox" checked={important} onChange={e => setImportant(e.target.checked)} />
          <label className="form-check-label" htmlFor="important">Marcar como importante</label>
        </div>
        <div className="d-flex gap-2">
          <button className="btn btn-primary" type="submit">{editing ? 'Guardar' : 'Crear'}</button>
          {editing ? <button className="btn btn-outline-secondary" type="button" onClick={cancelEdit}>Cancelar</button> : null}
        </div>
      </form>
    </div>
  )
}
