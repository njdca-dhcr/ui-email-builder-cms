import React from 'react'
import { faker } from '@faker-js/faker'
import { render } from '@testing-library/react'
import {
  Heading,
  NewLayout,
  PageContent,
  Sidebar,
  SideBarList,
  SideBarListItem,
} from '../NewLayout'

describe('NewLayout', () => {
  it('displays its children', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <NewLayout>
        <div>{text}</div>
      </NewLayout>,
    )
    expect(baseElement).toContainHTML(`<div>${text}</div>`)
  })

  it('renders as a div by default', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <NewLayout>
        <span>{text}</span>
      </NewLayout>,
    )
    const layout = baseElement.querySelector('.new-layout')
    expect(layout).not.toBeNull()
    expect(layout?.tagName).toEqual('DIV')
  })

  it('renders as a main tag when specified', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <NewLayout element="main">
        <span>{text}</span>
      </NewLayout>,
    )
    const layout = baseElement.querySelector('.new-layout')
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

  it('displays a title', () => {
    const text = faker.lorem.paragraph()
    const { baseElement } = render(
      <Sidebar>
        <div>{text}</div>
      </Sidebar>,
    )
    const sidebarTitle = baseElement.querySelector('.sidebar-title')
    expect(sidebarTitle).not.toBeNull()
    expect(sidebarTitle).toHaveTextContent('Email Builder (Beta)')
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
})
