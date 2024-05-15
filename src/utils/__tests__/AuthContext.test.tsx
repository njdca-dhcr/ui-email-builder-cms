import React from 'react'
import { faker } from '@faker-js/faker'
import { act, render, renderHook } from '@testing-library/react'
import { AuthProvider, useAuth, useIsSignedIn } from '../AuthContext'

beforeEach(() => {
  localStorage.removeItem('auth')
})

describe('AuthProvider', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <AuthProvider>
        <p>{text}</p>
      </AuthProvider>,
    )
    expect(baseElement).toContainHTML(`<p>${text}</p>`)
  })

  it('accepts initial auth information', () => {
    const refreshToken = faker.lorem.words(3)
    const idToken = faker.lorem.words(3)
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => {
        return <AuthProvider initialAuth={{ refreshToken, idToken }}>{children}</AuthProvider>
      },
    })
    const [auth] = result.current
    expect(auth).toEqual({ idToken, refreshToken })
  })

  it('by default there is no auth information', () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
    const [auth] = result.current
    expect(auth).toBeNull()
  })

  it('can update the auth value', () => {
    const refreshToken = faker.lorem.words(3)
    const idToken = faker.lorem.words(3)
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
    let [auth, setAuth] = result.current
    expect(auth).toBeNull()
    act(() => {
      setAuth({ idToken, refreshToken })
    })
    auth = result.current[0]
    expect(auth).toEqual({ idToken, refreshToken })
  })

  it('stores the auth value in local storage', () => {
    const refreshToken = faker.lorem.words(3)
    const idToken = faker.lorem.words(3)
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => {
        return <AuthProvider>{children}</AuthProvider>
      },
    })
    let [auth, setAuth] = result.current
    expect(auth).toBeNull()
    act(() => {
      setAuth({ idToken, refreshToken })
    })

    const storageValue = JSON.parse(localStorage.getItem('auth') as any)
    expect(storageValue).toEqual({ refreshToken, idToken })
  })

  describe('when there is already information in local storage', () => {
    it('initializes with the local storage value', () => {
      const refreshToken = faker.lorem.words(3)
      const idToken = faker.lorem.words(3)

      localStorage.setItem('auth', JSON.stringify({ refreshToken, idToken }))

      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
      const [auth, _setAuth] = result.current
      expect(auth).toEqual({ refreshToken, idToken })
    })

    it('ignores the given initial auth value in favor of the local storage value', () => {
      const refreshToken = faker.lorem.words(3)
      const idToken = faker.lorem.words(3)

      localStorage.setItem('auth', JSON.stringify({ refreshToken, idToken }))

      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => {
          return (
            <AuthProvider initialAuth={{ refreshToken: 'ignored', idToken: 'ignored' }}>
              {children}
            </AuthProvider>
          )
        },
      })
      const [auth, _setAuth] = result.current
      expect(auth).toEqual({ refreshToken, idToken })
    })
  })

  describe('when the information in local storage is invalid', () => {
    it('uses the initial auth value', () => {
      localStorage.setItem('auth', JSON.stringify({ idToken: 13, refreshToken: 12 }))
      const { result } = renderHook(() => useAuth(), {
        wrapper: ({ children }) => {
          return <AuthProvider>{children}</AuthProvider>
        },
      })
      const [auth, _setAuth] = result.current
      expect(auth).toBeNull()
    })
  })
})

describe('useIsSignedIn', () => {
  it('is true when signed in', () => {
    const { result } = renderHook(() => useIsSignedIn(), {
      wrapper: ({ children }) => {
        return (
          <AuthProvider initialAuth={{ refreshToken: 'ignored', idToken: 'ignored' }}>
            {children}
          </AuthProvider>
        )
      },
    })

    expect(result.current).toEqual(true)
  })

  it('is false when signed out', () => {
    const { result } = renderHook(() => useIsSignedIn(), {
      wrapper: ({ children }) => {
        return <AuthProvider initialAuth={undefined}>{children}</AuthProvider>
      },
    })

    expect(result.current).toEqual(false)
  })
})
