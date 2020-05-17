import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import MediaInformation from "containers/Information/MediaInformation";
import VideoListInformation from "containers/Information/VideoListInformation";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import { useRouter } from "next/router";

import {
  OneTileWrapper,
  OneTileCard,
  TwoTileWrapper,
  TwoTileCard,
  ThreeTileWrapper,
  ThreeTileCard,
} from "components/Tile/Tile";

function VideosPage({ deviceType }) {
  const router = useRouter();

  const showVideosFromPlaylist = router.query.vpid != undefined;
  let urlVideoCategory =
    router.query.slug == null ? "" : router.query.slug.toString();

  return (
    <>
      <Head>
        <title>Curated Health Playlists</title>
        <link
          rel="canonical"
          href={"https://urbannuskha.in/videos/" + urlVideoCategory}
        />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {/* <OneTileWrapper>
          <OneTileCard>BANNER</OneTileCard>
        </OneTileWrapper>
        <br />

        <h2>WORKOUTS</h2>
        <ThreeTileWrapper>
          <ThreeTileCard>FIT</ThreeTileCard>
          <ThreeTileCard>DIET</ThreeTileCard>
          <ThreeTileCard>MIND</ThreeTileCard>
        </ThreeTileWrapper>
        <br />

        <h2>GOALS</h2>
        <ThreeTileWrapper>
          <ThreeTileCard>FIT</ThreeTileCard>
          <ThreeTileCard>DIET</ThreeTileCard>
          <ThreeTileCard>MIND</ThreeTileCard>
        </ThreeTileWrapper>
        <br />

        <h2>MOTIVATION</h2>
        <ThreeTileWrapper>
          <ThreeTileCard>FIT</ThreeTileCard>
          <ThreeTileCard>DIET</ThreeTileCard>
          <ThreeTileCard>MIND</ThreeTileCard>
        </ThreeTileWrapper>
        <br /> */}

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div>
                  {showVideosFromPlaylist ? (
                    <VideoListInformation />
                  ) : (
                    <MediaInformation urlVideoCategory={urlVideoCategory} />
                  )}
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div>
                {showVideosFromPlaylist ? (
                  <VideoListInformation />
                ) : (
                  <MediaInformation urlVideoCategory={urlVideoCategory} />
                )}
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(VideosPage);
