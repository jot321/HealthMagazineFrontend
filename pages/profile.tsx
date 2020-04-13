import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Avatar } from "baseui/avatar";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { Button } from "baseui/button";
import Container from "components/Container/Container";
import {
  ProductsRow,
  ProductsCol,
  LoaderWrapper,
  LoaderItem,
  ProductCardWrapper,
} from "containers/Information/Information.style";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import Fade from "react-reveal/Fade";
// import Posts from "../containers/Posts/Posts";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "helper/apollo";
import {
  PageTitle,
  InfoBar,
  UserAvatar,
  UserName,
  UserRole,
  Menu,
  MenuList,
  Strong,
  AlignItems,
  List,
  ListItem,
} from "components/PageStyles/Profile.styled";

import { Block } from "baseui/block";

const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4,
};

const GET_BOOKMARKED_POSTS = gql`
  query($userId: ID!) {
    getBookmarkedPostsForAUser(userId: $userId) {
      message
      properties
    }
  }
`;

const Profile: NextPage<{}> = () => {
  const targetRef = React.useRef(null);
  const { data, loading, error, fetchMore } = useQuery(GET_BOOKMARKED_POSTS, {
    variables: {
      userId: localStorage.getItem("user_id"),
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  const [active, setActive] = useState("posts");
  const [visible, setVisible] = useState(false);

  const name = localStorage.getItem("user_name");
  const role = localStorage.getItem("user_email");
  const avatar = localStorage.getItem("user_imageUrl");

  let bookmarkedPosts = [];
  if (
    !(
      !data ||
      !data.getBookmarkedPostsForAUser ||
      data.getBookmarkedPostsForAUser.length === 0
    )
  ) {
    bookmarkedPosts = data.getBookmarkedPostsForAUser;
  }

  return (
    <>
      <Head>
        <title>Profile | Urban Nuskha</title>
        <meta name="Description" content="Inst profile page" />
      </Head>

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
            <UserAvatar src={avatar} alt={name} />
          </Block>

          <InfoBar>
            <Block>
              <UserName>{name}</UserName>
              <UserRole>{role}</UserRole>
            </Block>

            <Menu className="profile-menu">
              <MenuList
                className={active === "posts" ? "active" : ""}
                onClick={() => {
                  setActive("posts");
                }}
              >
                Saved Posts <Strong>{bookmarkedPosts.length}</Strong>
              </MenuList>
              {/* <MenuList
                className={active === "followers" ? "active" : ""}
                onClick={() => {
                  setActive("followers");
                  setVisible(true);
                }}
              >
                Followers <Strong>{followers.length}</Strong>
              </MenuList>
              <MenuList
                className={active === "following" ? "active" : ""}
                onClick={() => {
                  setActive("following");
                  setVisible(true);
                }}
              >
                Following <Strong>{following.length}</Strong>
              </MenuList> */}
            </Menu>
          </InfoBar>
        </Container>
      </PageTitle>

      <Container>
        <div ref={targetRef}>
          <ProductsRow>
            {bookmarkedPosts.map((element: any, index: number) => {
              const data_ = JSON.parse(element.message);
              const properties_ = JSON.parse(element.properties);

              switch (properties_.type) {
                case InformationType.LISTICLE:
                  return (
                    <ProductsCol key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={800}
                          delay={index * 10}
                          style={{ height: "100%" }}
                        >
                          <SimpleCardWithCollapse
                            CMS_ID={data_.CMS_ID}
                            title={data_.title}
                            byline={data_.byline}
                            description={data_.description}
                            listicles={data_.listicleItems}
                            categories={data_.sub_category_names}
                            visibleTags={data_.visible_tags_names}
                            imageUrl={data_.attachedImage}
                            likes={properties_.likes}
                            shares={properties_.shares}
                            bookmarks={properties_.bookmarks}
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsCol>
                  );
                case InformationType.SHORT_ARTICLE:
                  return (
                    <ProductsCol key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={800}
                          delay={index * 10}
                          style={{ height: "100%" }}
                        >
                          <SimpleCardWithCollapse
                            CMS_ID={data_.CMS_ID}
                            title={data_.title}
                            byline={data_.byline}
                            description={data_.description}
                            categories={data_.sub_category_names}
                            visibleTags={data_.visible_tags_names}
                            imageUrl={data_.attachedImage}
                            likes={properties_.likes}
                            shares={properties_.shares}
                            bookmarks={properties_.bookmarks}
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsCol>
                  );
                case InformationType.TIP:
                  return (
                    <ProductsCol key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={800}
                          delay={index * 10}
                          style={{ height: "100%" }}
                        >
                          <TipCard
                            CMS_ID={data_.CMS_ID}
                            title={data_.title}
                            text={data_.text}
                            categories={data_.sub_category_names}
                            visibleTags={data_.visible_tags_names}
                            likes={properties_.likes}
                            shares={properties_.shares}
                            bookmarks={properties_.bookmarks}
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsCol>
                  );
              }
            })}
          </ProductsRow>
        </div>
        {/* <Posts data={posts} avatar={avatar} username={name} /> */}

        {/* <Modal
          onClose={() => {
            setVisible(false);
            setActive("posts");
          }}
          closeable
          isOpen={visible}
          animate
          size="default"
          role="dialog"
          unstable_ModalBackdropScroll={true}
          overrides={{
            Root: {
              style: () => {
                return { zIndex: 9999 };
              },
            },
          }}
        >
          {active === "followers" && (
            <>
              <ModalHeader>Followers</ModalHeader>
              <ModalBody style={{ overflow: "hidden" }}>
                {followers.length > 0 ? (
                  <List className="followers-list">
                    {followers.map((follower: any) => (
                      <ListItem key={`follower-key${follower.id}`}>
                        <AlignItems>
                          <Avatar
                            name={follower.name}
                            size="scale1400"
                            src={follower.avatar}
                          />
                          <span style={{ margin: "0 10px" }}>
                            {follower.name}
                          </span>
                        </AlignItems>
                        <Button
                          size="compact"
                          kind="secondary"
                          shape="pill"
                          onClick={() => console.log("Follow", follower.id)}
                        >
                          Follow
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  "0 Followers"
                )}
              </ModalBody>
            </>
          )}

          {active === "following" && (
            <>
              <ModalHeader>Following</ModalHeader>
              <ModalBody style={{ overflow: "hidden" }}>
                {following.length > 0 ? (
                  <List className="followers-list">
                    {following.map((follower: any) => (
                      <ListItem key={`following-key${follower.id}`}>
                        <AlignItems>
                          <Avatar
                            name={follower.name}
                            size="scale1400"
                            src={follower.avatar}
                          />
                          <span style={{ margin: "0 10px" }}>
                            {follower.name}
                          </span>
                        </AlignItems>
                        <Button
                          size="compact"
                          kind="secondary"
                          shape="pill"
                          onClick={() => console.log("Unfollow", follower.id)}
                        >
                          Unfollow
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  "0 Following"
                )}
              </ModalBody>
            </>
          )}
        </Modal> */}
      </Container>
    </>
  );
};

export default withApollo(Profile);
