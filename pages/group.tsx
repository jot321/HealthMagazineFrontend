import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import { GroupTopBar } from "styled/pages.style";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import { ContentFeedPage } from "containers/Information/ContentFeedPage";
import {
  getGroupNameFromSlug,
  getGroupTopLevelCategoryFromSlug,
  getGroupImageFromSlug,
} from "constants/groups_mapping";

function HomePage({ deviceType }) {
  const router = useRouter();
  const groupSlug = router.query.q;

  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
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

        <GroupTopBar>
          <div className="group_title_area">
            {
              <img
                style={{ width: "70px", height: "70px" }}
                src={getGroupImageFromSlug(groupSlug)}
              ></img>
            }
            <h1>{getGroupNameFromSlug(groupSlug)}</h1>
          </div>
        </GroupTopBar>

        <ContentFeedPage
          deviceType={deviceType}
          group={groupSlug}
          categorySlug={getGroupTopLevelCategoryFromSlug(groupSlug)}
        ></ContentFeedPage>
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
