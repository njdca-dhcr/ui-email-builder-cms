import { navigate } from 'gatsby'
import { useEffect } from 'react'
import { useIsSignedIn } from './AuthContext'

export const useRedirectIfNotSignedIn = () => {
  const isSignedIn = useIsSignedIn()

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/sign-in')
    }
  }, [isSignedIn])
}
