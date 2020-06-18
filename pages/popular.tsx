import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import {
  MainContentArea,
  ContentSection,
  GroupTopBar,
  ShareLoveComponent,
} from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import { InformationType } from "containers/Information/contentScaffolding";

// import { trackPageView } from "analytics";
// const SubmitButtonImage = require("image/add.png");

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);
  const router = useRouter();

  const contentTypeFromUrl =
    router.query.contentType !== undefined
      ? Number(router.query.contentType)
      : InformationType.VIDEOLINK;

  const [contentType, setContentType] = useState(contentTypeFromUrl);

  const onClickSelectContentType = (type) => {
    setContentType(type);
  };

  return (
    <>
      <Head>
        <title>Popular health information from experts and community</title>
        <meta
          name="description"
          content="Expert Health Articles, Tips and Videos. Join growing communities in India and get healthcare discussion, resources and advice. Join discussions on Fitness, Diet & Nutrition, Chronic Conditions, Parenting, Mental Wellness and more."
        />
        <link rel="canonical" href="https://urbannuskha.in/popular" />
      </Head>
      <Modal>
        <StoreNav items={NavBarItems.HomePage} />

        <GroupTopBar>
          <div className="content_categories">
            {/* <div
              onClick={() => {
                onClickSelectContentType(null);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                  },
                });
              }}
              className={`category_button ${
                contentType == null ? "active" : ""
              }`}
            >
              All
            </div> */}
            <div
              onClick={() => {
                onClickSelectContentType(InformationType.VIDEOLINK);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    contentType: InformationType.VIDEOLINK,
                  },
                });
              }}
              className={`category_button ${
                contentType == InformationType.VIDEOLINK ? "active" : ""
              }`}
            >
              Videos
            </div>
            <div
              onClick={() => {
                onClickSelectContentType(InformationType.TIP);
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    contentType: InformationType.TIP,
                  },
                });
              }}
              className={`category_button ${
                contentType == InformationType.TIP ? "active" : ""
              }`}
            >
              Tips
            </div>
            <div
              onClick={() => {
                router.push({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    contentType: InformationType.QUESTION,
                  },
                });
                onClickSelectContentType(InformationType.QUESTION);
              }}
              className={`category_button ${
                contentType == InformationType.QUESTION ? "active" : ""
              }`}
            >
              QnA
            </div>
          </div>
        </GroupTopBar>

        {contentType == InformationType.VIDEOLINK && (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <Information
                  deviceType={deviceType}
                  loadPopular={true}
                  contentType={contentType}
                  compactVideoView={true}
                />
              </div>
            </ContentSection>
          </MainContentArea>
        )}

        {contentType != InformationType.VIDEOLINK && (
          <MainContentArea>
            <ContentSection style={{ width: "100%" }}>
              <div ref={targetRef}>
                <Information
                  deviceType={deviceType}
                  loadPopular={true}
                  contentType={contentType}
                />
              </div>
            </ContentSection>
          </MainContentArea>
        )}

        {/* <SubmitButton
          onClick={() => {
            trackPageView("/submit");
            if (group) {
              router.push(
                "/submit?topLevelCategory=" +
                  categorySlug +
                  "&groupSlug=" +
                  group
              );
            } else {
              router.push("/submit?topLevelCategory=" + categorySlug);
            }
          }}
        >
          <img
            style={{ width: "50px", height: "50px" }}
            src={SubmitButtonImage}
          />
        </SubmitButton> */}

        <ShareLoveComponent />
      </Modal>
    </>
  );
}

export default withApollo(HomePage);
