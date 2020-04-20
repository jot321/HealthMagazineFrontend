import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Avatar } from "baseui/avatar";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { Button } from "baseui/button";
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
  Menu,
  MenuList,
  Strong,
  AlignItems,
  List,
  ListItem,
} from "components/PageStyles/Profile.styled";

import {
  CoachDescription,
  CoachCourse,
  CoachCategoryTitle,
  CoachEvent,
  CoachSocialIcon,
} from "components/InformationCard/CoachCard";

import Carousel from "components/Carousel/Carousel";
import { Block } from "baseui/block";

import { FaInstagram, FaFacebook, FaDesktop } from "react-icons/fa";

const GET_BOOKMARKED_POSTS = gql`
  query($userId: ID!) {
    getBookmarkedPostsForAUser(userId: $userId) {
      message
      properties
    }
  }
`;

const PHOTOS = [
  {
    id: "1",
    imgSrc:
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/8c0908c3dc1242ca9644165262dcc039.jpg",
    alt: "Offer 1",
  },
  {
    id: "1",
    imgSrc:
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/b7a50adbf35d40978370edac92a4fff0.jpg",
    alt: "Offer 1",
  },
  {
    id: "3",
    imgSrc:
      "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/8782286e631c433f9173883319441aa8.jpg",
    alt: "Offer 3",
  },
];

const Profile: NextPage<{}> = () => {
  const targetRef = React.useRef(null);
  //   const { data, loading, error, fetchMore } = useQuery(GET_BOOKMARKED_POSTS, {
  //     variables: {
  //       userId: localStorage.getItem("user_id"),
  //     },
  //     notifyOnNetworkStatusChange: true,
  //     fetchPolicy: "network-only",
  //   });

  const [active, setActive] = useState("posts");
  const [visible, setVisible] = useState(false);

  const name = "Rajesh Jain";
  const role = "Yoga Expert";
  const avatar =
    "https://healthmagazinephotos.s3.ap-south-1.amazonaws.com/f301c1e27d51488eb54404b051e5e5e6.jpg";

  return (
    <>
      <Head>
        <title>Coach {name}</title>
        <meta name="Description" content="Coach profile" />
      </Head>

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
                  <CoachSocialIcon>
                    <FaInstagram size={28} />
                  </CoachSocialIcon>
                  <CoachSocialIcon>
                    <FaFacebook size={28} />
                  </CoachSocialIcon>
                  <CoachSocialIcon>
                    <FaDesktop size={28} />
                  </CoachSocialIcon>
                </Block>
              </InfoBar>
            </Container>
          </PageTitle>

          <Container>
            <CoachDescription text="Thousands of people in New York City have died from the new coronavirus at home, but weren’t initially included in the official tally because they didn’t get tested or died before results came back. Here are a few of their stories."></CoachDescription>

            <Carousel
              deviceType={{ mobile: true, desktop: false, tablet: false }}
              data={PHOTOS}
            />
            <br></br>

            <CoachCategoryTitle title="CLASSES" />
            <CoachCourse
              title="Oorja Pranayama"
              text="China might be secretly conducting nuclear tests with very low explosive power despite Beijing’s assertions that it is strictly adhering to an international accord banning all nuclear tests, according to a new arms-control report to be made public by the State Department."
              timing="Mon, Wed - 8PM"
            ></CoachCourse>
            <CoachCourse
              title="Introduction to Breathing techniques"
              text="China might be secretly conducting nuclear tests with very low explosive power despite Beijing’s assertions that it is strictly adhering to an international accord banning all nuclear tests"
            ></CoachCourse>

            <CoachCategoryTitle title="UPCMOMING EVENTS" />
            <CoachEvent title="Introduction to Pranayama"></CoachEvent>
          </Container>
        </MobileOnlyContainer>
      </div>
    </>
  );
};

export default withApollo(Profile);
