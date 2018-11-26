import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  children: string
  style?: React.CSSProperties
}

const Paragraph: React.SFC<IProps> = ({ children, ...rest }) => {
  return <ParagraphStyle {...rest}>{children}</ParagraphStyle>
}

const ParagraphStyle = styled.p`
  display: inline-block;
  color: #313542;
  font-family: 'Eina01';
  font-weight: normal;
  font-size: 15px;
  line-height: 26px;
  margin: 10px 0px 30px;
  padding-right: 20%;
`

export { Paragraph }
