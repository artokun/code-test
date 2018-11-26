import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const ShareArrow: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="22px" height="8px" viewBox="0 0 22 8" version="1.1" {...rest}>
    <title>Share Arrow</title>
    <g stroke="none" strokeWidth="1" fill={primary} fillRule="evenodd">
      <g transform="translate(-299.000000, -659.000000)" fill={secondary} fillRule="nonzero">
        <g transform="translate(51.000000, 418.000000)">
          <path d="M260.759717,245.209465 L248,245.209465 L248,244.209465 L260.759717,244.209465 L260.759717,241 L269.510408,244.563018 L260.759717,248.126036 L260.759717,245.209465 Z" />
        </g>
      </g>
    </g>
  </svg>
)

ShareArrow.defaultProps = {
  primary: 'none',
  secondary: '#41E0F0'
}

export { ShareArrow }
