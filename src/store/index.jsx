import React from 'react'

import { Provider as MetaProvider } from './meta'

export const Provider = ({ children }) => {
  return (
    <MetaProvider>
      {children}
    </MetaProvider>
  )
}
