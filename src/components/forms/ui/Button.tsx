import * as React from 'react'
import styled from 'styled-components'

interface IButtonProps {
  icon: React.StatelessComponent
  iconProps: any
  iconRight: boolean
  secondary: boolean
}

const Button: React.StatelessComponent<IButtonProps & any> = ({
  children,
  icon,
  iconProps,
  secondary,
  ...props
}) => {
  const generateIcon = () => {
    const Icon = icon
    return icon ? <Icon {...iconProps} /> : null
  }

  if (secondary) {
    return (
      <Secondary {...props}>
        {generateIcon()}
        <span>{children}</span>
      </Secondary>
    )
  }
  return (
    <Primary {...props}>
      {generateIcon()}
      <span>{children}</span>
    </Primary>
  )
}

const Default = styled.button<{ iconRight: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: ${({ iconRight }) => (iconRight ? 'row-reverse' : 'row')};
  appearance: none;
  border: none;
  margin-top: 20px;
  font-family: 'Eina01';
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  cursor: pointer;

  & > svg {
    margin: 0 10px;
    font-size: 1.5em;
  }
`

const Primary = styled(Default)`
  min-width: 175px;
  height: 60px;
  background: #41a5f0;
  padding: 0 63px;
  box-shadow: 0 18px 30px -10px rgba(0, 0, 0, 0.17);
  border-radius: 3px 3px 3px 3px;
  color: #ffffff;

  transition: background-color 0.1s ease-in-out;

  &:disabled {
    opacity: 0.5;

    &:hover {
      background-color: #41a5f0;
    }
  }

  &:hover {
    background-color: #2f91da;
  }
`

const Secondary = styled(Default)`
  background: transparent;
  padding: 10px;
  color: #41a5f0;
  font-size: 14px;

  &:disabled {
    opacity: 0.5;
  }

  &:hover {
    color: #ffffff;
  }
`

Button.defaultProps = {
  iconProps: { primary: 'currentColor' },
  iconRight: false
}

export { Button }
