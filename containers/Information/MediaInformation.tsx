import React, { useState } from "react";
import gql from "graphql-tag";
import styled from "styled-components";

import { VideoPlaylistCard } from "components/InformationCard/VideoCard";

import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsColDivided,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";
import {
  DIET_TOP_CATEGORY,
  FITNESS_TOP_CATEGORY,
  MENTAL_TOP_CATEGORY,
  WEIGHT_TOP_CATEGORY,
  GENERAL_TOP_CATEGORY,
  PAIN_TOP_CATEGORY,
  CHRONIC_TOP_CATEGORY,
  SKIN_HAIR_TOP_CATEGORY,
  SEXUAL_TOP_CATEGORY,
} from "constants/categories";

import { Waypoint } from "react-waypoint";
import { sentenceToSlug } from "helper/slug";

const GET_VIDEO_PLAYLISTS = gql`
  query($toplevelcategory: String, $offset: Int, $fetchLimit: Int) {
    getVideoPlaylistNames(
      topLevelCategorySlug: $toplevelcategory
      offset: $offset
      fetchLimit: $fetchLimit
    ) {
      messages {
        message
        properties
      }
      hasMore
    }
  }
`;

const TagWrapper = styled.div`
  margin-top: 10px;
`;

const Tag = styled.div`
  a {
    text-decoration: none;
    color: #fff;
  }

  text-decoration: none;
  border-radius: 7px;
  display: inline-block;
  margin-right: 10px;
  color: #ea9085;
  background-color: #fff;
  border: 1px solid #ea9085;

  margin-bottom: 7px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
  margin-left: 3px;

  &.active {
    background-color: #ea9085;
    color: #fff;
  }
`;

type ProductsProps = {
  urlVideoCategory?: string;
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({
  urlVideoCategory = "",
  loadMore = true,
}) => {
  const [loadingMore, toggleLoading] = useState(false);
  const [videoCategory, setVideoCategory] = useState(urlVideoCategory);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const videoPlaylistsFeed = useQuery(GET_VIDEO_PLAYLISTS, {
    variables: { toplevelcategory: videoCategory },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (videoPlaylistsFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (videoPlaylistsFeed.error)
    return <div>{videoPlaylistsFeed.error.message}</div>;

  if (
    !videoPlaylistsFeed.data ||
    !videoPlaylistsFeed.data.getVideoPlaylistNames ||
    videoPlaylistsFeed.data.getVideoPlaylistNames.length === 0
  ) {
    return <NoResultFound />;
  }

  const InformationType = {
    VIDEOPLAYLIST: 5,
  };

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  const handleLoadMore = () => {
    toggleLoading(true);
    videoPlaylistsFeed.fetchMore({
      variables: {
        offset: Number(
          videoPlaylistsFeed.data.getVideoPlaylistNames.messages.length
        ),
        fetchLimit: 5,
      },
      updateQuery: (prev: any, { fetchMoreResult }) => {
        toggleLoading(false);
        if (!fetchMoreResult) {
          return prev;
        }
        return {
          getVideoPlaylistNames: {
            __typename: prev.getVideoPlaylistNames.__typename,
            messages: [
              ...prev.getVideoPlaylistNames.messages,
              ...fetchMoreResult.getVideoPlaylistNames.messages,
            ],
            hasMore: fetchMoreResult.getVideoPlaylistNames.hasMore,
          },
        };
      },
    });
  };

  // Top Level Category Links
  const VideoCategoryLink = (topLevelCategory, title) => {
    return (
      <Tag
        onClick={() => {
          setVideoCategory(topLevelCategory);
        }}
        className={videoCategory === topLevelCategory ? "active" : ""}
      >
        {title}
      </Tag>
    );
  };

  return (
    <>
      <div>
        <TagWrapper>
          {VideoCategoryLink("", "All")}
          {VideoCategoryLink(sentenceToSlug(DIET_TOP_CATEGORY), "Nutrition")}
          {VideoCategoryLink(sentenceToSlug(MENTAL_TOP_CATEGORY), "Mind")}
          {VideoCategoryLink(sentenceToSlug(FITNESS_TOP_CATEGORY), "Fitness")}
          {VideoCategoryLink(sentenceToSlug(PAIN_TOP_CATEGORY), "Pain")}
          {VideoCategoryLink(
            sentenceToSlug(SKIN_HAIR_TOP_CATEGORY),
            "Skin & Hair"
          )}
          {VideoCategoryLink(
            sentenceToSlug(WEIGHT_TOP_CATEGORY),
            "Weight Loss"
          )}
          {VideoCategoryLink(sentenceToSlug(GENERAL_TOP_CATEGORY), "Wellness")}
          {VideoCategoryLink(sentenceToSlug(CHRONIC_TOP_CATEGORY), "Chronic")}
          {VideoCategoryLink(sentenceToSlug(SEXUAL_TOP_CATEGORY), "Sexual")}
        </TagWrapper>

        <ProductsRow>
          {videoPlaylistsFeed.data.getVideoPlaylistNames.messages.map(
            (element: any, index: number) => {
              const data_ = JSON.parse(element.message);
              const properties_ = JSON.parse(element.properties);

              switch (properties_.type) {
                case InformationType.VIDEOPLAYLIST:
                  return (
                    <ProductsColDivided key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={100}
                          delay={0}
                          style={{ height: "100%" }}
                        >
                          <VideoPlaylistCard
                            CMS_ID={data_.CMS_ID}
                            title={data_.name}
                            image={data_.image}
                            topLevelCategorySlug={
                              properties_.top_level_category_slug
                            }
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsColDivided>
                  );
                  break;
              }
            }
          )}
        </ProductsRow>
      </div>

      {loadMore && videoPlaylistsFeed.data.getVideoPlaylistNames.hasMore && (
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
