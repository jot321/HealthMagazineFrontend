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
} from "constants/categories";

import { Waypoint } from "react-waypoint";

const GET_VIDEO_PLAYLISTS = gql`
  query($toplevelcategory: String, $offset: Int, $fetchLimit: Int) {
    getVideoPlaylistNames(
      toplevelcategory: $toplevelcategory
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
  border-radius: 7px;
  display: inline-block;
  margin-right: 10px;
  background-color: #ea9085;
  color: #fff;

  margin-bottom: 5px;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  padding-top: 0.3rem;
  padding-bottom: 0.3rem;
`;

type ProductsProps = {
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({ loadMore = true }) => {
  const [loadingMore, toggleLoading] = useState(false);
  const [videoCategory, setVideoCategory] = useState(null);

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

  if (videoPlaylistsFeed.error) return <div>{videoPlaylistsFeed.error.message}</div>;

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
        offset: Number(videoPlaylistsFeed.data.getVideoPlaylistNames.messages.length),
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

  const onClickCategory = (category) => {
    setVideoCategory(category);
  };

  return (
    <>
      <div>
        <TagWrapper>
          <Tag onClick={() => onClickCategory(DIET_TOP_CATEGORY)}>Diet & Nutrition</Tag>
          <Tag onClick={() => onClickCategory(FITNESS_TOP_CATEGORY)}>Fitness</Tag>
          <Tag onClick={() => onClickCategory(PAIN_TOP_CATEGORY)}>Relieve Pain</Tag>
          <Tag onClick={() => onClickCategory(WEIGHT_TOP_CATEGORY)}>Weight Management</Tag>
          <Tag onClick={() => onClickCategory(MENTAL_TOP_CATEGORY)}>Mental Wellness</Tag>
          <Tag onClick={() => onClickCategory(GENERAL_TOP_CATEGORY)}>General Health</Tag>
          <Tag onClick={() => onClickCategory(CHRONIC_TOP_CATEGORY)}>Diseases</Tag>
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
                        <Fade duration={800} delay={index * 10} style={{ height: "100%" }}>
                          <VideoPlaylistCard
                            CMS_ID={data_.CMS_ID}
                            title={data_.name}
                            image={data_.image}
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
