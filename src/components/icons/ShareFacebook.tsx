import * as React from 'react'

interface IProps {
  className?: string
  primary?: string
  secondary?: string
  onClick?: any
}

const ShareFacebook: React.SFC<IProps> = ({ primary, secondary, ...rest }) => (
  <svg width="22px" height="22px" viewBox="0 0 22 22" version="1.1" {...rest}>
    <title>Share Facebook</title>
    <g stroke="none" strokeWidth="1" fill={primary} fillRule="evenodd">
      <g transform="translate(-91.000000, -522.000000)" fillRule="nonzero" stroke={secondary}>
        <g transform="translate(51.000000, 418.000000)">
          <g transform="translate(41.000000, 105.000000)">
            <path d="M18.8966991,-7.10542736e-15 L1.10294936,-7.10542736e-15 C0.49307727,-7.10542736e-15 0,0.493546012 0,1.10330092 L0,18.896621 C0,19.5062587 0.49307727,19.9998828 1.10294936,19.9998828 L10.7026634,19.9998828 L10.7026634,12.2263476 L8.08567818,12.2263476 L8.08567818,9.25722009 L10.7032494,9.25722009 L10.7032494,7.01034552 C10.7032494,4.42699249 12.2602923,3.00807212 14.5649783,3.00807212 C15.6688652,3.00807212 16.6372075,3.08295362 16.9138042,3.11967172 L16.9138042,5.85974075 L15.2774658,5.85923294 C14.0241285,5.85923294 13.789992,6.45480841 13.789992,7.32877742 L13.789992,9.25722009 L16.7889627,9.25722009 L16.3997117,12.2263476 L13.789992,12.2263476 L13.789992,19.9998828 L18.8966991,19.9998828 C19.5062977,19.9998828 20,19.5062587 20,18.896621 L20,1.10330092 C20,0.493546012 19.5062977,-7.10542736e-15 18.8966991,-7.10542736e-15" />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

ShareFacebook.defaultProps = {
  primary: 'none',
  secondary: '#41E0F0'
}

export { ShareFacebook }
