import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "components/Container/Container";
import { ProductsRow } from "containers/Information/Information.style";
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

import { outputCardScafollding } from "containers/Information/contentScaffolding";

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

              return outputCardScafollding(data_, properties_, index);
            })}
          </ProductsRow>
        </div>
      </Container>
    </>
  );
};

export default withApollo(Profile);
