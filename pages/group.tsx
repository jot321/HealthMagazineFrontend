import React from "react";
import Head from "next/head";
import styled from "styled-components";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import { MainContentArea, ContentSection } from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import { GroupTileWrapper, GroupTileCard } from "components/Tile/Tile";

import { FITNESS_TOP_CATEGORY } from "constants/categories";
import { topCategoryToGroupMapping } from "constants/groups_mapping";

import { Tabs, Tab } from "baseui/tabs";

const GroupTopBar = styled.div`
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  .title_area {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    padding: 10px;
  }

  .content_categories {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;

    padding-top: 10px;
  }

  .category_button {
    padding: 15px;
    font-weight: 500;

    border-bottom: 2px solid;
  }

  h1 {
    font-size: 20px;
    font-weight: 500;
    text-transform: capitalize;
  }
`;

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);

  const router = useRouter();
  const groupSlug = router.query.q;

  return (
    <>
      <Head>
        <title>
          Urban Nuskha | Home workouts for women | Fat burning exercises at home
        </title>
        <meta name="description" content="" />
        <link
          rel="canonical"
          href={"https://urbannuskha.in/group/" + groupSlug}
        />
        <meta
          property="og:title"
          content="Curated fitness playlists and advice from experts."
        ></meta>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <Information
                    deviceType={deviceType}
                    topLevelCategory={FITNESS_TOP_CATEGORY}
                  />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <Information
                  deviceType={deviceType}
                  topLevelCategory={FITNESS_TOP_CATEGORY}
                />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
