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

  beforeEach(() => {
    userIsSignedIn()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
  })

  it('requests a png of the image', async () => {
    const client = new QueryClient()
    const html = `<html><body>${faker.lorem.paragraph()}</body></html>`
    const blob = new Blob([])
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { blob } })

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
})
