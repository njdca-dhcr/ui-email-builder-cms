import { HeadFC, navigate, PageProps } from 'gatsby'
import React, { FC, useState } from 'react'
import { UpdateGroupErrorResponse, useGroup, useUpdateGroup } from 'src/network/groups'
import { Button, LoadingOverlay } from 'src/ui'
import { Form, FormField, FormFieldArea } from 'src/ui/Form'
import { Layout, PageContent, Sidebar } from 'src/ui/Settings/Shared'
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
    <Layout>
      <Sidebar />
      <PageContent>
        <h1>Edit Group</h1>
        {error && <p>{error.message}</p>}
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
              <Button
                type="button"
                className="cancel-edit"
                onClick={() => navigate(`/settings/groups/${params.id}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
        {isLoading && <LoadingOverlay description="Loading group" />}
        {isPending && <LoadingOverlay description="Updating group" />}
      </PageContent>
    </Layout>
  )
}

export default GroupEditPage

export const Head: HeadFC = () => <title>{formatPageTitle('Edit Group')}</title>
