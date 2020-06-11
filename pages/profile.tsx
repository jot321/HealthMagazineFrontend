import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Container } from "components/Container/Container";
import { ProductsRow } from "containers/Information/Information.style";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "helper/apollo";
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

  const name = userDetails.name;
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

      <div>
        <img src={avatar}></img>
        {name}
        {"Saved Posts " + bookmarkedPosts.length}
      </div>

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
