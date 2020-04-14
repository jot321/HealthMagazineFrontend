import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import { WEIGHT_TOP_CATEGORY } from "constants/categories";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Weight management | Weight loss yoga exercise</title>
        <meta
          name="description"
          content="Weight gain is a big issue these days and need for weight management in our busy life is a necessity due to our lifestyle choice. We provide weight loss yoga exercise and other tools and tips to help you in your search for general wellbeing."
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
                    topLevelCategory={WEIGHT_TOP_CATEGORY}
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
                  topLevelCategory={WEIGHT_TOP_CATEGORY}
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
