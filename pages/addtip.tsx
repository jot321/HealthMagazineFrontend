import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Row, Col } from "react-styled-flexboxgrid";
import { Block } from "baseui/block";
import { H4 } from "baseui/typography";
import { Container } from "components/Container/Container";
import HookForm from "containers/HookForm/Form";

const ExampleHookForm: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
        <meta name="Description" content="Inst react hook form" />
      </Head>

      <Container>
        <Block paddingTop={["15px", "20px", "30px", "40px"]}>
          <Row>
            <Col lg={9}>
              <H4 marginBottom="30px">Add a Tip</H4>
              <HookForm />
            </Col>
          </Row>
        </Block>
      </Container>
    </>
  );
};

export default ExampleHookForm;
