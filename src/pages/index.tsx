import React, { FC, useEffect } from 'react'
import { HeadFC, navigate } from 'gatsby'
import { Layout, LoadingOverlay } from 'src/ui'
import { formatPageTitle } from 'src/utils/formatPageTitle'
import { useAuth } from 'src/utils/AuthContext'
import { useExchangeCodeForToken } from 'src/network/useExchangeCodeForToken'

import './index.css'

const LoadingPage: FC = () => {
  const { loading, errorMessage } = useExchangeCodeForToken()

  const [auth] = useAuth()

  useEffect(() => {
    if (auth) {
      navigate('/dashboard')
    } else {
      !loading && navigate('/sign-in')
    }
  }, [auth, loading])

  useEffect(() => {
    if (errorMessage) {
      alert(errorMessage)
    }
  }, [errorMessage])

  return (
    <Layout element="div">
      <LoadingOverlay description="Signing in" />
    </Layout>
  )
}

export default LoadingPage

export const Head: HeadFC = () => <title>{formatPageTitle('Loading')}</title>
