import React, { useState } from "react";
import Head from "next/head";
import { withApollo } from "helper/apollo";
import StoreNav from "components/StoreNav/StoreNav";
import Information from "containers/Information/Information";
import {
  MainContentArea,
  ContentSection,
  GroupTopBar,
} from "styled/pages.style";
import NavBarItems from "constants/storeType";
import { Modal } from "@redq/reuse-modal";
import { InformationType } from "containers/Information/contentScaffolding";

function HomePage({ deviceType }) {
  const targetRef = React.useRef(null);
  const [contentType, setContentType] = useState(null);

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
            <div
              onClick={() => {
                onClickSelectContentType(null);
              }}
              className={`category_button ${
                contentType == null ? "active" : ""
              }`}
            >
              All
            </div>
            <div
              onClick={() => {
                onClickSelectContentType(InformationType.TIP);
              }}
              className={`category_button ${
                contentType == InformationType.TIP ? "active" : ""
              }`}
            >
              Tips
            </div>
            <div
              onClick={() => {
                onClickSelectContentType(InformationType.QUESTION);
              }}
              className={`category_button ${
                contentType == InformationType.QUESTION ? "active" : ""
              }`}
            >
              QnAs
            </div>
            <div
              onClick={() => {
                onClickSelectContentType(InformationType.VIDEOLINK);
              }}
              className={`category_button ${
                contentType == InformationType.VIDEOLINK ? "active" : ""
              }`}
            >
              Videos
            </div>
          </div>
        </GroupTopBar>

        {deviceType.desktop ? (
          <>
            <MainContentArea>
              <ContentSection>
                <div ref={targetRef}>
                  <Information
                    deviceType={deviceType}
                    loadPopular={true}
                    contentType={contentType}
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
                  loadPopular={true}
                  contentType={contentType}
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
