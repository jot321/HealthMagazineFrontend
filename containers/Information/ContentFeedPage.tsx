import { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Information from "containers/Information/Information";
import {
  MainContentArea,
  ContentSection,
  GroupTopBar,
  SubmitButton,
} from "styled/pages.style";
import { InformationType } from "containers/Information/contentScaffolding";

import { trackPageView } from "analytics";

const SubmitButtonImage = require("image/add.png");

const AddQuestionButton = styled.div`
  display: flex;
  justify-content: center;
  width: 150px;
  padding: 10px;
  color: white;
  background-color: #e43f5a;
  border-radius: 6px;
  font-weight: 500;
`;

export const ContentFeedPage = ({
  deviceType,
  group = null,
  categoryName = null,
  categorySlug = null,
}) => {
  const router = useRouter();

  const contentTypeFromUrl =
    router.query.contentType !== undefined
      ? Number(router.query.contentType)
      : null;

  const [contentType, setContentType] = useState(contentTypeFromUrl);

  const onClickSelectContentType = (type) => {
    setContentType(type);
  };

  return (
    <div>
      <GroupTopBar>
        <div className="content_categories">
          <div
            onClick={() => {
              onClickSelectContentType(null);
              trackPageView("/" + categorySlug);
            }}
            className={`category_button ${contentType == null ? "active" : ""}`}
          >
            All
          </div>
          <div
            onClick={() => {
              onClickSelectContentType(InformationType.TIP);
              trackPageView("/" + categorySlug + "/tips");
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
              trackPageView("/" + categorySlug + "/qnas");
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
              trackPageView("/" + categorySlug + "/videos");
            }}
            className={`category_button ${
              contentType == InformationType.VIDEOLINK ? "active" : ""
            }`}
          >
            Videos
          </div>
        </div>
      </GroupTopBar>

      {contentType == InformationType.QUESTION && (
        <div
          style={{
            display: "flex",
            padding: "10px 10px",
            justifyContent: "center",
          }}
        >
          <AddQuestionButton
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
            Ask a Question
          </AddQuestionButton>
        </div>
      )}

      {deviceType.desktop ? (
        <MainContentArea>
          <ContentSection>
            <div>
              <Information
                deviceType={deviceType}
                group={group}
                topLevelCategory={categoryName}
                contentType={contentType}
              />
            </div>
          </ContentSection>
        </MainContentArea>
      ) : (
        <MainContentArea>
          <ContentSection style={{ width: "100%" }}>
            <div>
              <Information
                deviceType={deviceType}
                group={group}
                topLevelCategory={categoryName}
                contentType={contentType}
              />
            </div>
          </ContentSection>
        </MainContentArea>
      )}

      <SubmitButton
        onClick={() => {
          trackPageView("/submit");
          if (group) {
            router.push(
              "/submit?topLevelCategory=" + categorySlug + "&groupSlug=" + group
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
      </SubmitButton>
    </div>
  );
};
