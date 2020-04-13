import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import TipsFeed from "containers/Information/TipsFeed";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import styled from "styled-components";

const SubmitTipButton = styled.div`
  padding: 10px;
  position: fixed;
  bottom: 10px;
  z-index: 1000;
  right: 10px;
`;

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Health Tips - Urban Nuskha</title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <TipsFeed deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <TipsFeed deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
      {/* <SubmitTipButton>
        <img src="https://img.icons8.com/plasticine/60/000000/add.png" />
      </SubmitTipButton> */}
    </>
  );
}

export default withApollo(HomePage);
