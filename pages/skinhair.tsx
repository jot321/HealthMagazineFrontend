import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import { SKIN_HAIR_TOP_CATEGORY } from "constants/categories";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Skin care and Hair care</title>
        <meta
          name="description"
          content="Today we all are facing very common problem and that is skin care and hair care. Hair and skin problem can be caused due to diet and pollution. Get best tips for hair and skin care at urbannuskha."
        />
        <link rel="canonical" href="https://urbannuskha.in/skinhair" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <Information
                    deviceType={deviceType}
                    topLevelCategory={SKIN_HAIR_TOP_CATEGORY}
                  />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <Information
                  deviceType={deviceType}
                  topLevelCategory={SKIN_HAIR_TOP_CATEGORY}
                />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
