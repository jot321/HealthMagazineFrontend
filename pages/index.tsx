import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Categories from "components/Categories/Categories";
import Banner from "containers/Banner/Banner";
import RandomizedFeed from "containers/Information/RandomizedFeed";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
} from "styled/pages.style";
// Static Data Import Here
import BannerImg from "image/wellness_banner.png";
import NavBarItems from "constants/storeType";
import { getCookie } from "components/helpers/session";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  // React.useEffect(() => {
  //   const modalTimer = setTimeout(() => {
  //     if (!getCookie("zip_code") && !getCookie("first_visit")) {
  //       openModal({
  //         show: true,
  //         overlayClassName: "quick-view-overlay",
  //         closeOnClickOutside: true,
  //         component: LocationModal,
  //         // closeComponent: "div",
  //         config: {
  //           enableResizing: false,
  //           disableDragging: true,
  //           className: "quick-view-modal",
  //           width: 458,
  //           height: "auto"
  //         }
  //       });
  //     }
  //   }, 1800);
  //   return () => {
  //     clearTimeout(modalTimer);
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>
          Urban Nuskha | Health information from experts and community in India
        </title>
        <meta
          name="description"
          content="Expert Health Articles, Tips and Videos. Join growing communities in India and get healthcare discussion, resources and advice. Join discussions on Fitness, Diet & Nutrition, Chronic Conditions, Parenting, Mental Wellness and more."
        />
        <link rel="canonical" href="https://urbannuskha.in" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        <Banner
          intlTitleId="groceriesTitle"
          intlDescriptionId="groceriesSubTitle"
          imageUrl={BannerImg}
        />
        <Categories />

        {deviceType.desktop ? (
          <>
            {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            <MainContentArea>
              {/* <SidebarSection>
                <Sidebar type={PAGE_TYPE} deviceType={deviceType} />
              </SidebarSection> */}
              <ContentSection>
                <div ref={targetRef}>
                  <RandomizedFeed deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <RandomizedFeed deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
        {/* <CartPopUp deviceType={deviceType} /> */}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
