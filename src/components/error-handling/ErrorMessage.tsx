import * as React from 'react'
import styled from 'styled-components'

export const ErrorMessage: React.SFC<{
  onReset: () => void
  onReport: () => void
}> = ({ onReset, onReport }) => {
  return (
    <Wrapper>
      <div>
        <p>We're sorry — something's gone wrong. </p>
        <p>
          <a onClick={onReset}>go to home page</a>
          <br />
          <a onClick={onReport}>Submit report</a>
        </p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  text-align: center;
  align-items: center;
  font-family: 'Eina01';

  a {
    cursor: pointer;
    font-weight: bold;
  }
`

export function test(props: any) {
  const Container = props.componentClass
  return <Container />
}
