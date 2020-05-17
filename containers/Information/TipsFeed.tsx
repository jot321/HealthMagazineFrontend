import React, { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import HashLoader from "react-spinners/HashLoader";
import NoResultFound from "components/NoResult/NoResult";
import { Waypoint } from "react-waypoint";

import { ProductsRow, LoaderWrapper, LoaderItem } from "./Information.style";
import { outputCardScafollding } from "./contentScaffolding";

const GET_TIPS = gql`
  query($offset: Int, $fetchLimit: Int, $category: String, $tag: String) {
    getTips(
      offset: $offset
      fetchLimit: $fetchLimit
      category: $category
      tag: $tag
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
};

export const TipsFeed: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true,
  loadPopular = false,
  loadFeatured = false,
  topLevelCategory = "",
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
  let articleId_ = null;
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

  const tipsFeed = useQuery(GET_TIPS, {
    variables: {
      category: category_,
      tag: tag_,
    },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (tipsFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (tipsFeed.error) return <div>{tipsFeed.error.message}</div>;

  if (
    !tipsFeed.data ||
    !tipsFeed.data.getTips ||
    tipsFeed.data.getTips.length === 0
  ) {
    return <NoResultFound />;
  }

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    toggleLoading(true);
    tipsFeed.fetchMore({
      variables: {
        offset: Number(tipsFeed.data.getTips.messages.length),
        fetchLimit: 6,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getTips: {
            __typename: prev.getTips.__typename,
            messages: [
              ...prev.getTips.messages,
              ...fetchMoreResult.getTips.messages,
            ],
            hasMore: fetchMoreResult.getTips.hasMore,
          },
        };
      },
    });
  };

  return (
    <>
      <div>
        <ProductsRow>
          {tipsFeed.data.getTips.messages.map((element: any, index: number) => {
            const data_ = JSON.parse(element.message);
            const properties_ = JSON.parse(element.properties);

            return outputCardScafollding(data_, properties_, index);
          })}
        </ProductsRow>
      </div>

      {loadMore && tipsFeed.data.getTips.hasMore && (
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
export default TipsFeed;
