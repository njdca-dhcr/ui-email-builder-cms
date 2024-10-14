import React, { FC } from 'react'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import { Dialog, Form, LoadingOverlay, ButtonLike, Button, UswdsIcon } from 'src/ui'
import { MembershipShow, useDestroyMembership } from 'src/network/memberships'
import { GroupShow } from 'src/network/groups'
import { UsersIndex } from 'src/network/useUsers'

interface DestroyMembershipProps {
  group: GroupShow
  membership: MembershipShow
  user: UsersIndex
}

export const DestroyMembership: FC<DestroyMembershipProps> = ({ group, membership, user }) => {
  const { mutateAsync, isPending, error } = useDestroyMembership()

  return (
    <Dialog
      trigger={
        <ButtonLike className="delete-trigger delete-membership-trigger">
          <VisuallyHidden>Remove</VisuallyHidden>
          <UswdsIcon icon="Delete" />
        </ButtonLike>
      }
      title="Delete Group"
      description={`Are you sure you want to remove ${user.email} from ${group.name}?`}
      contents={({ close }) => (
        <>
          <Form
            className="destroy-group-form"
            errorMessage={error?.message}
            onSubmit={async () => {
              await mutateAsync(membership)
              close()
            }}
          >
            <Button type="submit" className="delete-button">
              Remove
            </Button>
          </Form>
          {isPending && <LoadingOverlay description="Deleting membership" />}
        </>
      )}
    />
  )
}
