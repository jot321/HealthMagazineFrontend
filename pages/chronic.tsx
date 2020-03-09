import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Carousel from "components/Carousel/Carousel";
import Banner from "containers/Banner/Banner";
import Sidebar from "containers/Sidebar/Sidebar";
import Products from "containers/Products/Products";
import Information from "containers/Information/Information";
import CartPopUp from "containers/Cart/CartPopUp";
import {
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  MobileCarouselDropdown
} from "styled/pages.style";
// Static Data Import Here
import OFFERS from "data/offers";
import BannerImg from "image/wellness_banner.png";
import NavBarItems from "constants/storeType";
import LocationModal from 'containers/LocationModal/LocationModal';
import { getCookie } from 'components/helpers/session';
import { openModal, Modal } from '@redq/reuse-modal';

const PAGE_TYPE = "grocery";

function HomePage({ deviceType }) {
  const { query } = useRouter();
  const targetRef = React.useRef(null);


  React.useEffect(() => {
    if ((query.text || query.category) && targetRef.current) {
      window.scrollTo({
        top: targetRef.current.offsetTop - 110,
        behavior: "smooth"
      });
    }
  }, [query]);

  const sortByLikes_ = query.sortByLikes == "true" ? true : false;

  return (
    <>
      <Head>
        <title>Nuskha</title>
      </Head>
      <Modal>
        <Banner
          intlTitleId="groceriesTitle"
          intlDescriptionId="groceriesSubTitle"
          imageUrl={BannerImg}
        />

        {deviceType.desktop ? (
          <>
            <MobileCarouselDropdown>
              <StoreNav items={NavBarItems.ChronicPage} />
              {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            </MobileCarouselDropdown>
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
                  <Information
                    type={PAGE_TYPE}
                    deviceType={deviceType}
                    fetchLimit={16}
                  />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <StoreNav items={NavBarItems.ChronicPage} />
            {/* <Sidebar type={PAGE_TYPE} deviceType={deviceType} /> */}
            {/* <OfferSection>
              <div style={{ margin: '0 -10px' }}>
                <Carousel deviceType={deviceType} data={OFFERS} />
              </div>
            </OfferSection> */}
            <ContentSection style={{ width: "100%" }}>
              <Information
                type={PAGE_TYPE}
                deviceType={deviceType}
                fetchLimit={16}
                sortByLikes={sortByLikes_}
              />
            </ContentSection>
          </MainContentArea>
        )}
        {/* <CartPopUp deviceType={deviceType} /> */}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
