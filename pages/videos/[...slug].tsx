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
  DIET_TOP_CATEGORY,
  FITNESS_TOP_CATEGORY,
  MENTAL_TOP_CATEGORY,
  SKIN_HAIR_TOP_CATEGORY,
} from "constants/categories";

function LiveListingsPage({ deviceType }) {
  const router = useRouter();
  const targetRef = React.useRef(null);

  const showVideosFromPlaylist = router.query.vpid != undefined;
  const urlVideoCategory =
    router.query.slug == null ? "" : router.query.slug.toString();

  let OGImage = "";

  if (urlVideoCategory == DIET_TOP_CATEGORY) {
    OGImage =
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/0179bf69997a440dba007a0ada68464c.png";
  } else if (urlVideoCategory == FITNESS_TOP_CATEGORY) {
    OGImage =
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/e2c5600a377641ee967f0c22a00104a8.png";
  } else if (urlVideoCategory == SKIN_HAIR_TOP_CATEGORY) {
    OGImage =
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/0a499d505f524112be6a6cf3cd9d0d3a.png";
  } else if (urlVideoCategory == MENTAL_TOP_CATEGORY) {
    OGImage =
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/3af720c8512042d5abcdc816c6cfc515.png";
  }

  return (
    <>
      <Head>
        <title>Curated Health Playlists</title>
        <link rel="canonical" href="https://urbannuskha.in/videos" />
        <meta property="og:image" content={OGImage}></meta>
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
                    <MediaInformation urlVideoCategory={urlVideoCategory} />
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

export default withApollo(LiveListingsPage);
