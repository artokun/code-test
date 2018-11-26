import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const ShareLink: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="15px" height="19px" viewBox="0 0 15 19" version="1.1" {...rest}>
    <title>ShareLink</title>
    <g stroke="none" strokeWidth="1" fill={primary} fillRule="evenodd">
      <g transform="translate(-94.000000, -655.000000)" fill={secondary} fillRule="nonzero">
        <g transform="translate(51.000000, 418.000000)">
          <path
            d="M50.5,242 C50.7761424,242 51,242.223858 51,242.5 L51,250.5 C51,250.776142 50.7761424,251 50.5,251 C50.2238576,251 50,250.776142 50,250.5 L50,242.5 C50,242.223858 50.2238576,242 50.5,242 Z M56,244 L55,244 L55,242.5 C55,240.014719 52.9852814,238 50.5,238 C48.0147186,238 46,240.014719 46,242.5 L46,244 L45,244 L45,242.5 C45,239.462434 47.4624339,237 50.5,237 C53.5375661,237 56,239.462434 56,242.5 L56,244 Z M56,249 L56,250.5 C56,253.537566 53.5375661,256 50.5,256 C47.4624339,256 45,253.537566 45,250.5 L45,249 L46,249 L46,250.5 C46,252.985281 48.0147186,255 50.5,255 C52.9852814,255 55,252.985281 55,250.5 L55,249 L56,249 Z"
            transform="translate(50.500000, 246.500000) rotate(-330.000000) translate(-50.500000, -246.500000) "
          />
        </g>
      </g>
    </g>
  </svg>
)

ShareLink.defaultProps = {
  primary: 'none',
  secondary: '#41E0F0'
}

export { ShareLink }
