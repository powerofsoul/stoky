import { User } from '@prisma/client'
import React from 'react'
import { Site, Nav, Button, Container } from 'tabler-react'
import { AppWrapper } from '../../context/AppContext'

const accountDropdownProps = (user: User) => ({
    avatarURL: user.picture,
    name: user.username,
    description: 'User',
    options: [
        { icon: 'user', value: 'Profile', to: '/profile' },
        { icon: 'settings', value: 'Settings', to: '/settings' },
        { isDivider: true },
        { icon: 'help-circle', value: 'Need help?', to: '/help' },
        { icon: 'log-out', value: 'Sign out', to: '/api/auth/logout' },
    ],
})

interface Props {
    children: any
    user: User | undefined | null
}

const SiteWrapper = ({ children, user }: Props) => {
    const navItems = user
        ? [
              {
                  value: 'Home',
                  to: '/',
                  icon: 'home',
                  useExact: true,
              },
              {
                  value: 'Portfolio',
                  to: '/portfolio',
                  icon: 'clipboard',
                  useExact: true,
              },
          ]
        : []

    return (
        <AppWrapper user={user}>
            <Site.Wrapper
                headerProps={{
                    href: '/',
                    alt: 'Stoky',
                    imageURL: '/logo/logo_transparent.png',
                    navItems: !user && (
                        <Nav.Item link={false} className="d-none d-md-flex">
                            <Button href="/auth/login" outline size="sm" RootComponent="a" color="primary">
                                Login
                            </Button>
                        </Nav.Item>
                    ),
                    accountDropdown: user && accountDropdownProps(user as any),
                }}
                footerProps={{
                    copyright: (
                        <>
                            Copyright © 2021
                            <a href="."> Stoky</a>. All rights reserved.
                        </>
                    ),
                }}
                navProps={{ itemsObjects: navItems }}
            >
                <Container className="mt-5 mb-5">{children}</Container>
            </Site.Wrapper>
        </AppWrapper>
    )
}

export default SiteWrapper
