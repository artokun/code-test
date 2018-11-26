import { asField, Checkbox } from 'informed'
import React from 'react'
import styled from 'styled-components'
import { CheckBox, CheckMark } from '../../icons'

interface ICheckboxProps {
  fieldState: any
  field: string
  children: string | JSX.Element
  style: React.CSSProperties
  icon: React.StatelessComponent
  iconColors: string[]
  iconSize: number
}

const VRCheckbox: React.ComponentType<ICheckboxProps> = asField(
  (props: ICheckboxProps) => {
    const { fieldState, style, children, field, ...rest } = props
    const { value, error } = fieldState

    let colors = { primary: 'white', secondary: 'black' }
    if (value) {
      colors = {
        primary: '#41A5F0',
        secondary: '#D7F4FE'
      }
    }

    return (
      <CheckboxWrapper className="input" style={{ ...style }} {...rest}>
        <IconProvider>
          <CheckBox {...colors} />
          {value && (
            <CheckMark style={{ width: 13, height: 13 }} primary="#41A5F0" />
          )}
        </IconProvider>
        <Checkbox
          fieldState={fieldState}
          field={field}
          style={{ display: 'none' }}
        />
        <span className="checkbox-content">{children}</span>
        {error ? <small style={{ color: 'red' }}>{error}</small> : null}
      </CheckboxWrapper>
    )
  }
)

const CheckboxWrapper = styled.label`
  display: flex;
  width: 100%;
  flex: 1;
  position: relative;
  align-items: center;
  cursor: pointer;

  small {
    position: absolute;
    color: red;
    bottom: -8px;
    left: 10px;
    background-color: white;
    padding: 0 5px;
  }

  .checkbox-content {
    user-select: none;
    font-size: 15px;
    padding-left: 10px;
    color: #313542;
  }
`

const IconProvider = styled.span`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;

  svg {
    position: absolute;
    width: 22px;
    height: 22px;
  }
`

export { VRCheckbox as Checkbox }
