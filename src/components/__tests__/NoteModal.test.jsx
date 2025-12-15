import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteModal from '../NoteModal'

const sample = { id: 1, title: 'Test', content: 'Contenido', important: true, createdAt: new Date().toISOString() }

describe('NoteModal', () => {
  test('renders detail modal and actions', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    const onToggle = vi.fn()

    render(<NoteModal note={sample} onClose={onClose} onEdit={onEdit} onDelete={onDelete} onToggleImportant={onToggle} />)

    expect(screen.getByText(/Test/)).toBeInTheDocument()
    expect(screen.getByText(/Contenido/)).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /Editar/i }))
    expect(onEdit).toHaveBeenCalledWith(sample)

    await user.click(screen.getByRole('button', { name: /^Cerrar$/i }))
    expect(onClose).toHaveBeenCalled()
  })
})
