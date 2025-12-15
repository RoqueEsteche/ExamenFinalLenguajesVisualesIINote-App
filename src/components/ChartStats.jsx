import React, { useMemo } from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function ChartStats({ notes }) {
  const stats = useMemo(() => {
    const total = notes.length
    const important = notes.filter(n => n.important).length
    return { total, important }
  }, [notes])

  const data = {
    labels: ['Notas'],
    datasets: [
      { label: 'Importantes', data: [stats.important], backgroundColor: '#ffc107' },
      { label: 'Otras', data: [stats.total - stats.important], backgroundColor: '#6c757d' },
    ],
  }

  const options = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } },
  }

  return (
    <div className="card p-3">
      <h6>Estadísticas</h6>
      <Bar data={data} options={options} />
      <div className="mt-2 small text-muted">Totales: {stats.total} — Importantes: {stats.important}</div>
    </div>
  )
}
