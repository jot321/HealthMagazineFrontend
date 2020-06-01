import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import {
  GENERAL_TOP_CATEGORY,
  GENERAL_TOP_CATEGORY_SLUG,
} from "constants/categories";

import { CategoryPage } from "containers/Information/CategoryPage";

function HomePage({ deviceType }) {
  return (
    <>
      <Head>
        <title>Nuskha</title>
        <link rel="canonical" href="https://urbannuskha.in/general" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        <CategoryPage
          deviceType={deviceType}
          pageTitle={"GENERAL WELLNESS"}
          categoryName={GENERAL_TOP_CATEGORY}
          categorySlug={GENERAL_TOP_CATEGORY_SLUG}
          // categoryColor={"#721b65"}
          categoryColor={"#e43f5a"}
        ></CategoryPage>
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
