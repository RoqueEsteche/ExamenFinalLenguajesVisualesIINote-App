import { vi } from 'vitest'

vi.mock('axios', () => ({
  default: {
    create: () => ({
      get: vi.fn(() => Promise.resolve({ data: [{ id: 1 }] })),
      post: vi.fn((_, body) => Promise.resolve({ data: { id: 2, ...body } })),
      put: vi.fn((_, body) => Promise.resolve({ data: body })),
      patch: vi.fn((_, body) => Promise.resolve({ data: { ...body } })),
      delete: vi.fn(() => Promise.resolve({ data: {} })),
    })
  }
}))

import * as api from '../notes'

describe('notes API', () => {
  test('getNotes returns data', async () => {
    const data = await api.getNotes()
    expect(Array.isArray(data)).toBe(true)
    expect(data[0].id).toBe(1)
  })

  test('createNote posts and returns created', async () => {
    const created = await api.createNote({ title: 'X' })
    expect(created.id).toBe(2)
    expect(created.title).toBe('X')
  })
})
