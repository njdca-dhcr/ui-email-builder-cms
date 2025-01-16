import React, { FC } from 'react'
import { useDestroyGroup } from 'src/network/groups'
import { DestroyDialog } from './DestroyDialog'

interface DestroyGroupProps {
  group: { id: string; name: string }
}

export const DestroyGroup: FC<DestroyGroupProps> = ({ group }) => {
  const { mutateAsync, isPending, error } = useDestroyGroup()

  return (
    <DestroyDialog
      trigger="Delete"
      title="Delete Group"
      subject={group.name}
      description={`Confirm the deletion of this group`}
      onDelete={async () => {
        await mutateAsync(group.id)
      }}
      loading={isPending}
      loadingMessage="Deleting group"
      errorMessage={error?.message}
    />
  )
}
