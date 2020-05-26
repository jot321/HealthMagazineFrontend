import { useState } from "react";
import { useRouter } from "next/router";
import Information from "containers/Information/Information";
import {
  MainContentArea,
  ContentSection,
  GroupTopBar,
  SubmitButton,
  ShowMoreGroups,
} from "styled/pages.style";
import { GroupTileWrapper, GroupTileCard } from "components/Tile/Tile";
import { topCategoryToGroupMapping } from "constants/groups_mapping";
import { InformationType } from "containers/Information/contentScaffolding";

const SubmitButtonImage = require("image/add.png");

export const CategoryPage = ({
  deviceType,
  pageTitle,
  categoryName,
  categorySlug,
  categoryColor,
}) => {
  const router = useRouter();
  const [contentType, setContentType] = useState(null);
  const [groupShowCount, setGroupShowCount] = useState(6);

  const onClickSelectContentType = (type) => {
    setContentType(type);
  };

  return (
    <div>
      <GroupTopBar>
        <div className="title_area">
          <h1>{pageTitle}</h1>
        </div>
      </GroupTopBar>
      <GroupTileWrapper>
        {topCategoryToGroupMapping[categorySlug]
          .slice(0, groupShowCount)
          .map((element) => {
            return (
              <GroupTileCard
                color={categoryColor}
                onClick={() => {
                  router.push("/group?q=" + element.slug);
                }}
              >
                <h1>{element.name}</h1>
              </GroupTileCard>
            );
          })}
      </GroupTileWrapper>
      {groupShowCount != -1 && (
        <ShowMoreGroups
          onClick={() => {
            setGroupShowCount(-1);
          }}
        >
          <p>More groups</p>
        </ShowMoreGroups>
      )}
      {/* Content Type Selection */}
      <GroupTopBar>
        <div className="content_categories">
          <div
            onClick={() => {
              onClickSelectContentType(null);
            }}
            className={`category_button ${contentType == null ? "active" : ""}`}
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
      ;
      {deviceType.desktop ? (
        <MainContentArea>
          <ContentSection>
            <div>
              <Information
                deviceType={deviceType}
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
                topLevelCategory={categoryName}
                contentType={contentType}
              />
            </div>
          </ContentSection>
        </MainContentArea>
      )}
      <SubmitButton
        onClick={() => {
          router.push("/submit?topLevelCategory=" + categorySlug);
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
