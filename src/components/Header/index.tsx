import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";

import { Site, Nav, Button, Form } from "tabler-react";
import { TickerSymbolSearch } from "ticker-symbol-search";
import { User } from "../../../models/User";
import TickerSearch from "../TickerSearch";

const loadingHeader = () => {
    return (
        <Site.Header
            href="/"
            alt="Tabler React"
            imageURL="/logo/logo_transparent.png"
        />
    );
};

const notLoggedHeader = () => {
    return (
        <Site.Header
            href="/"
            alt="Tabler React"
            imageURL="/logo/logo_transparent.png"
            navItems={
                <>
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
                </>
            }
        />
    );
};

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

const tickerSearchComponent = () => {
    return <TickerSymbolSearch callback={(data) => console.log(data)} />;
};

const loggedHeader = (user: User) => {
    return (
        <Site.Header
            href="/"
            alt="Tabler React"
            imageURL="/logo/logo_transparent.png"
            navItems={
                <>
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
                </>
            }
            accountDropdown={accountDropdownProps(user)}
            // searchBar={
            //    <TickerSearch />
            // }
        />
    );
};

const SiteHeader = function () {
    const { user, error, isLoading } = useUser() as any;
    
    if (user) {
        return loggedHeader(user);
    }
    
    if (!user && !isLoading) {
        return notLoggedHeader();
    }


    return loadingHeader();
};

export default SiteHeader;
