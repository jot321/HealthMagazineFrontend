import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/router";

import {
  createWhatsappTextMessage,
  createWhatsappLinkMessageWebAPIShare,
  createWhatsappCombinedMessage,
} from "./helpers";

import ReactPlayer from "react-player";

import { SocialPanel } from "./ParentCard";

const cardFont = "'IBM Plex Sans'";
const Container = styled.div`
  a {
    text-decoration: none;
  }

  h2 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.2rem;

    color: #000;
    text-transform: capitalize;
  }

  .wrapper {
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .video__wrapper {
    width: 100%;
    padding-left: 5px;
    padding-right: 5px;

    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .card {
    border-radius: 6px;
    background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0) 0%,
        rgba(0, 0, 0, 0) 70%,
        #222 100%
      ),
      url(${(props) => props.image});

    background-size: cover;
    margin-bottom: 1.6rem;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08),
      0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    font-family: ${cardFont};
    h2,
    p,
    a,
    h4 {
      font-family: ${cardFont};
    }
    h2 {
      line-height: 1.2;
      font-weight: 500;
      font-size: 1.1rem;

      color: #fff;
      text-transform: capitalize;
      margin-bottom: -0.5rem;
    }
  }

  .video__card {
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08),
      0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    font-family: ${cardFont};
    h2,
    p,
    a,
    h4 {
      font-family: ${cardFont};
    }
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;

    img {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }

  .card__readmore {
    color: #ea9085;
    display: flex;
    justify-content: left;
  }

  .card__content {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding: 1rem;
    min-height: 240px;
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
        text-transform: uppercase;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.75rem;
        text-transform: capitalize;
      }
    }
  }

  .card__action {
    display: none;
    margin-top: -30px;
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

const LoveButton = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/color/48/000000/filled-like.png")
    no-repeat center;
  background-size: 70% 70%;

  .love-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    font-weight: 500;
    color: #fe4540;
  }
`;

const LoveButtonActivated = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/color/48/000000/filled-like.png")
    no-repeat center;
  background-size: 70% 70%;

  .love-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    font-weight: 500;
    color: #fe4540;
  }
`;

const ShareButton = styled.a`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/officexs/100/000000/whatsapp.png")
    no-repeat center;
  background-size: 70% 70%;

  .share-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    font-weight: 500;
    color: #74b980;
  }
`;

const ShareButtonActivated = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/officexs/100/000000/whatsapp.png")
    no-repeat center;
  background-size: 70% 70%;

  .share-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    font-weight: 500;
    color: #74b980;
  }
`;

const CardArticleArea = styled.article`
  ::before {
    filter: blur(12px);
    transform: scale(2) translateY(20px);
  }

  a {
    text-decoration: none;
    transition: all 0.5s ease;
  }

  p.description {
    color: #222;
    font-size: 16px;
    font-weight: 400px;
  }
`;

const Description = styled.p`
  color: #222;
  font-size: 16px;
  font-weight: 400px;
`;

export const VideoCard = ({ title, byline, videoLinks }) => {
  return (
    <div>
      {videoLinks.map((videoLink) => {
        return (
          <Container>
            <div className="video__wrapper">
              <div className="video__card">
                <div class="card__image">
                  <ReactPlayer
                    url={videoLink}
                    width="100%"
                    controls={true}
                    playsinline={true}
                    pip={true}
                    config={{
                      youtube: {
                        playerVars: { showinfo: 0 },
                      },
                    }}
                  />
                </div>
              </div>
            </div>
          </Container>
        );
      })}
    </div>
  );
};

export const VideoPlaylistCard = ({
  CMS_ID,
  title,
  byline,
  image,
  likes,
  shares,
}) => {
  const router = useRouter();
  const targetRef = React.useRef(null);
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Loves Section
  const [loveClicked, setLoveClicked] = useState(false);
  const [love_, setLove] = useState(likes);
  const INCREMENT_LIKES = gql`
    mutation incrementLikes($CMS_ID: ID!) {
      incrementLikes(id: $CMS_ID)
    }
  `;
  const DECREMENT_LIKES = gql`
    mutation decrementLikes($CMS_ID: ID!) {
      decrementLikes(id: $CMS_ID)
    }
  `;
  const [incrementLikes] = useMutation(INCREMENT_LIKES);
  const [decrementLikes] = useMutation(DECREMENT_LIKES);

  const onLoveButtonClick = () => {
    setLove(love_ + 1);
    setLoveClicked(true);
    incrementLikes({ variables: { CMS_ID } });
  };

  const onLoveButtonActivatedClick = () => {
    setLoveClicked(false);
    decrementLikes({ variables: { CMS_ID } });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Shares Section
  const [shareClicked, setShareClicked] = useState(false);
  const [shares_, setShares] = useState(shares);
  const INCREMENT_SHARES = gql`
    mutation incrementShares($CMS_ID: ID!) {
      incrementShares(id: $CMS_ID)
    }
  `;
  const DECREMENT_SHARES = gql`
    mutation decrementShares($CMS_ID: ID!) {
      decrementShares(id: $CMS_ID)
    }
  `;
  const [incrementShares] = useMutation(INCREMENT_SHARES);
  const [decrementShares] = useMutation(DECREMENT_SHARES);

  const onShareButtonClick = () => {
    setShares(shares_ + 1);
    setShareClicked(true);
    incrementShares({ variables: { CMS_ID } });

    if (navigator.share) {
      navigator
        .share({
          title: "Urban Nuskha",
          text: createWhatsappTextMessage(title, byline),
          url: createWhatsappLinkMessageWebAPIShare(CMS_ID),
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(() => {
          console.log("Navigator Share available not working.");
          window.location.href =
            "https://api.whatsapp.com/send?text=" +
            createWhatsappCombinedMessage(title, byline, CMS_ID);
        });
    } else {
      try {
        console.log("Whatsapp App share");
        window.location.href =
          "whatsapp://send?text=" +
          createWhatsappCombinedMessage(title, byline, CMS_ID);
      } catch {
        window.location.href =
          "https://api.whatsapp.com/send?text=" +
          createWhatsappCombinedMessage(title, byline, CMS_ID);
      }
    }
  };

  const viewVideosClick = () => {
    window.location.href = "?vpid=" + CMS_ID;
  };

  return (
    <div ref={targetRef}>
      <Container image={image}>
        <div className="wrapper">
          <div className="card" onClick={viewVideosClick}>
            <div class="card__content">
              <CardArticleArea>
                <h2>{title}</h2>
              </CardArticleArea>
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* ACTION BUTTONS */}
            <div class="card__action">
              <div class="card__metrics">
                {/* Shares Section */}
                <ShareButton
                  className="heart-icon"
                  onClick={onShareButtonClick}
                >
                  {<div class="share-number">{shares_}</div>}
                </ShareButton>

                {/* Loves Section */}
                {loveClicked ? (
                  <LoveButtonActivated
                    className="heart-icon"
                    onClick={onLoveButtonClick}
                  >
                    {<div class="love-number">{love_}</div>}
                  </LoveButtonActivated>
                ) : (
                  <LoveButton
                    className="heart-icon"
                    onClick={onLoveButtonClick}
                  >
                    {<div class="love-number">{love_}</div>}
                  </LoveButton>
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
