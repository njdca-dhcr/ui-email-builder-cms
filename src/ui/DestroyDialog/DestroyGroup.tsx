import React, { FC } from 'react'
import { navigate } from 'gatsby'
import { GroupShow, useDestroyGroup } from 'src/network/groups'
import { DestroyDialog } from './DestroyDialog'

interface DestroyGroupProps {
  group: GroupShow
}

export const DestroyGroup: FC<DestroyGroupProps> = ({ group }) => {
  const { mutateAsync, isPending, error } = useDestroyGroup()

  return (
    <DestroyDialog
      trigger="Delete"
      title="Delete Group"
      description={`Are you sure you want to delete ${group.name}?`}
      onDelete={async () => {
        await mutateAsync(group.id)
        navigate('/groups', { replace: true })
      }}
      loading={isPending}
      loadingMessage="Deleting group"
      errorMessage={error?.message}
    />
  )
}
