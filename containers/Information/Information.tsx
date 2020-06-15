import React, { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import BeatLoader from "react-spinners/BeatLoader";
import { Waypoint } from "react-waypoint";
import NoResultFound from "components/NoResult/NoResult";

import { ProductsRow, LoaderWrapper, LoaderItem } from "./Information.style";
import { outputCardScafollding, compactVideoFeed } from "./contentScaffolding";

const GET_HOME_FEED = gql`
  query getFeed(
    $sortByLikes: Boolean
    $dailyPicks: Boolean
    $offset: Int
    $fetchLimit: Int
    $searchKey: String
    $group: String
    $toplevelcategory: String
    $category: String
    $tag: String
    $articleId: String
    $contentType: Int
  ) {
    getHomeFeed(
      sortByLikes: $sortByLikes
      dailyPicks: $dailyPicks
      offset: $offset
      fetchLimit: $fetchLimit
      searchKey: $searchKey
      group: $group
      toplevelcategory: $toplevelcategory
      category: $category
      tag: $tag
      articleId: $articleId
      contentType: $contentType
    ) {
      messages {
        message
        properties
      }
      hasMore
    }
  }
`;

type ProductsProps = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  loadMore?: boolean;
  loadPopular?: boolean;
  loadFeatured?: boolean;
  group?: string;
  topLevelCategory?: string;
  articleId?: string;
  contentType?: number;
  compactVideoView?: boolean;
};

export const Information: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true,
  loadPopular = false,
  loadFeatured = false,
  group = "",
  topLevelCategory = "",
  articleId = null,
  contentType = null,
  compactVideoView = false,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);

  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------

  let searchKey_ = null;
  let category_ = null;
  let tag_ = null;
  let articleId_ = articleId;

  if (router.query.searchKey) {
    searchKey_ = String(router.query.searchKey);
  } else if (router.query.category) {
    category_ = String(router.query.category);
  } else if (router.query.tag) {
    tag_ = String(router.query.tag);
  } else if (router.query.articleId) {
    articleId_ = String(router.query.articleId);
  }

  const homeFeed = useQuery(GET_HOME_FEED, {
    variables: {
      articleId: articleId_,
      searchKey: searchKey_,
      group: group,
      toplevelcategory: topLevelCategory,
      category: category_,
      tag: tag_,
      sortByLikes: loadPopular,
      dailyPicks: loadFeatured,
      fetchLimit: 6,
      contentType: contentType,
    },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (homeFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <BeatLoader size={15} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (homeFeed.error) return <div>{homeFeed.error.message}</div>;

  if (
    !homeFeed.data ||
    !homeFeed.data.getHomeFeed ||
    homeFeed.data.getHomeFeed.length === 0
  ) {
    return <NoResultFound />;
  }

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    toggleLoading(true);
    homeFeed.fetchMore({
      variables: {
        offset: Number(homeFeed.data.getHomeFeed.messages.length),
        fetchLimit: 6,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getHomeFeed: {
            __typename: prev.getHomeFeed.__typename,
            messages: [
              ...prev.getHomeFeed.messages,
              ...fetchMoreResult.getHomeFeed.messages,
            ],
            hasMore: fetchMoreResult.getHomeFeed.hasMore,
          },
        };
      },
    });
  };

  return (
    <>
      <div>
        {compactVideoView == true && (
          <ProductsRow>
            {homeFeed.data.getHomeFeed.messages.map(
              (element: any, index: number) => {
                const data_ = JSON.parse(element.message);
                const properties_ = JSON.parse(element.properties);

                return compactVideoFeed(data_, properties_, index);
              }
            )}
          </ProductsRow>
        )}

        {compactVideoView == false && (
          <ProductsRow>
            {homeFeed.data.getHomeFeed.messages.map(
              (element: any, index: number) => {
                const data_ = JSON.parse(element.message);
                const properties_ = JSON.parse(element.properties);

                return outputCardScafollding(data_, properties_, index);
              }
            )}
          </ProductsRow>
        )}
      </div>

      {loadMore && homeFeed.data.getHomeFeed.hasMore && (
        <Waypoint onEnter={handleLoadMore} />
      )}
      {loadingMore && (
        <LoaderWrapper>
          <LoaderItem>
            <BeatLoader size={15} color={"#ea9085"} />
          </LoaderItem>
        </LoaderWrapper>
      )}
    </>
  );
};
export default Information;
