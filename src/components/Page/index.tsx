import { useUser } from '@auth0/nextjs-auth0'
import { User } from '@prisma/client'
import { Site, Nav, Button, Container } from 'tabler-react'

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

const navItems = [
    {
        value: 'Home',
        to: '/',
        icon: 'home',
        useExact: true,
    },
]

const SiteWrapper = ({ children }: any) => {
    const { user, error, isLoading } = useUser()

    return (
        <Site.Wrapper
            headerProps={{
                href: '/',
                alt: 'Stoky',
                imageURL: '/logo/logo_transparent.png',
                navItems: !user && !isLoading && (
                    <Nav.Item link={false} className="d-none d-md-flex">
                        <Button
                            href="/api/auth/login"
                            outline
                            size="sm"
                            RootComponent="a"
                            color="primary"
                        >
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
    )
}

export default SiteWrapper
