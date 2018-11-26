import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const ShareIcon: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="17px" height="23px" viewBox="0 0 17 23" version="1.1" {...rest}>
    <title>Share Icon</title>
    <g className="icon" stroke="none" strokeWidth="1" fill={primary} fillRule="evenodd">
      <g transform="translate(-240.000000, -360.000000)" fill={secondary} fillRule="nonzero">
        <g transform="translate(51.000000, 348.000000)">
          <g transform="translate(189.000000, 11.000000)">
            <path d="M4.25,7 L4.25,8.0625 L12.75,8.0625 L12.75,7 L15,7 C16.1045695,7 17,7.8954305 17,9 L17,22 C17,23.1045695 16.1045695,24 15,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,9 C-1.3527075e-16,7.8954305 0.8954305,7 2,7 L4.25,7 Z M2.0625,8.0625 C1.51021525,8.0625 1.0625,8.51021525 1.0625,9.0625 L1.0625,21.9375 C1.0625,22.4897847 1.51021525,22.9375 2.0625,22.9375 L14.9375,22.9375 C15.4897847,22.9375 15.9375,22.4897847 15.9375,21.9375 L15.9375,9.0625 C15.9375,8.51021525 15.4897847,8.0625 14.9375,8.0625 L2.0625,8.0625 Z" />
            <rect x="8" y="2" width="1" height="14" />
            <path
              d="M11,3 L11,7 L10,7 L10,3 L6,3 L6,2 L11,2 L11,3 Z"
              transform="translate(8.500000, 4.500000) rotate(-45.000000) translate(-8.500000, -4.500000) "
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

ShareIcon.defaultProps = {
  primary: 'none',
  secondary: '#41e0f0'
}

export { ShareIcon }
