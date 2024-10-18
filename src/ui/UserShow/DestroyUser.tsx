import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { useDestroyUser, UserShow } from 'src/network/users'
import { Dialog, Form, LoadingOverlay, ButtonLike, Button, UswdsIcon } from 'src/ui'
import { navigate } from 'gatsby'

interface DestroyUserProps {
  user: UserShow
}

export const DestroyUser: FC<DestroyUserProps> = ({ user }) => {
  const { mutateAsync, isPending, error } = useDestroyUser()

  return (
    <Dialog
      trigger={
        <ButtonLike className="delete-trigger">
          <VisuallyHidden>Delete</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title="Delete Email Template"
      description={`Are you sure you want to delete ${user.email}?`}
      contents={({ close }) => (
        <>
          <Form
            className="destroy-user-form"
            errorMessage={error?.message}
            onSubmit={async () => {
              await mutateAsync(user.id)
              close()
              navigate('/users', { replace: true })
            }}
          >
            <Button type="submit" className="delete-button">
              Delete
            </Button>
          </Form>
          {isPending && <LoadingOverlay description="Deleting user" />}
        </>
      )}
    />
  )
}
