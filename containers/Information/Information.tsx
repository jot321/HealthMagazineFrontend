import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { openModal, closeModal } from "@redq/reuse-modal";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { QuoteCard } from "components/InformationCard/QuoteCard";
import { StoryCard } from "components/InformationCard/StoryCard";

import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsCol,
  ButtonWrapper,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import Placeholder from "components/Placeholder/Placeholder";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const QuickView = dynamic(() => import("../QuickView/QuickView"));

const GET_HOME_FEED = gql`
  query getFeed(
    $sortByLikes: Boolean
    $dailyPicks: Boolean
    $offset: Int
    $fetchLimit: Int
    $category: String
    $tag: String
    $articleId: String
  ) {
    getHomeFeed(
      sortByLikes: $sortByLikes
      dailyPicks: $dailyPicks
      offset: $offset
      fetchLimit: $fetchLimit
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
  type: string;
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({ deviceType, type, loadMore = true }) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  let category_ = null;
  let tag_ = null;
  let articleId_ = null;
  let sortByLikes_ = false;
  let dailyPicks_ = false;

  if (router.query.category) {
    category_ = String(router.query.category);
  } else if (router.query.tag) {
    tag_ = String(router.query.tag);
  } else if (router.query.articleId) {
    articleId_ = String(router.query.articleId);
  }

  if (router.query.sortByLikes === "true") {
    sortByLikes_ = true;
  }
  if (router.query.dailyPicks === "true") {
    dailyPicks_ = true;
  }

  const homeFeed = useQuery(GET_HOME_FEED, {
    variables: {
      articleId: articleId_,
      category: category_,
      tag: tag_,
      sortByLikes: sortByLikes_,
      dailyPicks: dailyPicks_,
      fetchLimit: 6
    }
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

  if (!homeFeed.data || !homeFeed.data.getHomeFeed || homeFeed.data.getHomeFeed.length === 0) {
    return <NoResultFound />;
  }

  const InformationType = {
    LISTICLE: 1,
    SHORT_ARTICLE: 2,
    IMAGE_ARTICLE: 3,
    TIP: 4
  };

  // -----------------------------------------------------------
  // QUICK VIEW MODAL SECTION
  // -----------------------------------------------------------
  // const handleModalClose = () => {
  //   const href = `${router.pathname}`;
  //   const as = "/";
  //   router.push(href, as, { shallow: true });
  //   closeModal();
  // };

  // const handleQuickViewModal = React.useCallback(
  //   (modalProps: any, deviceType: any, onModalClose: any) => {
  //     if (router.pathname === "/product/[slug]") {
  //       const as = `/product/${modalProps.slug}`;
  //       router.push(router.pathname, as);
  //       return;
  //     }
  //     openModal({
  //       show: true,
  //       overlayClassName: "quick-view-overlay",
  //       closeOnClickOutside: false,
  //       component: QuickView,
  //       componentProps: { modalProps, deviceType, onModalClose },
  //       closeComponent: "div",
  //       config: {
  //         enableResizing: false,
  //         disableDragging: true,
  //         className: "quick-view-modal",
  //         width: 900,
  //         y: 30,
  //         height: "auto",
  //         transition: {
  //           mass: 1,
  //           tension: 0,
  //           friction: 0
  //         }
  //       }
  //     });
  //     const href = `${router.pathname}?${modalProps.slug}`;
  //     const as = `/product/${modalProps.slug}`;
  //     router.push(href, as, { shallow: true });
  //   },
  //   []
  // );

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    toggleLoading(true);
    homeFeed.fetchMore({
      variables: {
        offset: Number(homeFeed.data.getHomeFeed.messages.length),
        fetchLimit: 6
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getHomeFeed: {
            __typename: prev.getHomeFeed.__typename,
            messages: [...prev.getHomeFeed.messages, ...fetchMoreResult.getHomeFeed.messages],
            hasMore: fetchMoreResult.getHomeFeed.hasMore
          }
        };
      }
    });
  };

  return (
    <>
      <ProductsRow>
        {/* <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <TipCard
                title={"Tea Tree Oil in Acne"}
                description={
                  "According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area." 
                }
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol> */}
        {/* <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <QuoteCard
                title={"Tea Tree Oil in Acne"}
                description={
                  "According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area"
                }
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol> */}
        {/* <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <StoryCard
                title={"Battling Diabetes"}
                description={
                  "According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area"
                }
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol> */}
        {/* {data.getShortArticles.map((article: any, index: number) => {
          return (
            <ProductsCol key={index}>
              <ProductCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  <SimpleCardWithCollapse
                    CMS_ID={article.CMS_ID}
                    title={article.title}
                    byline={article.byline}
                    description={article.description}
                    categories={article.sub_category_names}
                    visibleTags={article.visible_tags_names}
                    imageUrl={article.attachedImage}
                    likes={article.likes}
                    shares={article.shares}
                  />
                </Fade>
              </ProductCardWrapper>
            </ProductsCol>
          );
        })} */}
        {homeFeed.data.getHomeFeed.messages.map((element: any, index: number) => {
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

      {loadMore && homeFeed.data.getHomeFeed.hasMore && <Waypoint onEnter={handleLoadMore} />}
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
