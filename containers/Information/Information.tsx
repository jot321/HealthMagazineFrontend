import React, { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import HashLoader from "react-spinners/HashLoader";
import { Waypoint } from "react-waypoint";
import NoResultFound from "components/NoResult/NoResult";

import { ProductsRow, LoaderWrapper, LoaderItem } from "./Information.style";
import { outputCardScafollding } from "./contentScaffolding";

const GET_HOME_FEED = gql`
  query getFeed(
    $sortByLikes: Boolean
    $dailyPicks: Boolean
    $offset: Int
    $fetchLimit: Int
    $searchKey: String
    $toplevelcategory: String
    $category: String
    $tag: String
    $articleId: String
  ) {
    getHomeFeed(
      sortByLikes: $sortByLikes
      dailyPicks: $dailyPicks
      offset: $offset
      fetchLimit: $fetchLimit
      searchKey: $searchKey
      toplevelcategory: $toplevelcategory
      category: $category
      tag: $tag
      articleId: $articleId
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
  topLevelCategory?: string;
  articleId?: string;
};

export const Information: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true,
  loadPopular = false,
  loadFeatured = false,
  topLevelCategory = "",
  articleId = null,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);

  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------

  let searchKey_ = null;
  let toplevelcategory_ = null;
  let category_ = null;
  let tag_ = null;
  let articleId_ = articleId;
  let sortByLikes_ = false;
  let dailyPicks_ = false;

  if (router.query.searchKey) {
    searchKey_ = String(router.query.searchKey);
  } else if (router.query.category) {
    category_ = String(router.query.category);
  } else if (router.query.tag) {
    tag_ = String(router.query.tag);
  } else if (router.query.articleId) {
    articleId_ = String(router.query.articleId);
  }

  if (topLevelCategory) {
    toplevelcategory_ = topLevelCategory;
  }

  if (loadPopular) {
    sortByLikes_ = true;
  }
  if (loadFeatured) {
    dailyPicks_ = true;
  }

  const homeFeed = useQuery(GET_HOME_FEED, {
    variables: {
      articleId: articleId_,
      searchKey: searchKey_,
      toplevelcategory: toplevelcategory_,
      category: category_,
      tag: tag_,
      sortByLikes: sortByLikes_,
      dailyPicks: dailyPicks_,
      fetchLimit: 6,
    },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (homeFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
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
        <ProductsRow>
          {homeFeed.data.getHomeFeed.messages.map(
            (element: any, index: number) => {
              const data_ = JSON.parse(element.message);
              const properties_ = JSON.parse(element.properties);

              return outputCardScafollding(data_, properties_, index);
            }
          )}
        </ProductsRow>
      </div>

      {loadMore && homeFeed.data.getHomeFeed.hasMore && (
        <Waypoint onEnter={handleLoadMore} />
      )}
      {loadingMore && (
        <LoaderWrapper>
          <LoaderItem>
            <HashLoader size={50} color={"#ea9085"} />
          </LoaderItem>
        </LoaderWrapper>
      )}
    </>
  );
};
export default Information;
