import { Form as FormRaw, Scope } from 'informed'
import * as React from 'react'
import styled from 'styled-components'

interface IGroupProps {
  index?: number
  snapDown?: boolean
  children: any
}

class Group extends React.Component<IGroupProps> {
  public static defaultProps = {
    snapDown: false
  }

  public render() {
    const { children, snapDown, ...props } = this.props

    if (snapDown) {
      return <SnapDown {...props}>{children}</SnapDown>
    }
    return <Default {...props}>{children}</Default>
  }
}

const Default = styled.div`
  display: flex;
  margin-bottom: 30px;
  max-width: 600px;

  &:last-child {
    margin-bottom: 20px;
  }
`

const SnapDown = styled(Default)`
  margin-bottom: 0;
  position: relative;
  bottom: -1px;

  .input .border {
    border-radius: 4px 4px 0 0;
  }
`

const Form: any = styled(FormRaw)`
  ${SnapDown} ~ ${Default}, ${SnapDown} ~ ${SnapDown} {
    &:not(:first-child) {
      .border {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
      }
    }
  }
  ${SnapDown} + ${Default} {
    & + ${Default}, & + ${SnapDown} {
      .input .border {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
  }
`

export { Form, Scope, Group }
