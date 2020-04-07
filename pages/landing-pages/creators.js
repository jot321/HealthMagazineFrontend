import React from "react";
import { withApollo } from "helper/apollo";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 70px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: #f7f7f7;
  padding-right: 0;
  transition: padding-right 0.35s ease-in-out;

  padding-left: calc(50% - 37.5rem);
  padding-right: calc(50% - 37.5rem);

  @media (max-width: 990px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const HeadingSection = styled.div`
  text-align: center;

  h2 {
    font-weight: 500;
    font-size: 60px;
    @media (max-width: 990px) {
      font-size: 40px;
    }
  }

  h4 {
    font-weight: 400;
    font-size: 25px;
    @media (max-width: 990px) {
      font-size: 20px;
    }
  }

  img {
    width: 716px;
    height: 500px;
    color: #555;
    @media (max-width: 990px) {
      width: 358px;
      height: 250px;
    }
  }
`;

const FeaturesSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  text-align: center;

  h1 {
    text-align: center;
    font-weight: 400;
    font-size: 50px;
    @media (max-width: 990px) {
      font-size: 30px;
    }
  }

  h3 {
    text-align: center;
    font-weight: 400;
    font-size: 30px;
    color: #555;
    @media (max-width: 990px) {
      font-size: 20px;
    }
  }

  h2 {
    font-weight: 400;
    font-size: 30px;
    display: inline;
    border-bottom: 2px solid #ea9085;
    @media (max-width: 990px) {
      font-size: 20px;
    }
  }

  h4 {
    font-weight: 400;
    font-size: 20px;
    color: #555;
    @media (max-width: 990px) {
      font-size: 15px;
    }
  }

  img {
    width: 716px;
    height: 500px;
    color: #555;
    @media (max-width: 990px) {
      width: 358px;
      height: 250px;
    }
  }
  .features_img_1 {
    width: 50%;
    @media (max-width: 990px) {
      width: 100%;
    }
  }
`;

const FeaturesList = styled.div`
  width: 50%;
  margin-top: 50px;
  @media (max-width: 990px) {
    width: 100%;
  }
`;

const FeaturesItem = styled.div``;

function CommunityLandingPage() {
  return (
    <Wrapper>
      <HeadingSection>
        <h2>A place to publish your best work</h2>
        <br />
        <h4>
          The internet should reward quality thinking, not clickbait. That's why
          we have created a new home for health and wellness professionals.
          Connect to curious souls, who are looking for guidance from people
          like you
        </h4>
        <br />
        <img src={require("image/writer1.svg")}></img>
      </HeadingSection>
      <HeadingSection>
        <h1>We believe ideas are worth something!</h1>
        <br />
        <h3>
          It should be easy for health and wellness professionals to share their
          knowledge, earn reputation and save people from dubious information
          floating on the internet
        </h3>
      </HeadingSection>
      <FeaturesSection>
        <FeaturesList>
          <FeaturesItem>
            <h2>Create something good on healthcare and wellness!</h2>
            <br />
            <br />
            <h4>
              Share your thinking about something that matters to you. It can be
              live, recorded, individual or gropu based or short or long,
              serious or funny - it's the quality of your perspective that
              counts.
            </h4>
            <br />
          </FeaturesItem>
          <FeaturesItem>
            <h2>Creation is time consuming! We are here to help</h2>
            <br />
            <br />
            <h4>
              If you have the ideas, we have got the team, to help you with
              creating, distributing, marketing and monetizing. Our in house
              team is on a mission to make it easier for you to engage with the
              audience and build your own digital brand
            </h4>
            <br />
          </FeaturesItem>
          <FeaturesItem>
            <h2>Your Own Digital Space</h2>
            <br />
            <br />
            <h4>
              Tell the world about the classes and about you and your practices,
              additionally, you can connect with users for One on One or group
              consultation, and create courses related to fitness, nutrition,
              other preventive measures.
            </h4>
            <br />
          </FeaturesItem>
        </FeaturesList>
        <img
          className="features_img_1"
          src={require("image/writer2.svg")}
        ></img>
      </FeaturesSection>
    </Wrapper>
  );
}

export default withApollo(CommunityLandingPage);
