import React, { useContext, useEffect } from "react";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import { openModal, closeModal } from "@redq/reuse-modal";
import { GoogleLogin } from "react-google-login";
import SignInSuccessModal from "./SignInSuccessModal";

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
      ) {
        systemId
        expert
      }
    }
  `;

  const [addOrUpdateUser] = useMutation(ADD_OR_UPDATE_USER, {
    onError(err) {
      console.log(err);
    },
    onCompleted(docs) {
      if (docs.addOrUpdateUser.systemId) {
        localStorage.setItem("user_system_id", docs.addOrUpdateUser.systemId);
        localStorage.setItem("user_is_expert", docs.addOrUpdateUser.expert);
      } else {
        console.log("Not able to fetch the user system details");
      }
    },
  });

  const loginCallback = (details) => {
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
          image_url: profileDetails.imageUrl,
        },
      });

      authDispatch({ type: "SIGNIN_SUCCESS" });
      closeModal();

      openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: SignInSuccessModal,
        closeComponent: "",
        config: {
          enableResizing: false,
          disableDragging: true,
          className: "quick-view-modal",
          width: 458,
          height: "auto",
        },
      });
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
            id="loginBtnText"
            defaultMessage="SignIn with Urban Nuskha"
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
