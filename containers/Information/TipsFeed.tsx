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
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const QuickView = dynamic(() => import("../QuickView/QuickView"));

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
  topLevelCategory = ""
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const targetRef = React.useRef(null);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
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
      tag: tag_
    }
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
    toggleLoading(true);
    tipsFeed.fetchMore({
      variables: {
        offset: Number(tipsFeed.data.getTips.messages.length),
        fetchLimit: 6
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
              ...fetchMoreResult.getTips.messages
            ],
            hasMore: fetchMoreResult.getTips.hasMore
          }
        };
      }
    });
  };

  return (
    <>
      <div ref={targetRef}>
        <ProductsRow>
          {tipsFeed.data.getTips.messages.map((element: any, index: number) => {
            const data_ = JSON.parse(element.message);
            const properties_ = JSON.parse(element.properties);

            switch (properties_.type) {
              case InformationType.TIP:
                return (
                  <ProductsCol key={index}>
                    <ProductCardWrapper>
                      <Fade
                        duration={800}
                        delay={index * 10}
                        style={{ height: "100%" }}
                      >
                        <TipCard
                          CMS_ID={data_.CMS_ID}
                          title={data_.title}
                          text={data_.text}
                          categories={data_.sub_category_names}
                          visibleTags={data_.visible_tags_names}
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
