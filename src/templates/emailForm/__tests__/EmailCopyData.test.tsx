import React, { FC, ReactNode, useContext } from 'react'
import { act, render, renderHook } from '@testing-library/react'
import { faker } from '@faker-js/faker'
import { EmailCopyData, EmailCopyDataContext, useEmailCopyData } from '../EmailCopyData'

describe('EmailCopyData', () => {
  it('renders its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <EmailCopyData>
        <div>{text}</div>
      </EmailCopyData>,
    )
    expect(baseElement).toHaveTextContent(text)
  })

  it('provides data and in context', () => {
    const initialData = { copyId: faker.lorem.paragraph() }
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <EmailCopyData initialData={initialData}>{children}</EmailCopyData>
    )
    const { result } = renderHook(() => useContext(EmailCopyDataContext), { wrapper })
    expect(result.current.data).toEqual(initialData)
  })

  it('provides an update function in context', () => {
    const initialData = { copyId: faker.lorem.paragraph() }
    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <EmailCopyData initialData={initialData}>{children}</EmailCopyData>
    )
    const { result } = renderHook(() => useContext(EmailCopyDataContext), { wrapper })

    expect(result.current.data).toEqual(initialData)
    const newData = { newCopyId: faker.lorem.paragraph() }
    act(() => {
      result.current.update(newData)
    })
    expect(result.current.data).toEqual(newData)
  })
})

describe('useEmailCopyData', () => {
  let initialData: { copyId1: string; copyId2: string }

  beforeEach(() => {
    initialData = { copyId1: faker.lorem.paragraph(), copyId2: faker.lorem.word() }
  })

  const wrapper: FC<{ children: ReactNode }> = ({ children }) => {
    return <EmailCopyData initialData={initialData}>{children}</EmailCopyData>
  }

  it('provides the correct value given a copyId', () => {
    const { result, rerender } = renderHook(({ copyId }) => useEmailCopyData(copyId), {
      wrapper,
      initialProps: { copyId: 'copyId1' },
    })
    expect(result.current.value).toEqual(initialData.copyId1)

    rerender({ copyId: 'copyId2' })
    expect(result.current.value).toEqual(initialData.copyId2)

    rerender({ copyId: 'no existing key' })
    expect(result.current.value).toEqual('')
  })

  it('provides a function that updates the value for the copyId (without changing any other value)', () => {
    const { result } = renderHook(() => useEmailCopyData('copyId1'), { wrapper })
    expect(result.current.value).toEqual(initialData.copyId1)

    const newValue = faker.lorem.word()
    act(() => {
      result.current.onChange(newValue)
    })
    expect(result.current.value).toEqual(newValue)
  })
})
