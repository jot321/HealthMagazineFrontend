import React from "react";
import Link from "next/link";
import styled from "styled-components";

import {
  createVideosWhatsappLinkMessageWebAPIShare,
  createVideosWhatsappTextMessage,
  createVideosWhatsappTextMessageWebShare,
} from "./helpers";

import { sentenceToSlug } from "helper/slug";

import ReactPlayer from "react-player";
import { SocialPanel } from "./ParentCard";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";
  a {
    text-decoration: none;
  }

  h2 {
    border-left: 4px solid #ea9085;
    padding: 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.4rem;
    margin-left: 1rem;

    color: #000;
    text-transform: capitalize;
  }

  h3 {
    padding: 1rem;
    line-height: 1.2;
    font-weight: 400;
    font-size: 1.2rem;

    color: #000;
    text-transform: capitalize;
  }

  h4 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 500;
    font-size: 1.4rem;

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
    padding-left: 15px;
    padding-right: 15px;

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
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    h2,
    p,
    a,
    h2,
    h4 {
      line-height: 1.2;
      font-weight: 500;
      font-size: 1rem;

      color: #fff;
      text-transform: capitalize;
      margin-bottom: -0.5rem;
    }
  }

  .video__card {
    background-color: #fff;
    margin-bottom: 1.6rem;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .card__image {
    min-height: 100px;
    background-color: #eee;
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    margin-bottom: 40px;

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
    // margin-top: -30px;
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

export const VideoPageWrapper = ({ CMS_ID, title, byline, videoLinks }) => {
  return (
    <div>
      <Container>
        <h2>{title}</h2>
        {byline && <h3>{byline}</h3>}
        <br></br>
        {videoLinks.map((videoLink, index) => {
          return (
            <VideoPlayerCard
              key={index}
              url={videoLink.videoLink}
              CMS_ID={videoLink.properties.CMS_ID}
              likes={videoLink.properties.likes}
              shares={videoLink.properties.shares}
              bookmarks={videoLink.properties.bookmarks}
              playlistTitle={title}
              playlistId={CMS_ID}
            ></VideoPlayerCard>
          );
        })}
      </Container>
    </div>
  );
};

export const VideoPlayerCard = ({
  url,
  CMS_ID,
  likes,
  shares,
  bookmarks,
  playlistTitle,
  playlistId,
}) => {
  return (
    <div>
      <Container>
        <div className="video__wrapper">
          <div className="video__card">
            <div className="card__image">
              <ReactPlayer
                url={url}
                width="100%"
                controls={true}
                playsinline={true}
              />
            </div>
            <SocialPanel
              CMS_ID={CMS_ID}
              likesFromParent={likes}
              sharesFromParent={shares}
              bookmarkFromParent={bookmarks}
              webShareAPIShareText={createVideosWhatsappTextMessageWebShare(
                playlistTitle
              )}
              shareText={createVideosWhatsappTextMessage(playlistTitle)}
              shareUrl={createVideosWhatsappLinkMessageWebAPIShare(playlistId)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export const VideoPlaylistCard = ({ CMS_ID, title, image }) => {
  return (
    <div>
      <Container image={image}>
        <div className="wrapper">
          <Link
            href={"/videos?vpid=" + CMS_ID}
            as={"/videos/" + sentenceToSlug(title)}
          >
            <div className="card">
              <div className="card__content">
                <CardArticleArea>
                  <h4>{title}</h4>
                </CardArticleArea>
              </div>
            </div>
          </Link>
        </div>
      </Container>
    </div>
  );
};
