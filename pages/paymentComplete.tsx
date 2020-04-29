import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import StoreNav from "components/StoreNav/StoreNav";
import NavBarItems from "constants/storeType";

import styled from "styled-components";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";
  a {
    text-decoration: none;
  }

  h2 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 500;
    text-align: center;

    color: #000;
    text-transform: capitalize;
  }

  h3 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 400;
    text-align: center;

    color: #000;
  }

  .wrapper {
    width: 100%;
    padding: 10px;
    padding-left: 5px;
    padding-right: 5px;
    background-color: #fff;
  }

  .card {
    padding: 10px;
    border: 3px solid #ea9085;
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }
`;

const PaymentCompletePage: NextPage<{}> = () => {
  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
        <meta name="Description" content="Payment Complete" />
      </Head>
      <StoreNav items={NavBarItems.HomePage} />

      <Container>
        <div className="wrapper">
          <div className="card">
            <h2>Payment Complete</h2>
            <h3>
              Thanks for making the purchase. We will send you the link for the
              class 30 mins before the class. You can connect to us at
              9902276965 for any queries.
            </h3>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PaymentCompletePage;
