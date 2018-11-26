import * as React from 'react'
import styled from 'styled-components'
import { Link, RouteProps } from 'react-router-dom'
import { Logo, Facebook, Twitter } from '../icons'
import { desktop, tablet, mobile } from '../../styles/media'

interface IFooterLinks {
  company: Array<{ link: string; name: string }>
  locations: Array<{ link: string; name: string; active: boolean }>
  social: Array<{ link: string; name: 'facebook' | 'twitter' }>
}

const links: IFooterLinks = {
  company: [
    { link: '/about', name: 'About Us' },
    { link: '/contact', name: 'Contact Us' },
    { link: '/careers', name: 'Careers' }
  ],
  locations: [
    { active: true, link: '/sf', name: 'San Francisco' },
    { active: true, link: '/la', name: 'Los Angeles' },
    { active: true, link: '/bk', name: 'Bangkok' },
    { active: true, link: '/hk/en', name: 'Hong Kong' },
    { active: true, link: '/hk', name: '香港' },
    { active: true, link: '/sg', name: 'Singapore' },
    { active: false, link: '/', name: 'Austin' },
    { active: false, link: '/', name: 'Macau' },
    { active: false, link: '/', name: 'New York' },
    { active: false, link: '/', name: 'Tokyo' },
    { active: false, link: '/', name: 'Hanzhou' }
  ],
  social: [{ link: '/', name: 'facebook' }, { link: '/', name: 'twitter' }]
}

const Footer: React.SFC<RouteProps> = () => {
  const renderCompanyLinks = () => {
    return (
      <LinkCol>
        <span>Company</span>
        <ul>
          {links.company.map(l => (
            <li key={l.name}>
              <ActiveLink to={l.link}>{l.name}</ActiveLink>
            </li>
          ))}
        </ul>
      </LinkCol>
    )
  }
  const renderLocationLinks = () => {
    return (
      <LinkCol>
        <span>Locations</span>
        <ul>
          {links.locations.map(
            l =>
              l.active ? (
                <li key={l.name}>
                  <ActiveLink to={l.link}>{l.name}</ActiveLink>
                </li>
              ) : (
                <li key={l.name}>
                  <InactiveLink to={l.link}>{l.name}</InactiveLink>
                </li>
              )
          )}
        </ul>
      </LinkCol>
    )
  }
  const renderSocialLinks = () => {
    return (
      <SocialCol>
        {links.social.map(l => {
          switch (l.name) {
            case 'facebook':
              return (
                <Link key="facebook" to={l.link}>
                  <Facebook />
                </Link>
              )
            case 'twitter':
              return (
                <Link key="twitter" to={l.link}>
                  <Twitter />
                </Link>
              )
            default:
              return null
          }
        })}
      </SocialCol>
    )
  }

  return (
    <FooterWrapper>
      <FooterContent>
        <LinkRow>
          <LogoCol>
            <Logo />
          </LogoCol>
          {renderCompanyLinks()}
          {renderLocationLinks()}
        </LinkRow>
        <SocialRow>
          <CopyrightCol>© Sandbox VR 2019. All rights reserved.</CopyrightCol>
          {renderSocialLinks()}
        </SocialRow>
      </FooterContent>
    </FooterWrapper>
  )
}

const FooterWrapper = styled.footer`
  display: flex;
  position: relative;
  justify-content: center;
  min-height: 340px;
  background-color: #171b27;
  z-index: 1;
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  width: 100%;
  padding: 80px 50px 30px;
`

const LinkRow = styled.div`
  display: flex;
  flex: 1;

  @media ${mobile} {
    flex-direction: column;
  }
`

const LogoCol = styled.div`
  display: flex;
  flex: 2;
  justify-content: flex-start;

  svg {
    width: 120px;

    path {
      fill: #747d94;
    }
  }

  @media ${mobile} {
    flex: unset;
    margin-bottom: 40px;
  }
`

const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  span {
    color: #747d94;
    font-size: 12px;
    font-family: Eina03;
    text-transform: uppercase;
    letter-spacing: 2.77px;
    margin-bottom: 15px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 100px;
    margin-bottom: 80px;

    li {
      margin-right: 40px;
    }
  }

  &:last-child {
    flex: 3;
  }

  @media ${desktop} {
    ul {
      max-height: 120px;
    }
  }

  @media ${tablet} {
    ul {
      max-height: 180px;
    }
  }

  @media ${mobile} {
    flex: unset;

    &:last-child {
      flex: unset;
    }

    ul {
      max-height: unset;
      margin-bottom: 40px;
    }
  }
`

const ActiveLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  height: 30px;
  color: #a9b1c5 !important;
  font-size: 14px;
  font-family: Eina03;
  font-weight: 600;
  letter-spacing: 0;
  white-space: nowrap;
`

const InactiveLink = styled(ActiveLink)`
  color: #5c6477 !important;
  pointer-events: none;

  &:after {
    content: 'Coming Soon';
    text-transform: uppercase;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #78838a;
    font-size: 8px;
    font-family: Eina03;
    font-weight: 600;
    letter-spacing: 0;
    background: #2c3346;
    border-radius: 10px;
    height: 20px;
    width: 80px;
    margin-left: 10px;
  }
`

const SocialRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #2c3346;
  padding-top: 10px;

  @media ${mobile} {
    flex: unset;
    flex-direction: column;
    align-items: center;
    margin-bottom: 40px;
  }
`

const SocialCol = styled.div`
  a {
    margin-left: 15px;

    svg path {
      fill: #747d94;
    }

    &:first-child {
      margin-left: 0;
    }
  }

  @media ${mobile} {
    margin-top: 20px;
  }
`

const CopyrightCol = styled.div`
  color: #747d94;
  font-size: 13px;
  font-family: Eina03;
  letter-spacing: 0;

  @media ${mobile} {
    margin-top: 20px;
    order: 1;
  }
`

export { Footer }
