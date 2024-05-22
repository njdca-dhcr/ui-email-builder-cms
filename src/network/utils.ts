import { backendUrl } from 'src/utils/backendUrl'

export interface AuthedFetchJSONParams {
  body?: object
  idToken: string
  method: string
  path: string
}

export interface AppResponse<T = object> {
  blob?: Blob
  statusCode: number
  json?: T | null
}

type AppHeaders =
  | { Authorization: string }
  | { Authorization: string; 'Content-Type': 'application/json' }

export const authedFetchJSON = async ({
  body,
  idToken,
  method,
  path,
}: AuthedFetchJSONParams): Promise<AppResponse<any>> => {
  const url = [backendUrl() ?? '', path].join('')

  const headers: AppHeaders = ['get', 'GET'].includes(method)
    ? {
      Authorization: `Bearer ${idToken}`,
    } : {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    }

  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers,
    method,
  })
  const json = await response.json()
  return { statusCode: response.status, json }
}

export const authedFetchBlob = async ({
  body,
  idToken,
  method,
  path,
}: AuthedFetchJSONParams): Promise<AppResponse<any>> => {
  const url = [backendUrl() ?? '', path].join('')

  const headers: AppHeaders = ['get', 'GET'].includes(method)
    ? {
      Authorization: `Bearer ${idToken}`,
    } : {
      Authorization: `Bearer ${idToken}`,
      'Content-Type': 'application/json',
    }

  const response = await fetch(url, {
    body: JSON.stringify(body),
    headers,
    method,
  })
  const blob = await response.blob()
  return { statusCode: response.status, blob }
}
