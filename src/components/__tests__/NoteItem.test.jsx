import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteItem from '../NoteItem'

const sample = { id: 1, title: 'T', content: 'C', important: false, createdAt: new Date().toISOString() }

describe('NoteItem', () => {
  test('renders and responds to actions', async () => {
    const user = userEvent.setup()
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    const onToggleImportant = vi.fn()

    render(<NoteItem note={sample} onEdit={onEdit} onDelete={onDelete} onToggleImportant={onToggleImportant} />)

    await user.click(screen.getByRole('button', { name: /marcar/i }))
    expect(onToggleImportant).toHaveBeenCalledWith(1)

    await user.click(screen.getByRole('button', { name: /editar/i }))
    expect(onEdit).toHaveBeenCalledWith(sample)

    await user.click(screen.getByRole('button', { name: /eliminar/i }))
    expect(onDelete).toHaveBeenCalledWith(1)
  })
})
