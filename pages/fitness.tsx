import React, { useState } from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";
import {
  FITNESS_TOP_CATEGORY_SLUG,
  FITNESS_TOP_CATEGORY,
} from "constants/categories";

import { CategoryPage } from "containers/Information/CategoryPage";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  return (
    <>
      <Head>
        <title>
          Urban Nuskha | Home workouts for women | Fat burning exercises at home
        </title>
        <meta
          name="description"
          content="Looking for fat burning exercises at home, find it on our platform. At urbannuskha we have live session, video collection for at home workout for women and men and full home bodyweight workout for everyone. Now do not stress for weight loss issues"
        />
        <link rel="canonical" href="https://urbannuskha.in/fitness" />
        <meta
          property="og:title"
          content="Curated fitness playlists and advice from experts."
        ></meta>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        <CategoryPage
          deviceType={deviceType}
          pageTitle={"FITNESS"}
          categoryName={FITNESS_TOP_CATEGORY}
          categorySlug={FITNESS_TOP_CATEGORY_SLUG}
          categoryColor={"#e43f5a"}
        ></CategoryPage>
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
