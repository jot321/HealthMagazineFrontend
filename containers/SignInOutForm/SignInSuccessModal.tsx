import React from "react";
import { Wrapper, Container, Heading, SubHeading } from "./SignInOutForm.style";
import { FormattedMessage } from "react-intl";

export default function SignInSuccessModal() {
  return (
    <Wrapper>
      <Container>
        <Heading>
          <p>Sign In Successful</p>
        </Heading>
        <SubHeading>
          <p>
            Thanks for being part of the growing health community. Enjoy latest
            articles, videos and tips from experts and the community.
          </p>
        </SubHeading>
      </Container>
    </Wrapper>
  );
}
