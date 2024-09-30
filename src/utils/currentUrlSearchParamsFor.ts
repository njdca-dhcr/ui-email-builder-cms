export const currentUrlSearchParamsFor = (key: string) => {
  return typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get(key) : null
}
