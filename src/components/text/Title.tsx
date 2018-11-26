import * as React from 'react'
import styled from 'styled-components'
import { device } from '../../styles/media'

interface IProps {
  children: string
  hasLine?: boolean
  style?: React.CSSProperties
}

const Title: React.SFC<IProps> = ({ hasLine, children, ...rest }) => (
  <TitleGroup>
    <TitleStyle {...rest}>{children}</TitleStyle>
    {hasLine && <TitleTrailingLineStyle />}
  </TitleGroup>
)

const TitleStyle = styled.h1`
  display: inline-block;
  color: #313542;
  font-family: 'Eina03';
  font-size: 30px;
  font-weight: bold;
  line-height: 63px;
  margin: 0px;
  @media ${device.desktop} {
    font-size: 46px;
  }
`

const TitleGroup = styled.div`
  display: flex;
`

const TitleTrailingLineStyle = styled.span`
  height: 1px;
  top: 0.4em;
  width: 100%;
  max-width: 160px;
  left: 10px;
  flex: 1;
  background-color: currentColor;
  position: relative;
  align-self: center;
`

Title.defaultProps = {
  hasLine: false
}

export { Title }
