const Auth0Domain = process.env.REACT_APP_AUTH0_DOMAIN || 'MISSING_AUTH0_DOMAIN'
const keys = {
  apiUrl: 'http://localhost:3000',
  imigxDomain: 'https://sandboxvr.imgix.net',
  webAuth: {
    audience: `https://${Auth0Domain}/api/v2/`,
    clientID:
      process.env.REACT_APP_AUTH0_CLIENT_ID || 'MISSING_AUTH0_CLIENT_ID',
    domain: Auth0Domain,
    responseType: 'token id_token',
    scope: 'openid email'
  }
}

export { keys }
