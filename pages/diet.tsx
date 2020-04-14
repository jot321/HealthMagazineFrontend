import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
// Static Data Import Here
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import { DIET_TOP_CATEGORY } from "constants/categories";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Indian Diet & Nutrition plan | Diet meal plan</title>
        <meta
          name="description"
          content="Looking for best Indian diet & nutrition plan to lose weight. We provide best and easy to follow diet meal plan for you."
        />
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
                    topLevelCategory={DIET_TOP_CATEGORY}
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
                  topLevelCategory={DIET_TOP_CATEGORY}
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
