import React from 'react'
import { render } from '@testing-library/react'
import { SelectPreviewType } from '../SelectPreviewType'
import userEvent from '@testing-library/user-event'

describe('SelectPreviewType', () => {
  describe('when desktop is selected', () => {
    it('has desktop selected', async () => {
      const { getByLabelText } = render(
        <SelectPreviewType previewType="desktop" onChange={jest.fn()} />,
      )
      const radioButton = getByLabelText('Desktop')
      expect(radioButton).toBeChecked()
    })

    it('has mobile unselected', async () => {
      const { getByLabelText } = render(
        <SelectPreviewType previewType="desktop" onChange={jest.fn()} />,
      )
      const radioButton = getByLabelText('Mobile')
      expect(radioButton).not.toBeChecked()
    })

    it('calls onChange with "mobile" when mobile is clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { getByLabelText } = render(
        <SelectPreviewType previewType="desktop" onChange={onChange} />,
      )

      expect(onChange).not.toHaveBeenCalled()
      await user.click(getByLabelText('Mobile'))
      expect(onChange).toHaveBeenCalledWith('mobile')
    })
  })

  describe('when mobile is selected', () => {
    it('has mobile selected', async () => {
      const { getByLabelText } = render(
        <SelectPreviewType previewType="mobile" onChange={jest.fn()} />,
      )
      const radioButton = getByLabelText('Mobile')
      expect(radioButton).toBeChecked()
    })

    it('has desktop unselected', async () => {
      const { getByLabelText } = render(
        <SelectPreviewType previewType="mobile" onChange={jest.fn()} />,
      )
      const radioButton = getByLabelText('Desktop')
      expect(radioButton).not.toBeChecked()
    })

    it('calls onChange with "desktop" when desktop is clicked', async () => {
      const user = userEvent.setup()
      const onChange = jest.fn()
      const { getByLabelText } = render(
        <SelectPreviewType previewType="mobile" onChange={onChange} />,
      )

      expect(onChange).not.toHaveBeenCalled()
      await user.click(getByLabelText('Desktop'))
      expect(onChange).toHaveBeenCalledWith('desktop')
    })
  })
})
