import React from 'react'
import { AuthProvider } from './AuthContext'
import { LoadingProvider } from './LoadingContext'

const RootContext: React.SFC = ({ children }) => {
  return (
    <AuthProvider>
      <LoadingProvider>{children}</LoadingProvider>
    </AuthProvider>
  )
}

export { RootContext }
