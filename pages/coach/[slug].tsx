import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container, MobileOnlyContainer } from "components/Container/Container";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "helper/apollo";

import {
  CoachDescription,
  CoachCourse,
  CoachCategoryTitle,
  CoachEvent,
  CoachSocialIcon,
  CoachCover,
} from "components/InformationCard/CoachCard";

import {
  LoaderWrapper,
  LoaderItem,
} from "containers/Information/Information.style";

import { GroupTopBar } from "styled/pages.style";

import Carousel from "nuka-carousel";
import HashLoader from "react-spinners/HashLoader";
import NoResultFound from "components/NoResult/NoResult";
import { FaInstagram, FaFacebook, FaDesktop } from "react-icons/fa";
import { useRouter } from "next/router";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";

import { OneTileWrapper, OneTileCardBackground } from "components/Tile/Tile";

const GET_COACH_PROFILE = gql`
  query($slug: String) {
    getProfessionals(slug: $slug) {
      messages
      hasMore
    }
  }
`;

const CoachTopic = {
  INFORMATION: 1,
  CLASSES: 2,
  EVENTS: 3,
  ANSWERS: 4,
};

const Profile: NextPage<{}> = () => {
  const router = useRouter();

  const [selectedTopic, setSelectedTopic] = useState(CoachTopic.INFORMATION);

  const { data, loading, error } = useQuery(GET_COACH_PROFILE, {
    variables: {
      slug: router.query.slug,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  if (loading) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <HashLoader size={50} color={"#ea9085"} />
        </LoaderItem>
      </LoaderWrapper>
    );
  }

  if (error) return <div>{error.message}</div>;

  if (
    !data ||
    !data.getProfessionals ||
    data.getProfessionals.messages.length === 2
  ) {
    return <NoResultFound />;
  }

  const coachProfileData = JSON.parse(data.getProfessionals.messages)[0];

  const name = coachProfileData.firstName + " " + coachProfileData.lastName;
  const role =
    coachProfileData.length == 0 ? "" : coachProfileData.categories[0];
  const avatar = coachProfileData.profilePhoto;
  const description = coachProfileData.description;
  const carouselPhotos = coachProfileData.carouselPhotos;
  const facebookLink = coachProfileData.facebookLink;
  const instagramLink = coachProfileData.instagramLink;
  const websiteLink = coachProfileData.websiteLink;
  const classes = coachProfileData.classes;
  const events = coachProfileData.events;

  return (
    <>
      <Head>
        <title>Coach {name}</title>
        <meta name="Description" content="Coach profile" />
      </Head>
      <StoreNav items={NavBarItems.HomePage} />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <MobileOnlyContainer>
          <div>
            <OneTileWrapper>
              <OneTileCardBackground image={avatar}>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="user_name">
                    <p className="name">{name}</p>
                    <p className="role">{role}</p>
                  </div>
                  <div className={"social_panel"}>
                    {instagramLink != "" && instagramLink != null && (
                      <CoachSocialIcon
                        onClick={() => {
                          window.open(instagramLink);
                        }}
                      >
                        <FaInstagram size={28} color={"#fff"} />
                      </CoachSocialIcon>
                    )}
                    {facebookLink != "" && facebookLink != null && (
                      <CoachSocialIcon
                        onClick={() => {
                          window.open(facebookLink);
                        }}
                      >
                        <FaFacebook size={28} color={"#fff"} />
                      </CoachSocialIcon>
                    )}
                    {websiteLink != "" && websiteLink != null && (
                      <CoachSocialIcon
                        onClick={() => {
                          window.open(websiteLink);
                        }}
                      >
                        <FaDesktop size={28} color={"#fff"} />
                      </CoachSocialIcon>
                    )}
                  </div>
                </div>
              </OneTileCardBackground>
            </OneTileWrapper>
          </div>

          <Container>
            <GroupTopBar>
              <div className="content_categories">
                <div
                  onClick={() => {
                    setSelectedTopic(CoachTopic.INFORMATION);
                  }}
                  className={`category_button ${
                    selectedTopic == CoachTopic.INFORMATION ? "active" : ""
                  }`}
                >
                  Info
                </div>
                <div
                  onClick={() => {
                    setSelectedTopic(CoachTopic.CLASSES);
                  }}
                  className={`category_button ${
                    selectedTopic == CoachTopic.CLASSES ? "active" : ""
                  }`}
                >
                  Classes
                </div>
                <div
                  onClick={() => {
                    setSelectedTopic(CoachTopic.EVENTS);
                  }}
                  className={`category_button ${
                    selectedTopic == CoachTopic.EVENTS ? "active" : ""
                  }`}
                >
                  Events
                </div>
                <div
                  onClick={() => {
                    setSelectedTopic(CoachTopic.ANSWERS);
                  }}
                  className={`category_button ${
                    selectedTopic == CoachTopic.ANSWERS ? "active" : ""
                  }`}
                >
                  Answers
                </div>
              </div>
            </GroupTopBar>
            {selectedTopic == CoachTopic.INFORMATION && (
              <CoachDescription text={description}></CoachDescription>
            )}

            {/* {carouselPhotos.length > 0 && (
              <Carousel
                autoplay={true}
                heightMode={"current"}
                defaultControlsConfig={{
                  nextButtonText: ">",
                  prevButtonText: "<",
                  pagingDotsStyle: {
                    fill: "#ea9085",
                  },
                }}
              >
                {carouselPhotos.map((photo) => {
                  return <img src={photo} />;
                })}
              </Carousel>
            )}
            <br></br> */}

            {selectedTopic == CoachTopic.CLASSES &&
              classes.map((class_, index) => {
                return (
                  <CoachCourse
                    key={index}
                    title={class_.title}
                    text={class_.description}
                    price={class_.price}
                    paymentLink={class_.paymentLink}
                    timing={class_.timings}
                  ></CoachCourse>
                );
              })}

            {selectedTopic == CoachTopic.EVENTS &&
              events.map((event, index) => {
                return (
                  <CoachEvent
                    key={index}
                    title={event.title}
                    imageUrl={event.eventPhoto}
                    bookLink={event.detailsLink}
                    price={event.price}
                    timing={event.time}
                  ></CoachEvent>
                );
              })}
          </Container>
        </MobileOnlyContainer>
      </div>
    </>
  );
};

export default withApollo(Profile);
