import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterBar from '../FilterBar'

describe('FilterBar', () => {
  test('preset change triggers callback', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onPreset = vi.fn()
    render(<FilterBar filter="all" onChange={onChange} preset="any" onPresetChange={onPreset} />)

    await user.selectOptions(screen.getByRole('combobox'), '7')
    expect(onPreset).toHaveBeenCalledWith('7')
  })
})
