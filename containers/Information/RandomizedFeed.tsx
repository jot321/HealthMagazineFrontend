import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { openModal, closeModal } from "@redq/reuse-modal";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { QuoteCard } from "components/InformationCard/QuoteCard";
import { StoryCard } from "components/InformationCard/StoryCard";

import HashLoader from "react-spinners/HashLoader";

import { ProductsRow, ProductsCol, LoaderWrapper, LoaderItem, ProductCardWrapper } from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const QuickView = dynamic(() => import("../QuickView/QuickView"));

const GET_RANDOM_ARTICLEIDS = gql`
  query getArticleIds {
    getRandomSampledArticleIds
  }
`;

const GET_ARTICLE_INFO_FROM_ARR = gql`
  query getArticleDetails($inputIds: [String]) {
    getArticleInformationFromArrayofIds(inputIds: $inputIds) {
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

export const RandomizedFeed: React.FC<ProductsProps> = ({ deviceType, loadMore = true }) => {
  const [loadingMore, toggleLoading] = useState(false);
  const targetRef = React.useRef(null);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const [iteration, setIteration] = useState(1);
  const [offset, setOffset] = useState(0);
  const STEP = 5;

  const articleIds = useQuery(GET_RANDOM_ARTICLEIDS);
  const articlesData = useQuery(GET_ARTICLE_INFO_FROM_ARR, {
    variables: {
      inputIds:
        articleIds.data.getRandomSampledArticleIds == undefined
          ? undefined
          : articleIds.data.getRandomSampledArticleIds.slice(0, STEP)
    }
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

  const InformationType = {
    LISTICLE: 1,
    SHORT_ARTICLE: 2,
    IMAGE_ARTICLE: 3,
    TIP: 4
  };

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
        inputIds: articleIds.data.getRandomSampledArticleIds.slice(offset + STEP, (iteration + 1) * STEP)
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          getArticleInformationFromArrayofIds: [
            ...prev.getArticleInformationFromArrayofIds,
            ...fetchMoreResult.getArticleInformationFromArrayofIds
          ]
        };
      }
    });
  };

  return (
    <>
      <div ref={targetRef}>
        <ProductsRow>
          {articlesData.data.getArticleInformationFromArrayofIds.map((element: any, index: number) => {
            const data_ = JSON.parse(element.message);
            const properties_ = JSON.parse(element.properties);

            switch (properties_.type) {
              case InformationType.LISTICLE:
                return (
                  <ProductsCol key={index}>
                    <ProductCardWrapper>
                      <Fade duration={800} delay={index * 10} style={{ height: "100%" }}>
                        <SimpleCardWithCollapse
                          CMS_ID={data_.CMS_ID}
                          title={data_.title}
                          byline={data_.byline}
                          description={data_.description}
                          listicles={data_.listicleItems}
                          categories={data_.sub_category_names}
                          visibleTags={data_.visible_tags_names}
                          imageUrl={data_.attachedImage}
                          likes={properties_.likes}
                          shares={properties_.shares}
                        />
                      </Fade>
                    </ProductCardWrapper>
                  </ProductsCol>
                );
                break;
              case InformationType.SHORT_ARTICLE:
                return (
                  <ProductsCol key={index}>
                    <ProductCardWrapper>
                      <Fade duration={800} delay={index * 10} style={{ height: "100%" }}>
                        <SimpleCardWithCollapse
                          CMS_ID={data_.CMS_ID}
                          title={data_.title}
                          byline={data_.byline}
                          description={data_.description}
                          categories={data_.sub_category_names}
                          visibleTags={data_.visible_tags_names}
                          imageUrl={data_.attachedImage}
                          likes={properties_.likes}
                          shares={properties_.shares}
                        />
                      </Fade>
                    </ProductCardWrapper>
                  </ProductsCol>
                );
                break;
            }
          })}
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
