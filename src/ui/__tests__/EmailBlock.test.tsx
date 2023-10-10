import { render } from '@testing-library/react'
import React from 'react'
import { faker } from '@faker-js/faker'
import { EmailBlock } from '../EmailBlock'

describe(EmailBlock.Base.displayName!, () => {
  it('displays children when given no elements', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Base elements={[]}>
        <span>{value}</span>
      </EmailBlock.Base>,
    )
    expect(baseElement).toContainHTML(`<span>${value}</span>`)
  })

  it('displays children when given elements', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Base elements={[{ part: 'table' }, { part: 'row' }, { part: 'cell' }]}>
        <span>{value}</span>
      </EmailBlock.Base>,
    )

    const span = baseElement.querySelector('table > tbody > tr > td > span')
    expect(span).not.toBeNull()
    expect(span).toHaveTextContent(value)
  })

  it('displays children when given shorthand elements', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Base elements={['table', 'row', 'cell']}>
        <span>{value}</span>
      </EmailBlock.Base>,
    )

    const span = baseElement.querySelector('table > tbody > tr > td > span')
    expect(span).not.toBeNull()
    expect(span).toHaveTextContent(value)
  })

  it('passes config through to the table', () => {
    const { baseElement } = render(
      <EmailBlock.Base elements={[{ part: 'table', width: 40, maxWidth: '100%' }]}>
        <tr />
      </EmailBlock.Base>,
    )

    const table = baseElement.querySelector('table')
    expect(table).not.toBeNull()
    expect(table?.attributes.getNamedItem('width')?.value).toEqual('40')
    expect(table?.attributes.getNamedItem('style')?.value).toEqual(
      'margin: 0px; padding: 0px; max-width: 100%;',
    )
  })

  it('passes config through to the row', () => {
    const { baseElement } = render(
      <table>
        <tbody>
          <EmailBlock.Base elements={[{ part: 'row', style: { padding: 50 } }]}>
            <td />
          </EmailBlock.Base>
        </tbody>
      </table>,
    )

    const row = baseElement.querySelector('tr')
    expect(row).not.toBeNull()
    expect(row?.attributes.getNamedItem('style')?.value).toEqual('padding: 50px;')
  })

  it('passes config through to the cell', () => {
    const { baseElement } = render(
      <table>
        <tbody>
          <tr>
            <EmailBlock.Base elements={[{ part: 'cell', style: { padding: 50 } }]}>
              <span />
            </EmailBlock.Base>
          </tr>
        </tbody>
      </table>,
    )

    const cell = baseElement.querySelector('td')
    expect(cell).not.toBeNull()
    expect(cell?.attributes.getNamedItem('style')?.value).toEqual('padding: 50px;')
  })

  it('displays nothing when the given condition is false', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Base elements={[]} condition={false}>
        <span>{value}</span>
      </EmailBlock.Base>,
    )
    expect(baseElement.querySelector('div')).toBeEmptyDOMElement()
  })

  it('displays something when the given condition is true', () => {
    const value = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Base
        elements={[{ part: 'table' }, { part: 'row' }, { part: 'cell' }]}
        condition={true}
      >
        <span>{value}</span>
      </EmailBlock.Base>,
    )

    expect(baseElement.querySelector('table > tbody > tr >td')).toContainHTML(
      `<span>${value}</span>`,
    )
  })
})

describe(EmailBlock.Table.displayName!, () => {
  it('displays children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Table>
        <tr>
          <td>{text}</td>
        </tr>
      </EmailBlock.Table>,
    )
    const table = baseElement.querySelector('table')
    expect(table).not.toBeNull()
    expect(table).toContainHTML(`<tr><td>${text}</td></tr>`)
  })

  it('accepts elements', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailBlock.Table elements={[{ part: 'row' }, { part: 'cell' }]}>{text}</EmailBlock.Table>,
    )
    const table = baseElement.querySelector('table')
    expect(table).not.toBeNull()
    expect(table).toContainHTML(`<tr><td>${text}</td></tr>`)
  })

  it('accepts config props', () => {
    const { baseElement } = render(
      <EmailBlock.Table maxWidth="100%" width="unset" style={{ marginTop: 20 }}>
        <tr />
      </EmailBlock.Table>,
    )
    const table = baseElement.querySelector('table')
    expect(table).not.toBeNull()
    expect(table?.attributes.getNamedItem('style')?.value).toEqual(
      'margin: 20px 0px 0px 0px; padding: 0px; max-width: 100%;',
    )
    expect(table?.attributes.getNamedItem('width')?.value).toEqual('unset')
  })
})

describe(EmailBlock.Row.displayName!, () => {
  it('displays children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <table>
        <tbody>
          <EmailBlock.Row>
            <td>{text}</td>
          </EmailBlock.Row>
        </tbody>
      </table>,
    )
    const row = baseElement.querySelector('tr')
    expect(row).not.toBeNull()
    expect(row).toContainHTML(`<td>${text}</td>`)
  })

  it('accepts elements', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <table>
        <tbody>
          <EmailBlock.Row elements={[{ part: 'cell' }]}>{text}</EmailBlock.Row>
        </tbody>
      </table>,
    )
    const row = baseElement.querySelector('tr')
    expect(row).not.toBeNull()
    expect(row).toContainHTML(`<td>${text}</td>`)
  })

  it('accepts config props', () => {
    const { baseElement } = render(
      <table>
        <tbody>
          <EmailBlock.Row style={{ marginTop: 20 }}>
            <td />
          </EmailBlock.Row>
        </tbody>
      </table>,
    )
    const row = baseElement.querySelector('tr')
    expect(row).not.toBeNull()
    expect(row?.attributes.getNamedItem('style')?.value).toEqual('margin-top: 20px;')
  })
})

describe(EmailBlock.Cell.displayName!, () => {
  it('displays children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <table>
        <tbody>
          <tr>
            <EmailBlock.Cell>
              <span>{text}</span>
            </EmailBlock.Cell>
          </tr>
        </tbody>
      </table>,
    )
    const cell = baseElement.querySelector('td')
    expect(cell).not.toBeNull()
    expect(cell).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts elements', () => {
    const { baseElement } = render(
      <table>
        <tbody>
          <tr>
            <EmailBlock.Cell elements={[{ part: 'table' }, { part: 'row' }]}>
              {null}
            </EmailBlock.Cell>
          </tr>
        </tbody>
      </table>,
    )
    const cell = baseElement.querySelector('td')
    expect(cell).not.toBeNull()
    expect(cell?.querySelector('table')).toContainHTML('<tbody><tr /></tbody>')
  })

  it('accepts config props', () => {
    const { baseElement } = render(
      <table>
        <tbody>
          <tr>
            <EmailBlock.Cell align="center" style={{ marginTop: 20 }}>
              {null}
            </EmailBlock.Cell>
          </tr>
        </tbody>
      </table>,
    )
    const cell = baseElement.querySelector('td')
    expect(cell).not.toBeNull()
    expect(cell?.attributes.getNamedItem('style')?.value).toEqual('margin-top: 20px;')
    expect(cell?.attributes.getNamedItem('align')?.value).toEqual('center')
  })
})
