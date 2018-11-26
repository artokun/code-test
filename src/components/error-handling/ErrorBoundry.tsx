import * as Sentry from '@sentry/browser'
import * as React from 'react'
import { Subtract } from 'utility-types'

const MISSING_ERROR = 'Error was swallowed during propagation.'

interface InjectedProps {
  onReset: () => any
  onReport: () => any
}

export const withErrorBoundary = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = Subtract<WrappedProps, InjectedProps> & {
    // here you can extend hoc props
  }
  interface IHocState {
    readonly error: Error | null | undefined
  }

  return class WithErrorBoundary extends React.Component<HocProps, IHocState> {
    public static displayName = `withErrorBoundary(${WrappedComponent.name})`

    public state: IHocState = {
      error: undefined
    }

    public componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) })
      this.logErrorToCloud(error, info)
    }

    public render() {
      const { children, ...restProps } = this.props as {
        children: React.ReactNode
      }
      const { error } = this.state

      if (error) {
        return (
          <WrappedComponent
            {...restProps}
            onReset={this.handleReset} // injected
            onReport={this.handleReport} // injected
          />
        )
      }

      return children
    }

    private logErrorToCloud = (error: Error | null, info: object) => {
      // Sentry.configureScope(scope => {
      //   Object.keys(info).forEach(key => {
      //     scope.setExtra(key, info[key])
      //   })
      // })
      // Sentry.captureException(error)
    }

    private handleReset = () => {
      this.setState({ error: undefined })
    }

    private handleReport = () => {
      // Sentry.showReportDialog()
    }
  }
}
