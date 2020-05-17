import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import RandomizedFeed from "containers/Information/RandomizedFeed";
import { MainContentArea, ContentSection } from "styled/pages.style";
// Static Data Import Here
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import {
  OneTileWrapper,
  OneTileCard,
  TwoTileCard,
  TwoTileWrapper,
} from "components/Tile/Tile";

const fitnessCover = require("image/categories/fitness_cover.jpg");
const dietCover = require("image/categories/diet_cover.jpg");
const mindCover = require("image/categories/mind_cover.jpg");

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
        <br />
        {/* <OneTileWrapper>
          <OneTileCard image={fitnessCover}>
            <div className="card"></div>
          </OneTileCard>
        </OneTileWrapper>
        <br />

        <OneTileWrapper>
          <OneTileCard image={dietCover}>
            <div className="card"></div>
          </OneTileCard>
        </OneTileWrapper>
        <br />

        <OneTileWrapper>
          <OneTileCard image={mindCover}>
            <div className="card"></div>
          </OneTileCard>
        </OneTileWrapper>
        <br /> */}

        <TwoTileWrapper>
          <TwoTileCard color={"#e43f5a"}>
            <h1>FIT</h1>
          </TwoTileCard>
          <TwoTileCard color={"#00bd56"}>
            <h1>DIET</h1>
          </TwoTileCard>
        </TwoTileWrapper>
        <br />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <RandomizedFeed deviceType={deviceType} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <RandomizedFeed deviceType={deviceType} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
