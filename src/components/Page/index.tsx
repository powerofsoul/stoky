import React from "react";

import { Site } from "tabler-react";
import Header from "../Header";
import Footer from "../Footer";

interface Props {
  children: React.ReactNode;
}

const Page = function({ children }: Props) {
  return (
    <Site.Wrapper
      header={Header}
      footer={Footer}
    >
      {children}
    </Site.Wrapper>
  );
};

export default Page;