import React, { FC, useState } from 'react'
import { HeadFC, Link } from 'gatsby'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  IndexList,
  Input,
  IndexListItem,
} from 'src/ui'
import { useEmailTemplatesData } from 'src/utils/useEmailTemplatesData'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useRedirectIfNotSignedIn } from 'src/utils/useRedirectIfNotSignedIn'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { AddSquareIcon } from 'src/ui/Svg/AddSquareIcon'
import './library.css'

const TYPE_FILTERS = [
  { label: 'Adjudication', value: 'eAdjudication' },
  { label: 'Appeal', value: 'Appeal Tribunal' },
  { label: 'Certification', value: 'Certification' },
  { label: 'Dependency', value: 'Dependency' },
  { label: 'DUA', value: 'DUA' },
  { label: 'Employer', value: 'Employer' },
  { label: 'Identification verification', value: 'ID.me' },
  { label: 'MEUC', value: 'MEUC' },
  { label: 'Monetary', value: 'eMonetary' },
  { label: 'Overpayment', value: 'Overpayment' },
  { label: 'Status update', value: 'Status Update' },
  { label: 'Waiver application', value: 'Waiver Application' },
] as const

type TypeFilter = (typeof TYPE_FILTERS)[number]['value']

const LibaryPage: FC = () => {
  useRedirectIfNotSignedIn()
  const [filterQuery, setFilterQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter | null>(null)
  const lowerCaseFilterQuery = filterQuery.toLowerCase()
  const emailTemplates = useEmailTemplatesData()
  const allTypeFiltersSelected = !Boolean(typeFilter)

  const filteredByTypeEmailTemplates = emailTemplates.filter(({ name }) => {
    return allTypeFiltersSelected || (typeFilter && name.startsWith(typeFilter))
  })

  const filteredEmailTemplates = filteredByTypeEmailTemplates.filter(({ name, description }) => {
    return (
      name.toLowerCase().includes(lowerCaseFilterQuery) ||
      description?.toLowerCase().includes(lowerCaseFilterQuery)
    )
  })

  return (
    <Layout element="div">
      <Sidebar className="main-nav-sidebar">
        <SidebarNavigation />
      </Sidebar>
      <PageContent className="library-page" element="main">
        <SkipNavContent />
        <SpacedContainer>
          <div className="library-header-container">
            <div className="library-header">
              <Heading element="h1">Library</Heading>
              <Paragraph className="library-header-description">
                Check out this library of templates
              </Paragraph>
            </div>

            <form role="search" className="library-filter-form">
              <Input
                className="library-filter-input"
                id="filter-email-templates"
                list="email-templates-data-list"
                onTextChange={setFilterQuery}
                type="search"
                value={filterQuery}
              />
              <label className="library-filter-label" htmlFor="filter-email-templates">
                Filter
              </label>
              <datalist id="email-templates-data-list">
                {filteredByTypeEmailTemplates.map((emailTemplate, i) => (
                  <option key={i} value={emailTemplate.name} />
                ))}
              </datalist>
            </form>
          </div>
          <ul className="library-type-filters">
            <LibraryFilterCheckbox
              label="All"
              checked={allTypeFiltersSelected}
              onChange={() => setTypeFilter(null)}
            />
            {TYPE_FILTERS.map(({ label, value }) => (
              <LibraryTypeFilterCheckbox
                key={value}
                label={label}
                value={value}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
              />
            ))}
          </ul>
          <div className="library-list-container">
            {filteredEmailTemplates.length > 0 ? (
              <IndexList>
                {filteredEmailTemplates.map(({ id, name, description, path }) => (
                  <IndexListItem key={id}>
                    <div className="name-and-description">
                      <Link to={path} className="library-name">
                        {name}
                      </Link>
                      <p className="library-description">{description}</p>
                    </div>
                    <div className="add-translation-link-container">
                      <Link
                        to={`${path}?add-translation`}
                        className="add-translation-link own-size"
                      >
                        Add Translation <AddSquareIcon />
                      </Link>
                    </div>
                  </IndexListItem>
                ))}
              </IndexList>
            ) : (
              <Paragraph className="library-empty-message">
                Sorry, we don't have any email templates that match the current filters.
              </Paragraph>
            )}
          </div>
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default LibaryPage

export const Head: HeadFC = () => <title>{formatPageTitle('Libary')}</title>

const LibraryFilterCheckbox: FC<{
  checked: boolean
  label: string
  onChange: () => void
}> = ({ label, checked, onChange }) => {
  const id = label.toLowerCase().replace(' ', '-')

  return (
    <li className="library-type-filter">
      <label htmlFor={id}>
        {label}
        <VisuallyHidden>
          <input id={id} type="checkbox" checked={checked} onChange={onChange} />
        </VisuallyHidden>
      </label>
    </li>
  )
}

const LibraryTypeFilterCheckbox: FC<{
  label: string
  value: TypeFilter
  typeFilter: TypeFilter | null
  setTypeFilter: (typeFilter: TypeFilter | null) => void
}> = ({ label, value, typeFilter, setTypeFilter }) => {
  return (
    <LibraryFilterCheckbox
      label={label}
      checked={typeFilter === value}
      onChange={() => {
        if (typeFilter === value) {
          setTypeFilter(null)
        } else {
          setTypeFilter(value)
        }
      }}
    />
  )
}
