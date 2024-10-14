import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Dialog, Form, LoadingOverlay, ButtonLike, Button, UswdsIcon } from 'src/ui'
import { navigate } from 'gatsby'
import { GroupShow, useDestroyGroup } from 'src/network/groups'

interface DestroyGroupProps {
  group: GroupShow
}

export const DestroyGroup: FC<DestroyGroupProps> = ({ group }) => {
  const { mutateAsync, isPending, error } = useDestroyGroup()

  return (
    <Dialog
      trigger={
        <ButtonLike className="delete-trigger delete-group-trigger">
          <VisuallyHidden>Delete</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title="Delete Group"
      description={`Are you sure you want to delete ${group.name}?`}
      contents={({ close }) => (
        <>
          <Form
            className="destroy-group-form"
            errorMessage={error?.message}
            onSubmit={async () => {
              await mutateAsync(group.id)
              close()
              navigate('/groups', { replace: true })
            }}
          >
            <Button type="submit" className="delete-button">
              Delete
            </Button>
          </Form>
          {isPending && <LoadingOverlay description="Deleting group" />}
        </>
      )}
    />
  )
}
