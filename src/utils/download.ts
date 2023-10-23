export const download = (fileData: string, fileName: string, fileType: string) => {
  const blob = new Blob([fileData], { type: fileType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
}
