import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Popular health information from exports and community</title>
        <meta
          name="description"
          content="Get expert tips and videos | Weight Loss | Skin Care | Hair Loss | Workout | Diet | Parenting | Diabetes | Blood Pressure | Thyroid | PCOD. Join a growing wellness communities in India and more information on your lifestyle needs."
        />
        <link rel="canonical" href="https://urbannuskha.in/popular" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <Information deviceType={deviceType} loadPopular={true} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <Information deviceType={deviceType} loadPopular={true} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
