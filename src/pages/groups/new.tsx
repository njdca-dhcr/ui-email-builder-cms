import React, { FC, useState } from 'react'
import { HeadFC, navigate } from 'gatsby'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import {
  Button,
  Form,
  FormField,
  Heading,
  Layout,
  LoadingOverlay,
  PageContent,
  Paragraph,
  Sidebar,
  SidebarNavigation,
  SkipNavContent,
  SpacedContainer,
} from 'src/ui'
import { CreateGroupErrorResponse, useCreateGroup } from 'src/network/groups'
import { FormFieldArea } from 'src/ui/Form'
import { useRedirectIfNotAdmin } from 'src/utils/useRedirectIfNotAdmin'
import { stringFromFormData } from 'src/utils/stringFromFormData'

const NewGroupPage: FC = () => {
  useRedirectIfNotAdmin()
  const [validationErrors, setValidationErrors] = useState<
    CreateGroupErrorResponse['errors'] | null
  >(null)
  const { error, mutateAsync, isPending } = useCreateGroup()

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">New Group</Heading>
          <Paragraph>Create a new group here</Paragraph>

          <Form
            onSubmit={async (event) => {
              setValidationErrors(null)
              const formData = new FormData(event.currentTarget)
              const result = await mutateAsync({
                name: stringFromFormData(formData, 'name'),
                description: stringFromFormData(formData, 'description'),
              })

              if (result && 'errors' in result) {
                setValidationErrors(result.errors)
              } else {
                navigate('/groups')
              }
            }}
            errorMessage={error?.message}
          >
            <FormField label="Name" id="name" name="name" error={validationErrors?.name} required />
            <FormFieldArea
              label="Description"
              id="description"
              name="description"
              error={validationErrors?.description}
            />
            <Button type="submit">Create</Button>
          </Form>
          {isPending && <LoadingOverlay description="Creating group" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default NewGroupPage

export const Head: HeadFC = () => <title>{formatPageTitle('New Group')}</title>
