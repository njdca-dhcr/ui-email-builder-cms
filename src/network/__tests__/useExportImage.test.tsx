import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { asMock, userIsSignedIn } from 'src/testHelpers'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { useExportImage } from '../useExportImage'
import { faker } from '@faker-js/faker'

jest.mock('../useAuthedFetch')

describe('useExportImage', () => {
  let mockAuthedFetch: AuthedFetch
  let blob: Blob
  let emptyBlob: Blob
  let html: string
  let client: QueryClient

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    client = new QueryClient()
    html = `<html><body>${faker.lorem.paragraph()}</body></html>`
    blob = new Blob([faker.lorem.paragraph()], { type: 'image/png' })
    emptyBlob = new Blob([])
  })

  it('requests a png of the image', async () => {
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 201, blob })

    const { result } = renderHook(() => useExportImage(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(mockAuthedFetch).not.toHaveBeenCalled()
    await result.current.mutateAsync(html)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/image-export',
      method: 'POST',
      body: { html },
    })
  })

  it('returns the image', async () => {
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 201, blob })

    const { result } = renderHook(() => useExportImage(), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })

    await result.current.mutateAsync(html)
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(blob === emptyBlob).toEqual(false)
    expect(result.current.data).toEqual(blob)
  })

  describe('when the response code is not a 201 (unsuccessful)', () => {
    it('reattempts the request and returns the image', async () => {
      let numberOfCalls = 0
      asMock(mockAuthedFetch).mockImplementation(() => {
        numberOfCalls += 1

        if (numberOfCalls === 1) {
          return Promise.resolve({ statusCode: 500 })
        } else if (numberOfCalls === 2) {
          return Promise.resolve({ statusCode: 201, blob })
        } else {
          throw new Error('something went wrong')
        }
      })

      const { result } = renderHook(() => useExportImage(), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })

      expect(mockAuthedFetch).toHaveBeenCalledTimes(0)
      await result.current.mutateAsync(html)
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(mockAuthedFetch).toHaveBeenCalledTimes(2)
      expect(blob === emptyBlob).toEqual(false)
      expect(result.current.data).toEqual(blob)
    })

    it('reattempts the request and returns an empty blob if it fails again', async () => {
      asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 500 })

      const { result } = renderHook(() => useExportImage(), {
        wrapper: ({ children }) => {
          return (
            <QueryClientProvider client={client}>
              <AuthProvider>{children}</AuthProvider>
            </QueryClientProvider>
          )
        },
      })

      expect(mockAuthedFetch).toHaveBeenCalledTimes(0)
      await result.current.mutateAsync(html)
      await waitFor(() => expect(result.current.isSuccess).toEqual(true))
      expect(mockAuthedFetch).toHaveBeenCalledTimes(2)
      expect(blob === emptyBlob).toEqual(false)
      expect(result.current.data).toEqual(emptyBlob)
    })
  })
})
