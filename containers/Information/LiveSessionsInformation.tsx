import React, { useState } from "react";
import { useRouter } from "next/router";
import gql from "graphql-tag";
import HashLoader from "react-spinners/HashLoader";

import { CoachEvent } from "components/InformationCard/CoachCard";

import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import NoResultFound from "components/NoResult/NoResult";

import { Waypoint } from "react-waypoint";

const GET_EVENTS = gql`
  query {
    getEvents
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

export const LiveSessionsInformation: React.FC<ProductsProps> = ({
  deviceType,
  loadMore = true,
}) => {
  const router = useRouter();
  const [loadingMore, toggleLoading] = useState(false);
  const targetRef = React.useRef(null);

  // -----------------------------------------------------------
  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------
  // -----------------------------------------------------------

  const trainersFeed = useQuery(GET_EVENTS);

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (trainersFeed.loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (trainersFeed.error) return <div>{trainersFeed.error.message}</div>;

  if (
    !trainersFeed.data ||
    !trainersFeed.data.getEvents ||
    trainersFeed.data.getEvents.length === 0
  ) {
    return <NoResultFound />;
  }

  const parsedTrainersFeed = JSON.parse(trainersFeed.data.getEvents);

  // -----------------------------------------------------------
  // LOAD MORE SECTION
  // -----------------------------------------------------------
  //   const handleLoadMore = () => {
  //     toggleLoading(true);
  //     homeFeed.fetchMore({
  //       variables: {
  //         offset: Number(homeFeed.data.getHomeFeed.messages.length),
  //         fetchLimit: 6
  //       },
  //       updateQuery: (prev: any, { fetchMoreResult }) => {
  //         toggleLoading(false);
  //         if (!fetchMoreResult) {
  //           return prev;
  //         }
  //         return {
  //           getHomeFeed: {
  //             __typename: prev.getHomeFeed.__typename,
  //             messages: [
  //               ...prev.getHomeFeed.messages,
  //               ...fetchMoreResult.getHomeFeed.messages
  //             ],
  //             hasMore: fetchMoreResult.getHomeFeed.hasMore
  //           }
  //         };
  //       }
  //     });
  //   };

  return (
    <>
      <div ref={targetRef}>
        <ProductsRow>
          {parsedTrainersFeed.map((record, index) => {
            return record.events.map((event) => {
              return (
                <ProductsCol key={index}>
                  <ProductCardWrapper>
                    <CoachEvent
                      key={index}
                      title={event.title}
                      imageUrl={event.eventPhoto}
                      bookLink={event.detailsLink}
                      price={event.price}
                      timing={event.time}
                      profile={{
                        name: record.firstName + " " + record.lastName,
                        slug: record.slug,
                        photo: record.profilePhoto,
                      }}
                    ></CoachEvent>
                  </ProductCardWrapper>
                </ProductsCol>
              );
            });
          })}
        </ProductsRow>
      </div>

      {/* {loadMore && homeFeed.data.getHomeFeed.hasMore && <Waypoint onEnter={handleLoadMore} />}
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
export default LiveSessionsInformation;
