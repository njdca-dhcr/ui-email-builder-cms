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
  const [typeFilters, setTypeFilters] = useState<TypeFilter[]>([])
  const lowerCaseFilterQuery = filterQuery.toLowerCase()
  const emailTemplates = useEmailTemplatesData()
  const allTypeFiltersSelected = typeFilters.length === 0

  const filteredByTypeEmailTemplates = emailTemplates.filter(({ name }) => {
    return allTypeFiltersSelected || typeFilters.some((typeFilter) => name.startsWith(typeFilter))
  })

  const filteredEmailTemplates = filteredByTypeEmailTemplates.filter(({ name, description }) => {
    return (
      name.toLowerCase().includes(lowerCaseFilterQuery) ||
      description?.toLowerCase().includes(lowerCaseFilterQuery)
    )
  })

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
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
              onChange={() => setTypeFilters([])}
            />
            {TYPE_FILTERS.map(({ label, value }) => (
              <LibraryTypeFilterCheckbox
                key={value}
                label={label}
                typeFilter={value}
                typeFilters={typeFilters}
                setTypeFilters={setTypeFilters}
              />
            ))}
          </ul>
          <div className="library-list-container">
            {filteredEmailTemplates.length > 0 ? (
              <IndexList>
                {filteredEmailTemplates.map(({ id, name, description, path }) => (
                  <IndexListItem key={id}>
                    <div>
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
                Sorry, we don't have any email templates that match the current filter.
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
  typeFilter: TypeFilter
  typeFilters: TypeFilter[]
  setTypeFilters: (typeFilters: TypeFilter[]) => void
}> = ({ label, typeFilter, typeFilters, setTypeFilters }) => {
  return (
    <LibraryFilterCheckbox
      label={label}
      checked={typeFilters.includes(typeFilter)}
      onChange={() => {
        if (typeFilters.includes(typeFilter)) {
          setTypeFilters(typeFilters.filter((activeTypeFilter) => activeTypeFilter !== typeFilter))
        } else {
          setTypeFilters([...typeFilters, typeFilter])
        }
      }}
    />
  )
}
