import { faker } from '@faker-js/faker'
import { download } from '../download'

describe('download', () => {
  beforeEach(() => { })

  it('downloads the given string as a file', async () => {
    const text = faker.lorem.paragraph()
    const fileName = `${faker.lorem.word()}.txt`
    const dataUrl = `data://${faker.lorem.word()}`
    global.URL.createObjectURL = jest.fn().mockReturnValue(dataUrl)

    const handleClick = jest.fn().mockImplementation((event: MouseEvent) => {
      const target: HTMLAnchorElement = event.target as any
      expect(target).not.toBeNull()
      expect(target.href).toEqual(dataUrl)
      expect(target.download).toEqual(fileName)
    })
    document.body.addEventListener('click', handleClick)

    expect(handleClick).not.toHaveBeenCalled()
    download({ fileData: text, fileName, fileType: 'plain/txt' })
    expect(handleClick).toHaveBeenCalled()
  })
})
