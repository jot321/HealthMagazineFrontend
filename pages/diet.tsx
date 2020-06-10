import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import {
  DIET_TOP_CATEGORY,
  DIET_TOP_CATEGORY_SLUG,
} from "constants/categories";

import { ShareLoveComponent } from "styled/pages.style";
import { CategoryPage } from "containers/Information/CategoryPage";

function HomePage({ deviceType }) {
  return (
    <>
      <Head>
        <title>Indian Diet & Nutrition plan | Diet meal plan</title>
        <meta
          name="description"
          content="Looking for best Indian diet & nutrition plan to lose weight. We provide best and easy to follow diet meal plan for you."
        />
        <link rel="canonical" href="https://urbannuskha.in/diet" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        <CategoryPage
          deviceType={deviceType}
          pageTitle={"DIET & NUTRITION"}
          categoryName={DIET_TOP_CATEGORY}
          categorySlug={DIET_TOP_CATEGORY_SLUG}
          // categoryColor={"#06623b"}
          categoryColor={"#e43f5a"}
        ></CategoryPage>
        <ShareLoveComponent />
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
