import React, { FC } from 'react'
import { useIsSignedIn } from 'src/utils/AuthContext'
import { Button } from '../Button'

export interface SaveButtonProps {
  hasChanges: boolean
  isPending: boolean
}

export const SaveButton: FC<SaveButtonProps> = ({ hasChanges, isPending }) => {
  const isSignedIn = useIsSignedIn()

  if (!isSignedIn) return null

  return (
    <Button className="save-setting-button" disabled={isPending || !hasChanges} type="submit">
      Save
    </Button>
  )
}
