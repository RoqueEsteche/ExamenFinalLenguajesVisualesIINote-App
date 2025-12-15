import React from 'react'
import { render, screen } from '@testing-library/react'
import NoteList from '../NoteList'

const notes = [
  { id: 1, title: 'A', content: 'a', important: false, createdAt: new Date().toISOString() }
]

describe('NoteList', () => {
  test('shows loading and empty states', () => {
    const { rerender } = render(<NoteList notes={[]} loading={true} />)
    expect(screen.getByText(/Cargando notas/i)).toBeInTheDocument()

    rerender(<NoteList notes={[]} loading={false} />)
    expect(screen.getByText(/No hay notas que mostrar/i)).toBeInTheDocument()
  })

  test('renders notes', () => {
    render(<NoteList notes={notes} loading={false} />)
    expect(screen.getByText(/A/)).toBeInTheDocument()
  })
})
