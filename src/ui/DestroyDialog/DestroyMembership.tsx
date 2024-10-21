import React, { FC } from 'react'
import { MembershipShow, useDestroyMembership } from 'src/network/memberships'
import { GroupShow } from 'src/network/groups'
import { UsersIndex } from 'src/network/users'
import { DestroyDialog } from './DestroyDialog'

interface DestroyMembershipProps {
  group: GroupShow
  membership: MembershipShow
  user: UsersIndex
}

export const DestroyMembership: FC<DestroyMembershipProps> = ({ group, membership, user }) => {
  const { mutateAsync, isPending, error } = useDestroyMembership()

  return (
    <DestroyDialog
      trigger="Remove"
      title="Delete Membership"
      description={`Are you sure you want to remove ${user.email} from ${group.name}?`}
      onDelete={async () => {
        await mutateAsync(membership)
      }}
      loading={isPending}
      loadingMessage="Deleting membership"
      errorMessage={error?.message}
    />
  )
}
