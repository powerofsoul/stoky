import React from "react";

import { Container, Site } from "tabler-react";
import Header from "../Header";
import Footer from "../Footer";

interface Props {
    children: React.ReactNode;
}

const Page = function ({ children }: Props) {
    return (
        <Site.Wrapper header={Header} footer={Footer}>
            <div className="my-3 my-md-5">
                <Container>{children}</Container>
            </div>
        </Site.Wrapper>
    );
};

export default Page;
