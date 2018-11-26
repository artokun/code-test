import * as React from 'react'
import styled from 'styled-components'

interface IProps {
  green?: boolean
  blue?: boolean
  clear?: boolean
  children: string
}

const Label: React.SFC<IProps> = ({ green, blue, clear, children }) => {
  switch (true) {
    case green:
      return <Green>{children}</Green>
    case blue:
      return <Blue>{children}</Blue>
    case clear:
      return <Clear>{children}</Clear>
    default:
      return <Default>{children}</Default>
  }
}

const Default = styled.span`
  display: inline-flex;
  margin-left: 10px;
  text-transform: uppercase;
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 46px;
  background-color: #eaf0f5;
  border: 1px solid #a0aab3;
  color: #808699;
  font-size: 10px;
  border-radius: 10px;
`

const Green = styled(Default)`
  background-color: #cff2e7;
  border: 1px solid #36a984;
  color: #36a984;
`

const Blue = styled(Default)`
  background-color: #d7f4fe;
  border: 1px solid #41a5f0;
  color: #41a5f0;
`

const Clear = styled(Default)`
  background-color: transparent;
  border: 1px solid #a0aab3;
  color: #b7bdd0;
  padding-top: 1px;
`

Label.defaultProps = {
  blue: false,
  clear: false,
  green: false
}

export { Label }
