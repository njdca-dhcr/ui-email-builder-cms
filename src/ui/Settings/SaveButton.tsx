import React, { FC } from 'react'
import { useIsSignedIn } from 'src/utils/AuthContext'

export interface SaveButtonProps {
  hasChanges: boolean
  isPending: boolean
}

export const SaveButton: FC<SaveButtonProps> = ({ hasChanges, isPending }) => {
  const isSignedIn = useIsSignedIn()

  if (!isSignedIn) return null

  return (
    <button className="save-setting-button" disabled={isPending || !hasChanges} type="submit">
      Save
    </button>
  )
}
