import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown
} from "styled/pages.style";
// Static Data Import Here
import OFFERS from "data/offers";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  return (
    <>
      <Head>
        <title>Nuskha</title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        {deviceType.desktop ? (
          <>
            {/* <MobileCarouselDropdown> */}
            {/* <StoreNav items={NavBarItems.HomePage} /> */}
            {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            {/* </MobileCarouselDropdown> */}
            {/* <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection> */}
            <MainContentArea>
              {/* <SidebarSection>
                <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
              </SidebarSection> */}
              <ContentSection>
                <div ref={targetRef}>
                  {/* <Masonry breakpointCols={3} className="my-masonry-grid" columnClassName="my-masonry-grid_column"> */}
                  {/* array of JSX items */}
                  <Information deviceType={deviceType} />
                  {/* </Masonry> */}
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            {/* <StoreNav items={NavBarItems.HomePage} /> */}
            {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            {/* <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection> */}
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
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
