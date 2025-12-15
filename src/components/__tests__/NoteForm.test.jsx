import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NoteForm from '../NoteForm'

describe('NoteForm', () => {
  test('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()
    render(<NoteForm onCreate={onCreate} />)

    await user.click(screen.getByRole('button', { name: /crear/i }))

    expect(screen.getByText(/El título es obligatorio./i)).toBeInTheDocument()
    expect(screen.getByText(/El contenido debe tener al menos 5 caracteres./i)).toBeInTheDocument()
    expect(onCreate).not.toHaveBeenCalled()
  })

  test('calls onCreate with valid data', async () => {
    const user = userEvent.setup()
    const onCreate = vi.fn()
    render(<NoteForm onCreate={onCreate} />)

    await user.type(screen.getByLabelText(/Título/i), 'Nota prueba')
    await user.type(screen.getByLabelText(/Contenido/i), 'Contenido válido')
    await user.click(screen.getByRole('button', { name: /crear/i }))

    expect(onCreate).toHaveBeenCalledTimes(1)
    expect(onCreate).toHaveBeenCalledWith(expect.objectContaining({ title: 'Nota prueba', content: 'Contenido válido' }))
  })
})
