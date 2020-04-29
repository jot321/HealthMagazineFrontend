import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container, MobileOnlyContainer } from "components/Container/Container";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "helper/apollo";
import {
  PageTitle,
  InfoBar,
  CoachAvatar,
  UserName,
  UserRole,
} from "components/PageStyles/Profile.styled";

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
import { Block } from "baseui/block";

import Carousel from "nuka-carousel";
import HashLoader from "react-spinners/HashLoader";
import NoResultFound from "components/NoResult/NoResult";
import { FaInstagram, FaFacebook, FaDesktop } from "react-icons/fa";
import { useRouter } from "next/router";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";

const GET_COACH_PROFILE = gql`
  query($slug: String) {
    getProfessionals(slug: $slug) {
      messages
      hasMore
    }
  }
`;

const Profile: NextPage<{}> = () => {
  const router = useRouter();
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
          <PageTitle>
            <Container>
              <Block
                overrides={{
                  Block: {
                    style: {
                      "@media only screen and (max-width: 667px)": {
                        textAlign: "center",
                      },
                    },
                  },
                }}
              >
                <CoachAvatar src={avatar} alt={name} />
              </Block>

              <InfoBar>
                <Block>
                  <UserName>{name}</UserName>
                  <UserRole>{role}</UserRole>
                </Block>
                <Block
                  overrides={{
                    Block: {
                      style: {
                        display: "flex",
                      },
                    },
                  }}
                >
                  {instagramLink != "" && (
                    <CoachSocialIcon
                      onClick={() => {
                        window.open(instagramLink);
                      }}
                    >
                      <FaInstagram size={28} />
                    </CoachSocialIcon>
                  )}
                  {facebookLink != "" && (
                    <CoachSocialIcon
                      onClick={() => {
                        window.open(facebookLink);
                      }}
                    >
                      <FaFacebook size={28} />
                    </CoachSocialIcon>
                  )}
                  {websiteLink != "" && (
                    <CoachSocialIcon
                      onClick={() => {
                        window.open(websiteLink);
                      }}
                    >
                      <FaDesktop size={28} />
                    </CoachSocialIcon>
                  )}
                </Block>
              </InfoBar>
            </Container>
          </PageTitle>

          <Container>
            <CoachDescription text={description}></CoachDescription>

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
            <br></br>

            {classes.length > 0 && <CoachCategoryTitle title="CLASSES" />}
            {classes.map((class_, index) => {
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

            {events.length > 0 && (
              <CoachCategoryTitle title="UPCMOMING EVENTS" />
            )}
            {events.map((event, index) => {
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
