import React, { useState } from "react";
import gql from "graphql-tag";
import { VideoPageWrapper } from "components/InformationCard/VideoCard";
import { useRouter } from "next/router";

import HashLoader from "react-spinners/HashLoader";

import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  VideoProductCardWrapper,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import Fade from "react-reveal/Fade";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const GET_VIDEOS_FROM_PLAYLIST = gql`
  query($vpid: String) {
    getVideosFromPlaylist(vpid: $vpid)
  }
`;

type ProductsProps = {
  loadMore?: boolean;
};

export const Information: React.FC<ProductsProps> = ({ loadMore = true }) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);

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

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (videosList.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (videosList.error) return <div>{videosList.error.message}</div>;

  if (
    !videosList.data ||
    !videosList.data.getVideosFromPlaylist ||
    videosList.data.getVideosFromPlaylist.length === 0
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
