import React, { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import NoResultFound from "components/NoResult/NoResult";
import HashLoader from "react-spinners/HashLoader";
import { Waypoint } from "react-waypoint";

import { ProductsRow, LoaderWrapper, LoaderItem } from "./Information.style";
import { outputCardScafollding } from "./contentScaffolding";

const GET_RANDOM_ARTICLEIDS = gql`
  query getArticleIds {
    getRandomSampledArticleIds
  }
`;

const GET_ARTICLE_INFO_FROM_ARR = gql`
  query getArticleDetails($inputIds: [String], $articleId: String) {
    getArticleInformationFromArrayofIds(
      inputIds: $inputIds
      articleId: $articleId
    ) {
      message
      properties
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
};

export const RandomizedFeed: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);

  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------

  const [iteration, setIteration] = useState(1);
  const [offset, setOffset] = useState(0);
  const STEP = 3;

  const articleIds = useQuery(GET_RANDOM_ARTICLEIDS);

  const articlesData = useQuery(GET_ARTICLE_INFO_FROM_ARR, {
    variables: {
      articleId: router.query.articleId,
      inputIds:
        articleIds.data.getRandomSampledArticleIds == undefined
          ? undefined
          : articleIds.data.getRandomSampledArticleIds.slice(0, STEP),
    },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (articleIds.loading || articlesData.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (articleIds.error) return <div>{articleIds.error.message}</div>;
  if (articlesData.error) return <div>{articlesData.error.message}</div>;

  if (
    !articlesData.data ||
    !articlesData.data.getArticleInformationFromArrayofIds ||
    articlesData.data.getArticleInformationFromArrayofIds.length === 0
  ) {
    return <NoResultFound />;
  }

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    setOffset(iteration * STEP);
    setIteration(iteration + 1);
    toggleLoading(true);

    // TODO - Can cleanup the offset and iteration logic to be less cryptic and error prone
    articlesData.fetchMore({
      variables: {
        inputIds: articleIds.data.getRandomSampledArticleIds.slice(
          offset + STEP,
          (iteration + 1) * STEP
        ),
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          getArticleInformationFromArrayofIds: [
            ...prev.getArticleInformationFromArrayofIds,
            ...fetchMoreResult.getArticleInformationFromArrayofIds,
          ],
        };
      },
    });
  };

  return (
    <>
      <div>
        <ProductsRow>
          {articlesData.data.getArticleInformationFromArrayofIds.map(
            (element: any, index: number) => {
              const data_ = JSON.parse(element.message);
              const properties_ = JSON.parse(element.properties);

              return outputCardScafollding(data_, properties_, index);
            }
          )}
        </ProductsRow>
      </div>

      {loadMore && <Waypoint onEnter={handleLoadMore} />}
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
export default RandomizedFeed;
