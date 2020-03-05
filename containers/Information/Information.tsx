import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { openModal, closeModal } from "@redq/reuse-modal";
import ShortArticleFrontCard from "components/ProductCard/ShortArticleFrontCard";
import { InfoCard } from "components/InformationCard/InfoCard";
import { DesignCard } from "components/InformationCard/DesignCard";
import { SimpleUserCard } from "components/InformationCard/SimpleUserCard";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { QuoteCard } from "components/InformationCard/QuoteCard";
import { StoryCard } from "components/InformationCard/StoryCard";

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

const QuickView = dynamic(() => import("../QuickView/QuickView"));

const GET_SHORT_ARTICLES = gql`
  query {
    getShortArticles {
      CMS_ID
      title
      byline
      description
      attachedImage
      category_name
      tags_name
      likes
      shares
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
  fetchLimit?: number;
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({
  deviceType,
  type,
  fetchLimit = 8,
  loadMore = true
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  // const { data, error, loading, fetchMore } = useQuery(GET_PRODUCTS, {
  //   variables: {
  //     type: type,
  //     text: router.query.text,
  //     category: router.query.category,
  //     offset: 0,
  //     limit: fetchLimit
  //   }
  // });

  const { data, error, loading, fetchMore } = useQuery(GET_SHORT_ARTICLES);
  // console.log(data.getShortArticles);

  // Quick View Modal
  const handleModalClose = () => {
    const href = `${router.pathname}`;
    const as = "/";
    router.push(href, as, { shallow: true });
    closeModal();
  };

  const handleQuickViewModal = React.useCallback(
    (modalProps: any, deviceType: any, onModalClose: any) => {
      if (router.pathname === "/product/[slug]") {
        const as = `/product/${modalProps.slug}`;
        router.push(router.pathname, as);
        return;
      }
      openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: false,
        component: QuickView,
        componentProps: { modalProps, deviceType, onModalClose },
        closeComponent: "div",
        config: {
          enableResizing: false,
          disableDragging: true,
          className: "quick-view-modal",
          width: 900,
          y: 30,
          height: "auto",
          transition: {
            mass: 1,
            tension: 0,
            friction: 0
          }
        }
      });
      const href = `${router.pathname}?${modalProps.slug}`;
      const as = `/product/${modalProps.slug}`;
      router.push(href, as, { shallow: true });
    },
    []
  );

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
        <LoaderItem>
          <Placeholder />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (error) return <div>{error.message}</div>;
  if (!data || !data.getShortArticles || data.getShortArticles.length === 0) {
    return <NoResultFound />;
  }
  // const handleLoadMore = () => {
  //   toggleLoading(true);
  //   fetchMore({
  //     variables: {
  //       offset: Number(data.products.items.length),
  //       limit: fetchLimit
  //     },
  //     updateQuery: (prev, { fetchMoreResult }) => {
  //       toggleLoading(false);
  //       if (!fetchMoreResult) {
  //         return prev;
  //       }
  //       return {
  //         products: {
  //           __typename: prev.products.__typename,
  //           items: [...prev.products.items, ...fetchMoreResult.products.items],
  //           hasMore: fetchMoreResult.products.hasMore
  //         }
  //       };
  //     }
  //   });
  // };

  return (
    <>
      <ProductsRow>
        {/* <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <TipCard
                title={"Tea Tree Oil in Acne"}
                description={
                  "According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area. According to the Mayo Clinic, it may “reduce the number of inflamed and non-inflamed lesions. To use tea tree oil for pimples, apply a couple drops to the inflamed area"
                }
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>

        <ProductsCol>
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
        </ProductsCol>

        <ProductsCol>
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
        {data.getShortArticles.map((article: any, index: number) => {
          // Setting default values for the category in case its not set in the backend
          // TODO: Ideally this should be done somewhere in the backend
          console.log(article);
          let categoryName =
            article.category_name == null ? "Health" : article.category_name;

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
                    category={categoryName}
                    tags={article.tags_name}
                    imageUrl={article.attachedImage}
                    likes={article.likes}
                    shares={article.shares}
                  />
                </Fade>
              </ProductCardWrapper>
            </ProductsCol>
          );
        })}
      </ProductsRow>
      {/* {loadMore && data.products.hasMore && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            title="Load More"
            intlButtonId="loadMoreBtn"
            size="small"
            isLoading={loadingMore}
            loader={<Loader color="#009E7F" />}
            style={{
              minWidth: 135,
              backgroundColor: "#ffffff",
              border: "1px solid #f1f1f1",
              color: "#009E7F"
            }}
          />
        </ButtonWrapper>
      )} */}
    </>
  );
};
export default Information;
