import { useState } from "react";
import { useRouter } from "next/router";
import { GroupTopBar, ShowMoreGroups } from "styled/pages.style";
import { GroupTileWrapper, GroupTileCard } from "components/Tile/Tile";
import { topCategoryToGroupMapping } from "constants/groups_mapping";

import { ContentFeedPage } from "./ContentFeedPage";

import { trackPageView } from "analytics";

export const CategoryPage = ({
  deviceType,
  pageTitle,
  categoryName,
  categorySlug,
  categoryColor,
}) => {
  const router = useRouter();
  const [groupShowCount, setGroupShowCount] = useState(8);

  return (
    <div>
      {/* <GroupTopBar>
        <div className="title_area">
          <h1>{pageTitle}</h1>
        </div>
      </GroupTopBar> */}
      <h1
        style={{
          padding: "20px",
          fontSize: "20px",
          fontWeight: 400,
          borderLeft: "5px solid #e43f5a",
        }}
      >
        {pageTitle}
      </h1>
      <GroupTileWrapper>
        {topCategoryToGroupMapping[categorySlug]
          .slice(0, groupShowCount)
          .map((element) => {
            return (
              <GroupTileCard
                color={categoryColor}
                onClick={() => {
                  router.push("/group?q=" + element.slug);
                  trackPageView("/group/" + element.slug);
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h1>{element.name}</h1>
                  {element.image != undefined && (
                    <img
                      style={{ width: "45px", height: "45px" }}
                      src={element.image}
                    ></img>
                  )}
                </div>
              </GroupTileCard>
            );
          })}
      </GroupTileWrapper>
      {groupShowCount != -1 && (
        <ShowMoreGroups
          onClick={() => {
            setGroupShowCount(-1);
            trackPageView("/moregroups");
          }}
          color={categoryColor}
        >
          <p>More groups</p>
        </ShowMoreGroups>
      )}
      {/* Content Type Selection */}
      <ContentFeedPage
        deviceType={deviceType}
        categoryName={categoryName}
        categorySlug={categorySlug}
      ></ContentFeedPage>
    </div>
  );
};
