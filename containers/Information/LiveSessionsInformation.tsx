import React, { useState } from "react";
import styled from "styled-components";
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
  ProductsColDivided,
} from "./Information.style";
import { useQuery } from "@apollo/react-hooks";
import NoResultFound from "components/NoResult/NoResult";

import { TwoTileCardBackground } from "components/Tile/Tile";
import { GroupTopBar } from "styled/pages.style";
import {
  FITNESS_TOP_CATEGORY,
  DIET_TOP_CATEGORY,
  MENTAL_TOP_CATEGORY,
} from "constants/categories";

import { Waypoint } from "react-waypoint";

const verifiedIcon = require("../../image/icons/verified.png");

const GET_EVENTS = gql`
  query {
    getEvents
  }
`;

const GET_COACHS = gql`
  query($slug: String, $toplevelcategory: String) {
    getProfessionals(slug: $slug, toplevelcategory: $toplevelcategory) {
      messages
      hasMore
    }
  }
`;

const ExpertUnitWrapper = styled.div`
  .topbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2px;
    margin-bottom: 5px;
  }
  .user_name {
    display: flex;
    align-items: center;

    p.name {
      color: #000;
      font-weight: 500;
      font-size: 15px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
  p.role {
    color: #000;
    font-size: 10px;
    font-weight: 300;
    text-transform: uppercase;
  }

  .social_panel {
    display: flex;
    align-items: center;
    padding: 10px;
  }

  p.offer {
    margin-left: 3px;
    margin-top: 15px;
    font-weight: 600;
    font-size: 13px;
    padding: 2px;
  }
  p.know_more {
    margin-top: 10px;
    font-size: 13px;
    padding: 6px;
    text-align: center;
    font-weight: 500;
    border-radius: 6px;
    background-color: #e43f5a;
    color: #fff;
  }

  p.byline {
    font-size: 13px;
    // min-height: 50px;
  }
`;

const ExpertsTopic = {
  EXPERTS: 1,
  EVENTS: 2,
};

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
  const [selectedTopic, setSelectedTopic] = useState(ExpertsTopic.EXPERTS);
  const [selectedTopCategory, setSelectedTopCategory] = useState(null);
  const [loadingMore, toggleLoading] = useState(false);

  // -----------------------------------------------------------
  // DATA FETCHING - QUERY SECTION
  // -----------------------------------------------------------

  const trainersFeed = useQuery(GET_EVENTS);
  const coachesFeed = useQuery(GET_COACHS, {
    variables: {
      toplevelcategory: selectedTopCategory,
    },
  });

  // -----------------------------------------------------------
  // LOADING AND ERROR SECTION
  // -----------------------------------------------------------
  if (trainersFeed.loading || coachesFeed.loading) {
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

  if (
    !coachesFeed ||
    !coachesFeed.data.getProfessionals ||
    coachesFeed.data.getProfessionals.messages.length === 2
  ) {
    return <NoResultFound />;
  }

  const coachesParsedFeed = JSON.parse(
    coachesFeed.data.getProfessionals.messages
  );

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
      <div>
        <GroupTopBar>
          <div className="content_categories">
            <div
              onClick={() => {
                setSelectedTopic(ExpertsTopic.EXPERTS);
              }}
              className={`category_button ${
                selectedTopic == ExpertsTopic.EXPERTS ? "active" : ""
              }`}
            >
              Experts
            </div>
            <div
              onClick={() => {
                setSelectedTopic(ExpertsTopic.EVENTS);
              }}
              className={`category_button ${
                selectedTopic == ExpertsTopic.EVENTS ? "active" : ""
              }`}
            >
              Events
            </div>
          </div>
        </GroupTopBar>

        {selectedTopic == ExpertsTopic.EXPERTS && (
          <GroupTopBar>
            <div className="content_categories">
              <div
                onClick={() => {
                  setSelectedTopCategory(null);
                }}
                className={`category_button_level_2 ${
                  selectedTopCategory == null ? "active" : ""
                }`}
              >
                All
              </div>
              <div
                onClick={() => {
                  setSelectedTopCategory(FITNESS_TOP_CATEGORY);
                }}
                className={`category_button_level_2 ${
                  selectedTopCategory == FITNESS_TOP_CATEGORY ? "active" : ""
                }`}
              >
                Fit
              </div>
              <div
                onClick={() => {
                  setSelectedTopCategory(DIET_TOP_CATEGORY);
                }}
                className={`category_button_level_2 ${
                  selectedTopCategory == DIET_TOP_CATEGORY ? "active" : ""
                }`}
              >
                Diet
              </div>
              <div
                onClick={() => {
                  setSelectedTopCategory(MENTAL_TOP_CATEGORY);
                }}
                className={`category_button_level_2 ${
                  selectedTopCategory == MENTAL_TOP_CATEGORY ? "active" : ""
                }`}
              >
                Mind
              </div>
            </div>
          </GroupTopBar>
        )}

        {selectedTopic == ExpertsTopic.EXPERTS && (
          <ProductsRow>
            {coachesParsedFeed.map((data, index) => {
              return (
                <ProductsColDivided key={index}>
                  <div
                    style={{ padding: "5px" }}
                    onClick={() => {
                      router.push("/coach/" + data.slug);
                    }}
                  >
                    <TwoTileCardBackground
                      image={data.profilePhoto}
                    ></TwoTileCardBackground>
                    <div
                      style={{
                        height: "100%",
                        backgroundColor: "#fff",
                        display: "flex",
                        padding: "8px",
                        flexDirection: "column",
                      }}
                    >
                      <ExpertUnitWrapper>
                        <div className="topbar">
                          <div className="user_name">
                            <p className="name">{data.firstName}</p>
                            <img
                              style={{
                                height: "12px",
                                width: "12px",
                                marginLeft: "5px",
                              }}
                              src={verifiedIcon}
                            ></img>
                          </div>
                          {data.categories.length > 0 && (
                            <p className="role">{data.categories[0]}</p>
                          )}
                        </div>
                        <p className="byline">{data.byline}</p>
                        {}
                        {data.offer != undefined && (
                          <div>
                            <p className="offer">{data.offer}</p>
                            <p className="know_more">{"Know More"}</p>
                          </div>
                        )}

                        {data.offer == undefined && (
                          <p className="know_more">{"Know More"}</p>
                        )}
                      </ExpertUnitWrapper>
                    </div>
                  </div>
                </ProductsColDivided>
              );
            })}
          </ProductsRow>
        )}

        {selectedTopic == ExpertsTopic.EVENTS && (
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
        )}
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
