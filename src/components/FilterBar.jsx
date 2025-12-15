import React from 'react'

export default function FilterBar({ filter, onChange, preset, onPresetChange }) {
  return (
    <div className="d-flex justify-content-end align-items-center gap-2">
      <div className="btn-group" role="group" aria-label="Filtros">
        <button className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onChange('all')}>Todas</button>
        <button className={`btn ${filter === 'important' ? 'btn-primary' : 'btn-outline-primary'}`} onClick={() => onChange('important')}>Importantes</button>
      </div>

      <select className="form-select form-select-sm w-auto" value={preset} onChange={e => onPresetChange(e.target.value)} aria-label="Filtro por periodo">
        <option value="any">Todos los tiempos</option>
        <option value="7">Últimos 7 días</option>
        <option value="30">Últimos 30 días</option>
        <option value="90">Últimos 90 días</option>
      </select>
    </div>
  )
}
