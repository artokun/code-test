import { asField, BasicText } from 'informed'
import React from 'react'
import styled from 'styled-components'

interface IInputProps {
  fieldState: any
  style: React.CSSProperties
  icon: any
  iconColors: string[]
  iconSize: number
  attempted: boolean
  message: string
}

const Input: React.StatelessComponent<IInputProps & any> = asField(
  (props: IInputProps) => {
    const { fieldState, icon, iconColors, iconSize, attempted, ...rest } = props
    let { message } = props
    const { value, error } = fieldState

    const showError = attempted && !!error

    let colors = {}

    if (iconColors && value && !showError) {
      colors = {
        primary: iconColors[0],
        secondary: iconColors[1],
        tertiary: iconColors[2]
      }
    } else if (showError) {
      message = error
    }

    const generateIcon = () => {
      const Icon: any = icon
      return icon ? (
        <IconProvider size={iconSize}>
          <Icon {...colors} />
        </IconProvider>
      ) : null
    }

    return (
      <React.Fragment>
        <InputWrapper className="input" icon={icon ? 1 : 0} {...props}>
          <span className={`border ${showError ? ' error' : ''}`} />
          <BasicText fieldState={fieldState} {...rest} />
          {generateIcon()}
          {message && (
            <MessageProvider
              style={{ color: showError ? '#ec6b8c' : '#899197' }}
            >
              {message}
            </MessageProvider>
          )}
        </InputWrapper>
      </React.Fragment>
    )
  }
)

const InputWrapper = styled.span<{ icon: React.StatelessComponent }>`
  display: flex;
  width: 100%;
  height: 56px;
  flex: 1;
  position: relative;

  input {
    width: 100%;
    -webkit-appearance: none;
    background-color: transparent;
    border: none;
    color: #313542;
    font-weight: 600;
    padding-left: ${({ icon }) => (icon ? '40px' : '20px')};
    font-family: 'Eina03';
    font-size: 15px;
    position: relative;
    top: 1px;

    &:focus {
      outline: none;
    }

    &[type='password']:not([value='']) {
      font-size: 20px;
      padding-bottom: 2px;
    }

    &::placeholder {
      color: #acb4bc;
      top: 0px;
      font-size: 15px;
      font-weight: 400;
    }
  }

  small {
    position: absolute;
    color: red;
    bottom: -8px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
  }

  .border {
    position: absolute;
    pointer-events: none;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border: 1px solid #d2d8dd;

    &.error {
      z-index: 1;
      border: 1px solid #ec6b8c;
    }
  }

  &:first-child {
    .border {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
      border-top-width: 1px;
    }
  }

  &:not(:first-child) {
    .border {
      left: -1px;
    }
  }

  &:last-child {
    .border {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      border-top-width: 1px;
    }
  }
`

const IconProvider = styled.span<{ size: number }>`
  height: 30px;
  width: 30px;
  position: absolute;
  left: 5px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    position: relative;
    top: 2px;
    width: ${({ size }) => (size ? size : 25)}px;
    height: ${({ size }) => (size ? size : 25)}px;
  }
`

const MessageProvider = styled.span`
  display: block;
  white-space: pre-line;
  position: absolute;
  text-transform: uppercase;
  right: 10px;
  color: #899197;
  pointer-events: none;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Eina03';
  font-size: 10px;
  letter-spacing: 0;
`

Input.defaultProps = {
  attempted: false,
  icon: null,
  iconColors: [],
  iconSize: 25,
  style: {}
}

export { Input }
