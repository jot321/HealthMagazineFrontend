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

function LiveListingsPage({ deviceType }) {
  const router = useRouter();
  const targetRef = React.useRef(null);

  const showVideosFromPlaylist = router.query.vpid != undefined;

  return (
    <>
      <Head>
        <title>Curated Health Playlists/Videos</title>
        <link rel="canonical" href="https://urbannuskha.in/videos" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  {showVideosFromPlaylist ? (
                    <VideoListInformation />
                  ) : (
                    <MediaInformation />
                  )}
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                {showVideosFromPlaylist ? (
                  <VideoListInformation />
                ) : (
                  <MediaInformation />
                )}
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(LiveListingsPage);
