import React, { useState } from "react";
import dynamic from "next/dynamic";
import gql from "graphql-tag";
import { VideoPlaylistCard } from "components/InformationCard/VideoCard";

import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const QuickView = dynamic(() => import("../QuickView/QuickView"));

const GET_VIDEO_PLAYLISTS = gql`
  query($offset: Int, $fetchLimit: Int) {
    getVideoPlaylistNames(offset: $offset, fetchLimit: $fetchLimit) {
      messages {
        message
        properties
      }
      hasMore
    }
  }
`;

type ProductsProps = {
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({ loadMore = true }) => {
  const [loadingMore, toggleLoading] = useState(false);
  const targetRef = React.useRef(null);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  let videoPlaylistsFeed;

  videoPlaylistsFeed = useQuery(GET_VIDEO_PLAYLISTS);

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

  return (
    <>
      <div ref={targetRef}>
        <ProductsRow>
          {videoPlaylistsFeed.data.getVideoPlaylistNames.messages.map(
            (element: any, index: number) => {
              const data_ = JSON.parse(element.message);
              const properties_ = JSON.parse(element.properties);

              switch (properties_.type) {
                case InformationType.VIDEOPLAYLIST:
                  return (
                    <ProductsCol key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={800}
                          delay={index * 10}
                          style={{ height: "100%" }}
                        >
                          <VideoPlaylistCard
                            CMS_ID={data_.CMS_ID}
                            title={data_.name}
                            byline={data_.byline}
                            likes={properties_.likes}
                            shares={properties_.shares}
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsCol>
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
