import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  children: string
  color?: string
  hasLine?: boolean
}

const SubTitle: React.SFC<IProps> = ({ hasLine, color, children, ...rest }) => {
  return (
    <SubTitleGroup color={color}>
      <SubTitleStyle {...rest}>{children}</SubTitleStyle>
      {hasLine && <SubTitleTrailingLineStyle />}
    </SubTitleGroup>
  )
}

const SubTitleStyle = styled.h2`
  display: inline-block;
  color: currentColor;
  font-family: 'Eina03';
  font-weight: normal;
  letter-spacing: 2.77px;
  font-size: 12px;
  margin: 0px;
  text-transform: uppercase;
`

const SubTitleGroup = styled.div`
  display: flex;
  color: ${({ color }) => color || 'currentColor'};
`

const SubTitleTrailingLineStyle = styled.span`
  height: 1px;
  width: 100%;
  max-width: 160px;
  left: 10px;
  flex: 1;
  background-color: currentColor;
  position: relative;
  align-self: center;
`

SubTitle.defaultProps = {
  color: '#313542',
  hasLine: false
}

export { SubTitle }
