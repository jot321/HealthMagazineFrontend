import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "components/Container/Container";
import {
  ProductsRow,
  ProductsCol,
  ProductCardWrapper,
} from "containers/Information/Information.style";
import { SimpleCardWithCollapse } from "components/InformationCard/SimpleCardWithCollapse";
import { TipCard } from "components/InformationCard/TipCard";
import { VideoPlayerCard } from "components/InformationCard/VideoCard";
import Fade from "react-reveal/Fade";
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
} from "components/PageStyles/Profile.styled";

const InformationType = {
  LISTICLE: 1,
  SHORT_ARTICLE: 2,
  IMAGE_ARTICLE: 3,
  TIP: 4,
  VIDEOLINK: 6,
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
  const [userDetails, setUserDetails] = useState({
    id: null,
    name: null,
    role: null,
    avatar: null,
  });

  useEffect(() => {
    setUserDetails({
      id: localStorage.getItem("user_id"),
      name: localStorage.getItem("user_name"),
      role: localStorage.getItem("user_email"),
      avatar: localStorage.getItem("user_imageUrl"),
    });
  }, []);

  const { data, loading, error, fetchMore } = useQuery(GET_BOOKMARKED_POSTS, {
    variables: {
      userId: userDetails.id,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
  });

  const [active, setActive] = useState("posts");

  const name = userDetails.name;
  const role = userDetails.role;
  const avatar = userDetails.avatar;

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            <UserAvatar src={avatar} alt={name} />
          </div>

          <InfoBar>
            <div>
              <UserName>{name}</UserName>
              <UserRole>{role}</UserRole>
            </div>

            <Menu className="profile-menu">
              <MenuList
                className={active === "posts" ? "active" : ""}
                onClick={() => {
                  setActive("posts");
                }}
              >
                Saved Posts <Strong>{bookmarkedPosts.length}</Strong>
              </MenuList>
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
                case InformationType.VIDEOLINK:
                  return (
                    <ProductsCol key={index}>
                      <ProductCardWrapper>
                        <Fade
                          duration={800}
                          delay={index * 10}
                          style={{ height: "100%" }}
                        >
                          <VideoPlayerCard
                            url={data_.videoLink}
                            CMS_ID={data_.CMS_ID}
                            likes={properties_.likes}
                            shares={properties_.shares}
                            bookmarks={properties_.bookmarks}
                            playlistTitle={data_.playlistTitle}
                            playlistId={data_.playlistId}
                          />
                        </Fade>
                      </ProductCardWrapper>
                    </ProductsCol>
                  );
              }
            })}
          </ProductsRow>
        </div>
      </Container>
    </>
  );
};

export default withApollo(Profile);
