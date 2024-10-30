import React, { ReactNode, SyntheticEvent, useState } from 'react'
import { faker } from '@faker-js/faker'
import { RenderHookResult, act, render, renderHook } from '@testing-library/react'
import {
  CurrentlyActiveEmailPart,
  CurrentlyActiveEmailPartContext,
  useClearCurrentlyActiveEmailPart,
  useCurrentlyActiveEmailPartData,
  useIsCurrentlyActiveEmailComponent,
  useIsCurrentlyActiveEmailPart,
} from '../CurrentlyActiveEmailPart'
import { EmailTemplate } from 'src/appTypes'
import { buildUniqueEmailComponent, buildUniqueEmailSubComponent } from 'src/testHelpers'

const Dummy = ({ children, initialValue }: { children: ReactNode; initialValue: string }) => {
  const value = useState(initialValue)
  return (
    <CurrentlyActiveEmailPartContext.Provider value={value}>
      {children}
    </CurrentlyActiveEmailPartContext.Provider>
  )
}

const renderHookWithContext = <Result,>(
  render: () => Result,
  initialValue: string,
): RenderHookResult<Result, any> => {
  return renderHook(render, {
    wrapper: ({ children }) => {
      return <Dummy initialValue={initialValue}>{children}</Dummy>
    },
  })
}

let event: SyntheticEvent<any>

const buildEvent = (options: Partial<SyntheticEvent<any>>): SyntheticEvent<any> => options as any

beforeEach(() => {
  event = buildEvent({
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  })
})

describe('CurrentlyActiveEmailPart', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <CurrentlyActiveEmailPart>
        <span>{text}</span>
      </CurrentlyActiveEmailPart>,
    )
    expect(baseElement).toContainHTML(`<span>${text}</span>`)
  })
})

describe('useIsCurrentlyActiveEmailPart', () => {
  let id: string

  beforeEach(() => {
    id = faker.lorem.word()
  })

  describe('isActive', () => {
    it('is true when the given id is active', () => {
      const { result } = renderHookWithContext(() => useIsCurrentlyActiveEmailPart(id), id)
      expect(result.current.isActive).toEqual(true)
    })

    it('is false when the given id is inactive', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailPart(id),
        'not the id',
      )
      expect(result.current.isActive).toEqual(false)
    })
  })

  describe('activate', () => {
    it('makes the id active', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailPart(id),
        'not the id',
      )
      expect(result.current.isActive).toEqual(false)
      act(() => {
        result.current.activate(event)
      })
      expect(result.current.isActive).toEqual(true)
    })

    it('prevents default', () => {
      const { result } = renderHookWithContext(() => useIsCurrentlyActiveEmailPart(id), '')
      expect(event.preventDefault).not.toHaveBeenCalled()
      act(() => {
        result.current.activate(event)
      })
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('stops propagation', () => {
      const { result } = renderHookWithContext(() => useIsCurrentlyActiveEmailPart(id), '')
      expect(event.stopPropagation).not.toHaveBeenCalled()
      act(() => {
        result.current.activate(event)
      })
      expect(event.stopPropagation).toHaveBeenCalled()
    })
  })
})

describe('useClearCurrentlyActiveEmailPart', () => {
  it('sets the current active email part to an empty string', () => {
    const id = faker.lorem.word()
    const { result } = renderHookWithContext(() => {
      const [activeId] = useCurrentlyActiveEmailPartData()
      return {
        activeId,
        clear: useClearCurrentlyActiveEmailPart(),
      }
    }, id)
    expect(result.current.activeId).toEqual(id)
    act(() => result.current.clear())
    expect(result.current.activeId).toEqual('')
  })
})

describe('useIsCurrentlyActiveEmailComponent', () => {
  let emailComponent: EmailTemplate.Unique.Component
  let emailSubComponent: EmailTemplate.Unique.SubComponent

  beforeEach(() => {
    emailSubComponent = buildUniqueEmailSubComponent({ kind: 'Title' })
    emailComponent = buildUniqueEmailComponent('Header', {
      subComponents: [
        buildUniqueEmailSubComponent({ kind: 'DepartmentSeal' }),
        emailSubComponent,
        buildUniqueEmailSubComponent({ kind: 'ProgramName' }),
      ],
    })
  })

  describe('isComponentActive', () => {
    it('is true when the active id belongs to the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailComponent.id,
      )
      expect(result.current.isComponentActive).toEqual(true)
    })

    it('is false when the active does not belong to the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailSubComponent.id,
      )
      expect(result.current.isComponentActive).toEqual(false)
    })
  })

  describe('isSubComponentActive', () => {
    it('is true when the active id belongs to a subcomponent of the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailSubComponent.id,
      )
      expect(result.current.isSubComponentActive).toEqual(true)
    })

    it('is false when the active does not belong to the subcomponent', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailComponent.id,
      )
      expect(result.current.isSubComponentActive).toEqual(false)
    })
  })

  describe('isActive', () => {
    it('is true when the active id belongs to the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailComponent.id,
      )
      expect(result.current.isActive).toEqual(true)
    })

    it('is true when the active id belongs to a subcomponent of the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        emailSubComponent.id,
      )
      expect(result.current.isActive).toEqual(true)
    })

    it('is false when the active does not belong to the component', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        faker.lorem.word(),
      )
      expect(result.current.isActive).toEqual(false)
    })
  })

  describe('activate', () => {
    it('makes the component id active', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        'not the id',
      )
      expect(result.current.isComponentActive).toEqual(false)
      act(() => {
        result.current.activate(event)
      })
      expect(result.current.isComponentActive).toEqual(true)
    })

    it('prevents default', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        '',
      )
      expect(event.preventDefault).not.toHaveBeenCalled()
      act(() => {
        result.current.activate(event)
      })
      expect(event.preventDefault).toHaveBeenCalled()
    })

    it('stops propagation', () => {
      const { result } = renderHookWithContext(
        () => useIsCurrentlyActiveEmailComponent(emailComponent),
        '',
      )
      expect(event.stopPropagation).not.toHaveBeenCalled()
      act(() => {
        result.current.activate(event)
      })
      expect(event.stopPropagation).toHaveBeenCalled()
    })
  })
})
