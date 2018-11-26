import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

export interface ILoadingContext {
  load: () => any
}

const defaultContext: ILoadingContext = {
  load: () => {}
}

const LoadingContext = React.createContext(defaultContext)

const LoadingComponent: React.SFC<RouteComponentProps> = ({ children }) => {
  const loaderRef = document.getElementById('loading')
  const [state] = useState({
    load: () => {
      if (loaderRef) {
        loaderRef.classList.add('entered')
        setTimeout(() => {
          loaderRef.remove()
        }, 1500)
      }
    }
  })

  return (
    <LoadingContext.Provider value={state}>{children}</LoadingContext.Provider>
  )
}

const LoadingConsumer = LoadingContext.Consumer
const LoadingProvider = withRouter(LoadingComponent)
export { LoadingProvider, LoadingConsumer }
export default LoadingContext
