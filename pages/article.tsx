import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";

import Information from "containers/Information/Information";

import { MainContentArea, ContentSection } from "styled/pages.style";

import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";

function HomePage({ deviceType }) {
  const router = useRouter();

  const articleId =
    router.query.a_id != null ? router.query.a_id.toString() : null;

  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />
        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div>
                  <Information deviceType={deviceType} articleId={articleId} />
                </div>
              </ContentSection>
            </MainContentArea>
          </>
        ) : (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div>
                <Information deviceType={deviceType} articleId={articleId} />
              </div>
            </ContentSection>
          </MainContentArea>
        )}
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
