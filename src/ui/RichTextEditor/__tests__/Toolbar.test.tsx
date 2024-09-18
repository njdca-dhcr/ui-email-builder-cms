import React from 'react'
import { render } from '@testing-library/react'
import { withReact, Slate } from 'slate-react'
import { Toolbar } from '../Toolbar'
import { createEditor } from 'slate'

describe('Toolbar', () => {
  const wrapper = (props: any) => {
    return <Slate {...props} editor={withReact(createEditor())} initialValue={[]} />
  }

  it('renders mark, block, and link buttons', () => {
    const { baseElement } = render(<Toolbar />, { wrapper })

    expect(baseElement.querySelectorAll('.mark-button')).toHaveLength(3)
    expect(baseElement.querySelectorAll('.rte-link-button')).toHaveLength(1)
    expect(baseElement.querySelectorAll('.block-button')).toHaveLength(2)
  })
})
