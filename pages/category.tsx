import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div>
                  <Information deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div>
                <Information deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
