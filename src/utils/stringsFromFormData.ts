export const stringsFromFormData = (formData: FormData, key: string): string[] => {
  const values = formData.getAll(key)

  return values.map((value) => {
    if (typeof value === 'string') {
      return value
    } else {
      throw new Error(`FormData contained a file for ${key} instead of a string`)
    }
  })
}
