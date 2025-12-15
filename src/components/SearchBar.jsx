import React from 'react'

export default function SearchBar({ value, onChange }) {
  return (
    <div className="input-group">
      <span className="input-group-text">🔍</span>
      <input className="form-control" placeholder="Buscar por texto..." value={value} onChange={e => onChange(e.target.value)} />
    </div>
  )
}
