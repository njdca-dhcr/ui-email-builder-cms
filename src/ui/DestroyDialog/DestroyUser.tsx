import React, { FC } from 'react'
import { useDestroyUser, UserShow } from 'src/network/users'
import { navigate } from 'gatsby'
import { DestroyDialog } from './DestroyDialog'

interface DestroyUserProps {
  user: UserShow
}

export const DestroyUser: FC<DestroyUserProps> = ({ user }) => {
  const { mutateAsync, isPending, error } = useDestroyUser()

  return (
    <DestroyDialog
      trigger="Delete"
      title="Delete User"
      description={`Are you sure you want to delete ${user.email}?`}
      onDelete={async () => {
        await mutateAsync(user.id)
        navigate('/users', { replace: true })
      }}
      loading={isPending}
      loadingMessage="Deleting user"
      errorMessage={error?.message}
    />
  )
}
