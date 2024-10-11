export const stringFromFormData = (formData: FormData, key: string): string => {
  const result = formData.get(key) ?? ''
  if (typeof result === 'string') {
    return result
  } else {
    throw new Error(`FormData contained a file for ${key} instead of a string`)
  }
}
