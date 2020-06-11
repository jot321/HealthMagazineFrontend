import React from "react";
import styled from "styled-components";
import { MdWatchLater } from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
// import { CoachAvatarSmall } from "components/PageStyles/ProfileComponents.styled";

import { trackPageView } from "analytics";
import { sentenceToSlug } from "helper/slug";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";
  a {
    text-decoration: none;
  }

  .wrapper {
    width: 100%;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .card {
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
    padding: 1rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 400;
      font-size: 1rem;
    }

    h4 {
      font-weight: 400;
      font-size: 1rem;
      display: flex;
      margin-left: 5px;
    }

    h5 {
      font-weight: 400;
      font-size: 1rem;
      display: flex;
      margin-left: 5px;
    }
  }

  .card_with_border {
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    position: relative;
    padding: 1rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
      margin-bottom: 1rem;
    }

    h3 {
      font-weight: 400;
      font-size: 1rem;
    }

    h4 {
      padding-left: 0.5rem;
      margin-top: 1rem;
      font-weight: 400;
      font-size: 1rem;
      border-left: 2px solid #ea9085;
    }
  }

  .categorytitle {
    border-left: 6px solid #ea9085;
    margin-bottom: 1rem;
    border-radius: 2px;
    overflow: hidden;
    position: relative;
    padding: 0.7rem;

    h2 {
      font-weight: 500;
      font-size: 1.3rem;
    }
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    margin-bottom: 1rem;

    img {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }

  .card__title {
    position: relative;
    padding: 1rem;
  }

  .long-summary {
    color: #aaa;
    display: none;
  }

  .card:hover {
    .long-summary {
      display: inline-block;
      transition: 0.4s all ease;
    }
  }

  .card__tags {
    display: inline-block;
    width: 100%;
    margin-bottom: 1rem;

    .card__meta {
      border-radius: 6px;
      display: inline-block;
      float: left;
      margin-right: 10px;
      background-color: #f4dada;

      padding: 1px;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: x-small;
      font-weight: 500;
      line-height: 1.5;

      a {
        color: #15131d;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.9rem;
        text-transform: capitalize;
      }
    }
  }

  .card__action {
    margin-top: -50px;
    overflow: hidden;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-bottom: 1.3rem;
    padding-top: 1rem;
  }

  .card__author {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    float: left;
    font-size: 0.8em;
  }

  .card__metrics {
    float: right;
  }

  .card__author img,
  .card__author-content {
    display: flex;

    .card__author-content_image {
      width: 30px;
      height: 30px;
      background: url("https://img.icons8.com/color/100/000000/pen.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    a {
      padding: 8px;
      color: black;
    }
  }

  .card__author img {
    border-radius: 50%;
    margin-right: 0.6em;
  }

  .card__share {
    float: right;
    position: relative;
    padding-left: 1em;
  }

  .card__factchecked {
    color: black;
    display: flex;

    .card__factchecked_image {
      width: 30px;
      height: 30px;
      background: url("https://img.icons8.com/color/100/000000/warranty.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    h4 {
      padding: 8px;
      font-weight: 400;
    }
  }
`;

const Button = styled.div`
  height: 40px;
  width: 110px;
  background-color: #ea9085;
  color: #fff;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  float: right;
  border-radius: 4px;
`;

const PaymentSection = styled.div`
  display: flex;
  justify-content: space-between;

  h7 {
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    margin-left: 5px;
  }
`;

const AvatarSection = styled.div`
  display: flex;
  padding: 1px;

  h6 {
    display: flex;
    align-items: center;
    margin-top: 0;
    font-weight: 500;
    font-size: 1rem;
    margin-left: 10px;
    border-bottom: 2px solid #ea9085;
  }
`;

const ItemWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const CoachCover = styled.div`
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
`;

export const CoachSocialIcon = styled.div`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 10px;
`;

export const CoachDescription = ({ text }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card_with_border">
            <h3>{text}</h3>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachCourse = ({
  title,
  text,
  price,
  paymentLink,
  timing = null,
}) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card">
            <h2>{title}</h2>
            <h3>{text}</h3>
            <br></br>
            {timing && (
              <ItemWrapper>
                <MdWatchLater size={20} />
                <h4>{"  " + timing}</h4>
              </ItemWrapper>
            )}

            <PaymentSection>
              <ItemWrapper>
                <FaRupeeSign size={20} />
                <h5>{price + " to join"}</h5>
              </ItemWrapper>

              <Button
                onClick={() => {
                  window.open(paymentLink);
                }}
              >
                ENQUIRE
              </Button>
            </PaymentSection>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachCategoryTitle = ({ title }) => {
  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="categorytitle">
            <h2>{title}</h2>
          </div>
        </div>
      </Container>
    </div>
  );
};

export const CoachEvent = ({
  title,
  imageUrl = null,
  bookLink = null,
  price,
  timing = null,
  profile = null,
}) => {
  const localTime = new Date(timing);

  const onClickAvatar = (slug) => {
    window.location.href = "/coach/" + slug;
  };

  return (
    <div>
      <Container>
        <div className="wrapper">
          <div className="card">
            {imageUrl && (
              <div className="card__image">
                <img src={imageUrl} alt="image" />
              </div>
            )}

            <h2>{title}</h2>
            {profile && (
              <div>
                <AvatarSection
                  onClick={() => {
                    onClickAvatar(profile.slug);
                  }}
                >
                  {/* <CoachAvatarSmall
                    src={profile.photo}
                    alt={profile.name}
                  ></CoachAvatarSmall> */}
                  By<h6>{profile.name}</h6>
                </AvatarSection>
                <br></br>
              </div>
            )}

            {timing && (
              <ItemWrapper>
                <MdWatchLater size={20} />
                <h4>
                  {"  " +
                    localTime.toDateString() +
                    " " +
                    localTime.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                </h4>
              </ItemWrapper>
            )}

            <PaymentSection>
              <ItemWrapper>
                <FaRupeeSign size={20} />
                <h7>{price + " to join"}</h7>
              </ItemWrapper>

              <Button
                onClick={() => {
                  trackPageView("/getTicket/" + sentenceToSlug(title));
                  window.open(bookLink);
                }}
              >
                GET TICKET
              </Button>
            </PaymentSection>
          </div>
        </div>
      </Container>
    </div>
  );
};
