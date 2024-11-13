import React from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { BatchTagIndex, useBatchTags } from '../useBatchTags'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from 'src/utils/AuthContext'
import { AuthedFetch, useAuthedFetch } from '../useAuthedFetch'
import { asMock, buildTag, userIsSignedIn } from 'src/testHelpers'

jest.mock('../useAuthedFetch')

describe('useBatchTags', () => {
  let mockAuthedFetch: AuthedFetch
  let tag1: BatchTagIndex
  let tag2: BatchTagIndex

  beforeEach(() => {
    userIsSignedIn()
    tag1 = buildTag()
    tag2 = buildTag()
  })

  it('queries for an array of tags', async () => {
    const client = new QueryClient()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { tags: [tag1, tag2] } })
    const { result } = renderHook(() => useBatchTags([tag1.name, tag2.name]), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })

    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(mockAuthedFetch).toHaveBeenCalledWith({
      path: '/tags/batch',
      method: 'POST',
      body: { tags: [tag1.name, tag2.name] },
    })
  })

  it('returns the array of tags', async () => {
    const client = new QueryClient()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { tags: [tag1, tag2] } })
    const { result } = renderHook(() => useBatchTags([tag1.name, tag2.name]), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    await waitFor(() => expect(result.current.isSuccess).toEqual(true))
    expect(result.current.data).toEqual([tag1, tag2])
  })

  it('does not query when there are no tags', async () => {
    const client = new QueryClient()
    mockAuthedFetch = jest.fn()
    asMock(useAuthedFetch).mockReturnValue(mockAuthedFetch)
    asMock(mockAuthedFetch).mockResolvedValue({ statusCode: 200, json: { tags: [tag1, tag2] } })
    const { result } = renderHook(() => useBatchTags([]), {
      wrapper: ({ children }) => {
        return (
          <QueryClientProvider client={client}>
            <AuthProvider>{children}</AuthProvider>
          </QueryClientProvider>
        )
      },
    })
    expect(result.current.isLoading).toBeFalsy()
  })
})
