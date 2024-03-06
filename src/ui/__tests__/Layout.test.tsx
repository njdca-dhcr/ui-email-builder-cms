import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SideBarList,
  SideBarListItem,
  SideBarListItemBottom,
  SpacedContainer,
  SpacedSidebarContainer,
} from '../Layout'
import { asMock } from 'src/testHelpers'
import { isNJMode } from 'src/utils/appMode'

jest.mock('src/utils/appMode', () => {
  const actual = jest.requireActual('src/utils/appMode')
  return {
    ...actual,
    isNJMode: jest.fn(),
  }
})

describe('Layout', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Layout>
        <div>{text}</div>
      </Layout>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('renders as a div by default', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Layout>
        <span>{text}</span>
      </Layout>,
    )
    const layout = baseElement.querySelector('.layout')
    expect(layout).not.toBeNull()
    expect(layout?.tagName).toEqual('DIV')
  })

  it('renders as a main tag when specified', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Layout element="main">
        <span>{text}</span>
      </Layout>,
    )
    const layout = baseElement.querySelector('.layout')
    expect(layout).not.toBeNull()
    expect(layout?.tagName).toEqual('MAIN')
  })
})

describe('PageContent', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PageContent>
        <div>{text}</div>
      </PageContent>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('renders as a div by default', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PageContent>
        <span>{text}</span>
      </PageContent>,
    )
    const pageContent = baseElement.querySelector('.page-content')
    expect(pageContent).not.toBeNull()
    expect(pageContent?.tagName).toEqual('DIV')
  })

  it('renders as a main tag when specified', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PageContent element="main">
        <span>{text}</span>
      </PageContent>,
    )
    const pageContent = baseElement.querySelector('.page-content')
    expect(pageContent).not.toBeNull()
    expect(pageContent?.tagName).toEqual('MAIN')
  })

  it('accepts a class name', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <PageContent className="my-class" element="main">
        <div>{text}</div>
      </PageContent>,
    )
    const pageContent = baseElement.querySelector('.my-class')
    expect(pageContent).not.toBeNull()
    expect(pageContent?.tagName).toEqual('MAIN')
  })
})

describe('Sidebar', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Sidebar>
        <div>{text}</div>
      </Sidebar>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  describe('when in all states mode', () => {
    beforeEach(() => {
      asMock(isNJMode).mockReturnValue(false)
    })

    it('does not display a NJ department seal', () => {
      const { baseElement } = render(
        <Sidebar>
          <div />
        </Sidebar>,
      )
      expect(baseElement.querySelector('img')).toBeNull()
    })

    it('displays a generic title', () => {
      const { baseElement } = render(
        <Sidebar>
          <div />
        </Sidebar>,
      )
      const sidebarTitle = baseElement.querySelector('.sidebar-title')
      expect(sidebarTitle).not.toBeNull()
      expect(sidebarTitle).not.toHaveTextContent('New Jersey')
      expect(sidebarTitle).toHaveTextContent('Email Builder (Beta)')
    })
  })

  describe('when in NJ mode', () => {
    beforeEach(() => {
      asMock(isNJMode).mockReturnValue(true)
    })

    it('displays a NJ department seal', () => {
      const { baseElement } = render(
        <Sidebar>
          <div />
        </Sidebar>,
      )
      expect(baseElement.querySelector('a > img')).not.toBeNull()
    })

    it('displays a specific title ', () => {
      const { baseElement } = render(
        <Sidebar>
          <div />
        </Sidebar>,
      )
      const sidebarTitle = baseElement.querySelector('.sidebar-title')
      expect(sidebarTitle).not.toBeNull()
      expect(sidebarTitle).toHaveTextContent('New Jersey Email Builder (Beta)')
    })
  })

  it('accepts a class name', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Sidebar className="my-class">
        <div>{text}</div>
      </Sidebar>,
    )
    const sidebar = baseElement.querySelector('.my-class')
    expect(sidebar).toContainHTML(`<div>${text}</div>`)
  })
})

describe('SideBarList', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <SideBarList>
        <div>{text}</div>
      </SideBarList>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })
})

describe('SideBarListItem', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <SideBarListItem>
        <div>{text}</div>
      </SideBarListItem>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('accepts a className', () => {
    const { baseElement } = render(
      <SideBarListItem className="my-class">
        <div />
      </SideBarListItem>,
    )
    expect(baseElement).toContainHTML('<li class="sidebar-list-item my-class"><div></div></li>')
  })
})

describe('SideBarListItemBottom', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <SideBarListItemBottom>
        <div>{text}</div>
      </SideBarListItemBottom>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })
})

describe('Heading', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Heading element="h1">
        <div>{text}</div>
      </Heading>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('renders as the given element (h1)', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Heading element="h1">
        <div>{text}</div>
      </Heading>,
    )
    expect(baseElement.querySelector('h1')).not.toBeNull()
    expect(baseElement.querySelector('h2')).toBeNull()
  })

  it('renders as the given element (h2)', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Heading element="h2">
        <div>{text}</div>
      </Heading>,
    )
    expect(baseElement.querySelector('h1')).toBeNull()
    expect(baseElement.querySelector('h2')).not.toBeNull()
  })

  it('accepts a subheading prop', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Heading element="h1" subheading>
        <div>{text}</div>
      </Heading>,
    )
    const heading = baseElement.querySelector('h1.subheading')
  })
})

describe('Paragraph', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Paragraph>
        <span>{text}</span>
      </Paragraph>,
    )
    const paragraph = baseElement.querySelector('p')
    expect(paragraph).not.toBeNull()
    expect(paragraph).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts a className', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Paragraph className="my-class">
        <span>{text}</span>
      </Paragraph>,
    )
    const paragraph = baseElement.querySelector('p')
    expect(paragraph).not.toBeNull()
    expect(paragraph?.className).toEqual('paragraph my-class')
  })
})

describe('SpacedContainer', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <SpacedContainer>
        <span>{text}</span>
      </SpacedContainer>,
    )
    const container = baseElement.querySelector('.spaced-container')
    expect(container).not.toBeNull()
    expect(container).toContainHTML(`<span>${text}</span>`)
  })
})

describe('SpacedSidebarContainer', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <SpacedSidebarContainer>
        <span>{text}</span>
      </SpacedSidebarContainer>,
    )
    const container = baseElement.querySelector('.spaced-sidebar-container')
    expect(container).not.toBeNull()
    expect(container).toContainHTML(`<span>${text}</span>`)
  })

  it('accepts a className', () => {
    const { baseElement } = render(
      <SpacedSidebarContainer className="my-class">
        <span />
      </SpacedSidebarContainer>,
    )
    const container = baseElement.querySelector('.spaced-sidebar-container.my-class')
    expect(container).not.toBeNull()
  })
})
