import React from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

import {
  MENTAL_TOP_CATEGORY,
  MENTAL_TOP_CATEGORY_SLUG,
} from "constants/categories";

import { ShareLoveComponent } from "styled/pages.style";
import { CategoryPage } from "containers/Information/CategoryPage";

function HomePage({ deviceType }) {
  return (
    <>
      <Head>
        <title>Mental wellness | Mental Wellbeing</title>
        <meta
          name="description"
          content="Mental wellness basics resource to assist and introduce concepts associated with psychological state and wellness. Mental wellbeing is difficult in today's busy life, also get many tips for your health and wellness at urbannuskha."
        />
        <link rel="canonical" href="https://urbannuskha.in/mental" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        <CategoryPage
          deviceType={deviceType}
          pageTitle={"MENTAL WELL BEING"}
          categoryName={MENTAL_TOP_CATEGORY}
          categorySlug={MENTAL_TOP_CATEGORY_SLUG}
          // categoryColor={"#28c3d4"}
          categoryColor={"#e43f5a"}
        ></CategoryPage>
        <ShareLoveComponent />
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
