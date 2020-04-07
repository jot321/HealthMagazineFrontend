import React, { useContext } from "react";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import { closeModal } from "@redq/reuse-modal";
import { GoogleLogin } from "react-google-login";

import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

export default function SignInModal() {
  const { authDispatch } = useContext<any>(AuthContext);

  const ADD_OR_UPDATE_USER = gql`
    mutation addOrUpdateUser(
      $user_id: ID!
      $name: String!
      $email: String!
      $image_url: String!
    ) {
      addOrUpdateUser(
        userInput: {
          user_id: $user_id
          name: $name
          email: $email
          image_url: $image_url
        }
      )
    }
  `;
  const [addOrUpdateUser] = useMutation(ADD_OR_UPDATE_USER);

  const loginCallback = details => {
    if (typeof window !== "undefined") {
      const profileDetails = details.profileObj;

      localStorage.setItem("user_name", profileDetails.name);
      localStorage.setItem("user_email", profileDetails.email);
      localStorage.setItem("user_imageUrl", profileDetails.imageUrl);
      localStorage.setItem("user_id", profileDetails.googleId);

      addOrUpdateUser({
        variables: {
          user_id: profileDetails.googleId,
          name: profileDetails.name,
          email: profileDetails.email,
          image_url: profileDetails.imageUrl
        }
      });

      authDispatch({ type: "SIGNIN_SUCCESS" });
      closeModal();
    }
  };

  const loginFailureCallback = () => {
    console.log("User login failed");
  };

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage
            id="signUpBtnText"
            defaultMessage="Signup with Urban Nuskha"
          />
        </Heading>
        <SubHeading>
          <FormattedMessage id="signUpText" defaultMessage="Hey" />
        </SubHeading>
        <GoogleLogin
          clientId={process.env.GOOGLE_APP_ID}
          buttonText="Sign In with Google"
          onSuccess={loginCallback}
          onFailure={loginFailureCallback}
          cookiePolicy={"single_host_origin"}
        >
          Sign in with Google
        </GoogleLogin>
      </Container>
    </Wrapper>
  );
}
