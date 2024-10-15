import { HeadFC, navigate, PageProps } from 'gatsby'
import React, { FC, useState } from 'react'
import { UpdateGroupErrorResponse, useGroup, useUpdateGroup } from 'src/network/groups'
import {
  Heading,
  Layout,
  PageContent,
  Paragraph,
  Sidebar,
  SkipNavContent,
  SpacedContainer,
  SidebarNavigation,
  LoadingOverlay,
  Form,
  FormField,
  Button,
} from 'src/ui'
import { FormFieldArea } from 'src/ui/Form'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { stringFromFormData } from 'src/utils/stringFromFormData'
import { useRedirectIfNotAdmin } from 'src/utils/useRedirectIfNotAdmin'

export type Props = PageProps<null, null, null>

const GroupEditPage: FC<Props> = ({ params }) => {
  useRedirectIfNotAdmin()
  const [validationErrors, setValidationErrors] = useState<
    UpdateGroupErrorResponse['errors'] | null
  >(null)
  const { data: group, isLoading, error } = useGroup(params.id)
  const { isPending, error: mutationError, mutateAsync } = useUpdateGroup(params.id)

  return (
    <Layout element="div">
      <Sidebar>
        <SidebarNavigation />
      </Sidebar>
      <PageContent element="main">
        <SkipNavContent />
        <SpacedContainer>
          <Heading element="h1">Edit Group</Heading>
          {error && <Paragraph>{error.message}</Paragraph>}
          {group && (
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
                  navigate(`/groups/${params.id}`)
                }
              }}
              errorMessage={mutationError?.message}
            >
              <FormField
                label="Name"
                id="name"
                name="name"
                required
                defaultValue={group.name}
                error={validationErrors?.name}
              />
              <FormFieldArea
                label="Description"
                id="description"
                name="description"
                error={validationErrors?.description}
                defaultValue={group.description}
              />
              <div className="group-edit-action-buttons">
                <Button type="submit">Update</Button>
                <Button type="button" className="cancel-edit" onClick={() => navigate(`/groups/${params.id}`)}>
                  Cancel
                </Button>
              </div>
            </Form>
          )}
          {isLoading && <LoadingOverlay description="Loading group" />}
          {isPending && <LoadingOverlay description="Updating group" />}
        </SpacedContainer>
      </PageContent>
    </Layout>
  )
}

export default GroupEditPage

export const Head: HeadFC = () => <title>{formatPageTitle('Edit Group')}</title>
