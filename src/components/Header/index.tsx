import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";

import { Site, Nav, Button, Form } from "tabler-react";
import { User } from "../../../models/User";

const loadingHeader = () => {
    return <Site.Header
        href="/"
        alt="Tabler React"
        imageURL="/logo/logo_transparent.png"
        searchBar={<Form.Input
            icon="search"
            position="prepend"
            placeholder="Search"
            tabIndex={-1}
            light />} />;
}

const notLoggedHeader = () => {
    return <Site.Header
        href="/"
        alt="Tabler React"
        imageURL="/logo/logo_transparent.png"
        navItems={<>
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
        </>}
        searchBar={<Form.Input
            icon="search"
            position="prepend"
            placeholder="Search"
            tabIndex={-1}
            light />} />;
}

const accountDropdownProps = (user: User) => ({
    avatarURL: user.picture,
    name: user.nickname,
    description: "User",
    options: [
        { icon: "user", value: "Profile", href: "/profile" },
        { icon: "settings", value: "Settings", href: "/settings" },
        { isDivider: true },
        { icon: "help-circle", value: "Need help?", href: "/help" },
        { icon: "log-out", value: "Sign out", href: "/api/auth/logout" },
    ],
});


const loggedHeader = (user: User) => {
    return <Site.Header
        href="/"
        alt="Tabler React"
        imageURL="/logo/logo_transparent.png"
        navItems={<>
            <Nav.Item link={false} className="d-none d-md-flex">
                <Button
                    href="/portfolio"
                    outline
                    size="sm"
                    RootComponent="a"
                    color="primary"
                >
                    Portfolio
                </Button>
            </Nav.Item>
        </>}
        accountDropdown={accountDropdownProps(user)}
        searchBar={<Form.Input
            icon="search"
            position="prepend"
            placeholder="Search"
            tabIndex={-1}
            light />} />;
}

const SiteHeader = function () {
    const { user, error, isLoading } = useUser() as any;

    if (!user && !isLoading) {
        return (
            notLoggedHeader()
        );    
    } 

    if(user) {
        return loggedHeader(user);
    }

    return loadingHeader();
};    

export default SiteHeader;
