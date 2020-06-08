import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import RandomizedFeed from "containers/Information/RandomizedFeed";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import {
  OneTileWrapper,
  OneTileCard,
  TwoTileCard,
  TwoTileWrapper,
} from "components/Tile/Tile";

import { trackPageView } from "analytics";

const downArrow = require("image/down-arrow.png");
const banner = require("image/categories/banner.jpg");

const fitCover = require("image/categories/fit.jpg");
const dietCover = require("image/categories/diet.jpg");
const mindCover = require("image/categories/mind.jpg");
const wellCover = require("image/categories/well.jpg");

const ClickNudge = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  p {
    padding: 10px;
    font-weight: 500;
  }
`;

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);
  const router = useRouter();

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

        <OneTileWrapper>
          <OneTileCard>
            <img src={banner}></img>
          </OneTileCard>
        </OneTileWrapper>

        <ClickNudge>
          <p>Select your community</p>
          {/* <img style={{ width: "20px", height: "20px" }} src={downArrow}></img> */}
        </ClickNudge>

        <TwoTileWrapper>
          <TwoTileCard
            image={fitCover}
            onClick={() => {
              router.push("/fitness");
              trackPageView("/fitness");
            }}
          >
            <img src={fitCover}></img>
          </TwoTileCard>
          <TwoTileCard
            image={dietCover}
            onClick={() => {
              router.push("/diet");
              trackPageView("/diet");
            }}
          >
            <img src={dietCover}></img>
          </TwoTileCard>
        </TwoTileWrapper>
        <br />

        <TwoTileWrapper>
          <TwoTileCard
            image={mindCover}
            onClick={() => {
              router.push("/mental");
              trackPageView("/mental");
            }}
          >
            <img src={mindCover}></img>
          </TwoTileCard>
          <TwoTileCard
            image={wellCover}
            onClick={() => {
              router.push("/general");
              trackPageView("/general");
            }}
          >
            <img src={wellCover}></img>
          </TwoTileCard>
        </TwoTileWrapper>
        <br />

        {/* {deviceType.desktop ? (
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
        )} */}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
