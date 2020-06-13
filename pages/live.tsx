import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import LiveSessionsInformation from "containers/Information/LiveSessionsInformation";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

function LiveListingsPage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>
          Connect with experts in fitness, diet and mental wellness.
        </title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        <h1
          style={{
            padding: "20px",
            fontSize: "20px",
            fontWeight: 400,
            borderLeft: "5px solid #e43f5a",
          }}
        >
          Connect with lifestyle coaches
        </h1>

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <LiveSessionsInformation deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <LiveSessionsInformation deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(LiveListingsPage);
