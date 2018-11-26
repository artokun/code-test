import * as React from 'react'

interface IProps {
  primary?: string
  secondary?: string
}

const CheckBox: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg viewBox="0 0 22 22" width="1em" height="1em" {...rest}>
    <title>CheckBox</title>
    <path
      d="M3 1h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"
      fill={secondary}
      stroke={primary}
      fillRule="evenodd"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

CheckBox.defaultProps = {
  primary: '#D2D8DD',
  secondary: '#FFFFFF'
}

export { CheckBox }
