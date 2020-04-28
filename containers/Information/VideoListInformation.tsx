import React, { useState } from "react";
import gql from "graphql-tag";
import { VideoPageWrapper } from "components/InformationCard/VideoCard";
import { VideoPlaylistCard } from "components/InformationCard/VideoCard";
import { useRouter } from "next/router";
import styled from "styled-components";

import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  VideoProductCardWrapper,
  ProductsColDivided,
  ProductCardWrapper,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const Title = styled.div`
  width: 100%;
  h2 {
    border-left: 4px solid #ea9085;
    padding: 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.4rem;
    margin-left: 1rem;

    color: #000;
    text-transform: capitalize;
  }
`;

const GET_VIDEOS_FROM_PLAYLIST = gql`
  query($vpid: String) {
    getVideosFromPlaylist(vpid: $vpid)
  }
`;

const GET_RELATED_VIDEO_PLAYLISTS = gql`
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

type ProductsProps = {
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({ loadMore = true }) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const topLevelCategory = router.query.tlc === null ? "" : router.query.tlc;

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const videosList = useQuery(GET_VIDEOS_FROM_PLAYLIST, {
    variables: {
      vpid: router.query.vpid,
    },
  });

  const videoPlaylistsFeed = useQuery(GET_RELATED_VIDEO_PLAYLISTS, {
    variables: { toplevelcategory: topLevelCategory },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (videosList.loading || videoPlaylistsFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (videosList.error || videoPlaylistsFeed.error)
    return <div>{videosList.error.message}</div>;

  if (
    !videosList.data ||
    !videoPlaylistsFeed.data ||
    !videosList.data.getVideosFromPlaylist ||
    !videoPlaylistsFeed.data.getVideoPlaylistNames ||
    videosList.data.getVideosFromPlaylist.length === 0 ||
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
  //   const handleLoadMore = () => {
  //     toggleLoading(true);
  //     videosList.fetchMore({
  //       variables: {
  //         offset: Number(
  //           videosList.data.getVideosFromPlaylists.messages.length
  //         ),
  //         fetchLimit: 6
  //       },
  //       updateQuery: (prev: any, { fetchMoreResult }) => {
  //         toggleLoading(false);
  //         if (!fetchMoreResult) {
  //           return prev;
  //         }
  //         return {
  //           getVideoPlaylistNames: {
  //             __typename: prev.getVideoPlaylistNames.__typename,
  //             messages: [
  //               ...prev.getVideoPlaylistNames.messages,
  //               ...fetchMoreResult.getVideoPlaylistNames.messages
  //             ],
  //             hasMore: fetchMoreResult.getVideoPlaylistNames.hasMore
  //           }
  //         };
  //       }
  //     });
  //   };

  const data_ = JSON.parse(videosList.data.getVideosFromPlaylist);

  return (
    <>
      <div>
        <ProductsRow>
          {/* <ProductsCol key={1}> */}
          <VideoProductCardWrapper>
            <Fade duration={800} delay={1 * 10} style={{ height: "100%" }}>
              <VideoPageWrapper
                CMS_ID={data_.CMS_ID}
                title={data_.name}
                byline={data_.byline}
                videoLinks={data_.videoLinks}
              />
            </Fade>
          </VideoProductCardWrapper>
          {/* </ProductsCol> */}
        </ProductsRow>
        <ProductsRow>
          <Title>
            <h2>Related Playlists</h2>
            <br></br>
          </Title>
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
                            topLevelCategorySlug={topLevelCategory}
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

      {/* {loadMore && videoPlaylistsFeed.data.getVideoPlaylistNames.hasMore && (
        <Waypoint onEnter={handleLoadMore} />
      )}
      {loadingMore && (
        <LoaderWrapper>
          <LoaderItem>
            <HashLoader size={50} color={"#ea9085"} />
          </LoaderItem>
        </LoaderWrapper>
      )} */}
    </>
  );
};
export default Information;
