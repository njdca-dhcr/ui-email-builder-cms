import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import {
  Actions,
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SideBarList,
  SideBarListItem,
  SideBarListItemBottom,
  SkipNavContent,
  SkipNavLink,
  SpacedContainer,
  SpacedSidebarContainer,
} from '../Layout'

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

describe('SkipNavLink', () => {
  it('is a link to the skip nav content element', async () => {
    const { baseElement } = render(<SkipNavLink />)
    const link: HTMLAnchorElement = baseElement.querySelector('a')!
    expect(link).toHaveTextContent('Skip to content')
    expect(link.href).toEqual('http://localhost/#skip-to-content')
  })
})

describe('SkipNavContent', () => {
  it('is an element with skip nav content id', () => {
    const { baseElement } = render(<SkipNavContent />)
    expect(baseElement).toContainHTML('<div id="skip-to-content"></div>')
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

describe('Actions', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Actions>
        <span>{text}</span>
      </Actions>,
    )
    const container = baseElement.querySelector('.actions')
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
