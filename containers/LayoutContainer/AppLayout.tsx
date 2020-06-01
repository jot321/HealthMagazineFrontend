import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Sticky from "react-stickynode";
import styled from "styled-components";

import Header from "./Header/Header";
import { useStickyState } from "contexts/app/app.provider";

const MobileHeader = dynamic(() => import("./Header/MobileHeader"), {
  ssr: false,
});

const LayoutWrapper = styled.div`
  background-color: #fff;
  padding-left: calc(50% - 37.5rem);
  padding-right: calc(50% - 37.5rem);

  .reuseModalHolder {
    padding: 0;
    overflow: auto;
    border-radius: 3px 3px 0 0;
    border: 0;
  }
`;

type LayoutProps = {
  className?: string;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  token?: string;
};

const Layout: FunctionComponent<LayoutProps> = ({
  className,
  children,
  deviceType: { mobile, tablet, desktop },
  token,
}) => {
  const isSticky = useStickyState("isSticky");
  const { pathname } = useRouter();

  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      <MobileHeader
        className={`${isSticky ? "sticky" : "unSticky"}`}
        pathname={pathname}
      />
      {/* {(mobile || tablet) && (
        <Sticky enabled={isSticky} innerZ={1000}>
          <MobileHeader
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            }`}
            pathname={pathname}
          />
        </Sticky>
      )}

      {desktop && (
        <Sticky enabled={isSticky} innerZ={1000}>
          <MobileHeader
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            } desktop`}
            pathname={pathname}
          />
          <Header
            className={`${isSticky ? "sticky" : "unSticky"} ${
              isHomePage ? "home" : ""
            }`}
            token={token}
            pathname={pathname}
          />
        </Sticky>
      )} */}
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
