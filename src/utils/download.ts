interface DownloadProps {
  fileBlob?: any
  fileData?: string
  fileName: string
  fileType: string
}

export const download = ({ fileBlob, fileData = '', fileName, fileType }: DownloadProps) => {
  const blob = fileBlob ? fileBlob : new Blob([fileData], { type: fileType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = fileName
  document.body.appendChild(link)
  link.click()
  link.remove()
}
