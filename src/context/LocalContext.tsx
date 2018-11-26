import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'

export interface ILocaleContext {}

const defaultContext: ILocaleContext = {}

const LocaleContext = React.createContext(defaultContext)

class LocaleComponent extends Component<RouteComponentProps, ILocaleContext> {
  constructor(props: RouteComponentProps) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <LocaleContext.Provider value={this.state}>
        {this.props.children}
      </LocaleContext.Provider>
    )
  }
}

const LocaleConsumer = LocaleContext.Consumer
const LocaleProvider = withRouter(LocaleComponent)
export { LocaleProvider, LocaleConsumer }
