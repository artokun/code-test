import React from 'react'
import styled from 'styled-components'

interface IProps {
  isActive: boolean
  style?: React.CSSProperties
  onClick?: (e: React.SyntheticEvent<Element>) => void
}

type Ref = HTMLDivElement

const Hamburger = React.forwardRef<Ref, IProps>(
  ({ isActive, ...props }, ref) => {
    return (
      <Wrapper ref={ref} className={isActive ? 'is-active' : ''} {...props}>
        <div className="box">
          <div className="inner" />
        </div>
      </Wrapper>
    )
  }
)

const Wrapper = styled.div`
  padding: 15px 15px;
  display: inline-block;
  cursor: pointer;
  transition-property: opacity, filter;
  transition-duration: 0.15s;
  transition-timing-function: linear;
  font: inherit;
  color: inherit;
  text-transform: none;
  background-color: transparent;
  border: 0;
  margin: 0;
  overflow: visible;
  &:hover {
    opacity: 0.7;
  }
  &.is-active:hover {
    opacity: 0.7;
  }
  &.is-active .inner,
  &.is-active .inner::before,
  &.is-active .inner::after {
    background-color: #fff;
  }

  .box {
    width: 22px;
    height: 22px;
    display: inline-block;
    position: relative;
  }

  .inner {
    display: block;
    top: 50%;
    margin-top: -2px;
  }
  .inner,
  .inner::before,
  .inner::after {
    width: 22px;
    height: 2px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    transition-property: transform;
    transition-duration: 0.15s;
    transition-timing-function: ease;
  }
  .inner::before,
  .inner::after {
    content: '';
    display: block;
  }
  .inner::before {
    top: -10px;
  }
  .inner::after {
    bottom: -10px;
  }

  .inner {
    top: 4px;
  }
  .inner::before {
    top: 8px;
    transition-property: transform, opacity;
    transition-timing-function: ease;
    transition-duration: 0.15s;
  }
  .inner::after {
    top: 16px;
  }

  &.is-active .inner {
    transform: translate3d(0, 8px, 0) rotate(45deg);
  }
  &.is-active .inner::before {
    transform: rotate(-45deg) translate3d(-5.71429px, -6px, 0);
    opacity: 0;
  }
  &.is-active .inner::after {
    transform: translate3d(0, -16px, 0) rotate(-90deg);
  }
`

export { Hamburger }
