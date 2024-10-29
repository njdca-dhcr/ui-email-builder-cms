import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import React, { FC } from 'react'
import {
  ShouldShowEmailPart,
  useShouldShowEmailPart,
  useShouldShowEmailPart2,
} from '../ShouldShowEmailPart'
import userEvent from '@testing-library/user-event'
import {
  buildUniqueEmailComponent,
  buildUniqueEmailConfig,
  buildUniqueEmailSubComponent,
} from 'src/factories'
import { EmailPartsContent } from '../EmailPartsContent'

describe('ShouldShowEmailPart', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <ShouldShowEmailPart>
        <span>{text}</span>
      </ShouldShowEmailPart>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })

  const Dummy: FC<{ id: string }> = ({ id }) => {
    const shouldShow = useShouldShowEmailPart(id)
    return (
      <div>
        {shouldShow.on ? 'on' : 'off'}
        <button onClick={shouldShow.toggle}>toggle</button>
      </div>
    )
  }

  it('toggles parts on and off', async () => {
    const user = userEvent.setup()
    const { getByRole, baseElement } = render(
      <ShouldShowEmailPart>
        <Dummy id={faker.lorem.word()} />
      </ShouldShowEmailPart>,
    )

    expect(baseElement).toHaveTextContent('on')
    expect(baseElement).not.toHaveTextContent('off')

    await user.click(getByRole('button'))
    expect(baseElement).not.toHaveTextContent('on')
    expect(baseElement).toHaveTextContent('off')

    await user.click(getByRole('button'))
    expect(baseElement).toHaveTextContent('on')
    expect(baseElement).not.toHaveTextContent('off')
  })

  it('accepts initial data', () => {
    const id = faker.lorem.word()
    const { baseElement } = render(
      <ShouldShowEmailPart initialData={{ [id]: false }}>
        <Dummy id={id} />
      </ShouldShowEmailPart>,
    )

    expect(baseElement).not.toHaveTextContent('on')
    expect(baseElement).toHaveTextContent('off')
  })
})

describe('useShouldShowEmailPart', () => {
  xit('toggles parts on and off', async () => {
    const dateRange = buildUniqueEmailSubComponent('Header', { kind: 'DateRange' })
    const title = buildUniqueEmailSubComponent('Header', {
      kind: 'Title',
      defaultValue: { visible: true, title: faker.lorem.word() },
    })
    const programName = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
    const header = buildUniqueEmailComponent('Header', {
      subComponents: [dateRange, title, programName],
    })
    const emailTemplate = buildUniqueEmailConfig({ components: [header] })

    const { result } = renderHook(() => useShouldShowEmailPart2(title.id), {
      wrapper: ({ children }) => {
        return <EmailPartsContent>{children}</EmailPartsContent>
      },
    })

    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.on).toEqual(false)
    expect(result.current.off).toEqual(true)

    act(() => {
      result.current.toggle()
    })
    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)
  })

  it('if a component/subcomponent lacks a `visible` value it defaults to true and should show', async () => {
    const dateRange = buildUniqueEmailSubComponent('Header', { kind: 'DateRange' })
    const title = buildUniqueEmailSubComponent('Header', {
      kind: 'Title',
      defaultValue: { visible: undefined, title: faker.lorem.word() },
    })
    const programName = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
    const header = buildUniqueEmailComponent('Header', {
      subComponents: [dateRange, title, programName],
    })
    const emailTemplate = buildUniqueEmailConfig({ components: [header] })

    const { result } = renderHook(() => useShouldShowEmailPart2(title.id), {
      wrapper: ({ children }) => {
        return <EmailPartsContent>{children}</EmailPartsContent>
      },
    })

    expect(result.current.on).toEqual(true)
    expect(result.current.off).toEqual(false)
  })

  fit('if a component/subcomponent has visible false, it should now show', async () => {
    const dateRange = buildUniqueEmailSubComponent('Header', { kind: 'DateRange' })
    const title = buildUniqueEmailSubComponent('Header', {
      kind: 'Title',
      defaultValue: { visible: false, title: faker.lorem.word() },
    })
    const programName = buildUniqueEmailSubComponent('Header', { kind: 'ProgramName' })
    const header = buildUniqueEmailComponent('Header', {
      subComponents: [dateRange, title, programName],
    })
    const emailTemplate = buildUniqueEmailConfig({ components: [header] })

    const { result } = renderHook(() => useShouldShowEmailPart2(title.id), {
      wrapper: ({ children }) => {
        return <EmailPartsContent>{children}</EmailPartsContent>
      },
    })

    expect(result.current.on).toEqual(false)
    expect(result.current.off).toEqual(true)
  })
})
