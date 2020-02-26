import React, { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { openModal, closeModal } from "@redq/reuse-modal";
import ShortArticleFrontCard from "components/ProductCard/ShortArticleFrontCard";
import { InfoCard } from "components/InformationCard/InfoCard";
import { DesignCard } from "components/InformationCard/DesignCard";
import { SimpleUserCard } from "components/InformationCard/SimpleUserCard";
import { FactCard } from "components/InformationCard/FactCard";

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
    shortArticles {
      Title
      Description
      LongText
      Topics {
        Topic
      }
      AttachedImage {
        url
      }
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
  if (!data || !data.shortArticles || data.shortArticles.length === 0) {
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
        <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <SimpleUserCard />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>

        <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <FactCard />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>

        <ProductsCol>
          <ProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <InfoCard
                title={data.shortArticles[0].Title}
                description={data.shortArticles[0].Description}
                longText={data.shortArticles[0].LongText}
                imageUrl={data.shortArticles[0].AttachedImage[0].url}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductsCol>

        {/* {data.shortArticles.map((article: any, index: number) => {
          return (
            <ProductsCol key={index}>
              <ProductCardWrapper>
                <Fade
                  duration={800}
                  delay={index * 10}
                  style={{ height: "100%" }}
                >
                  <ShortArticleFrontCard
                  title={article.Title}
                  description={article.Description}
                  // tags={article.Topics}
                  data={article}
                  deviceType={deviceType}
                  // onClick={() =>
                  //   handleQuickViewModal(article, deviceType, handleModalClose)
                  // }
                />

                  <InfoCard
                    title={article.Title}
                    description={article.Description}
                    longText={article.LongText}
                    imageUrl={article.AttachedImage[0].url}
                  />

                  <DesignCard/>
                  <SimpleUserCard />

                </Fade>
              </ProductCardWrapper>
            </ProductsCol>
          );
        })} */}
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
