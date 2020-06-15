import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

import {
  createVideosWhatsappLinkMessageWebAPIShare,
  createVideosWhatsappTextMessage,
  createVideosWhatsappTextMessageWebShare,
} from "./helpers";

import ReactPlayer from "react-player";
import { SocialPanel } from "./ParentCard";

import { sentenceToSlug } from "helper/slug";
import { trackPageView } from "analytics";
import { getGroupNameFromSlug } from "constants/groups_mapping";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";

  margin: 0;
  padding: 0;
  margin-bottom: -15px;

  a {
    text-decoration: none;
  }

  h5 {
    padding: 20px;
    font-size: 1.1rem;
    line-height: 1.2;
    font-weight: 400;
    color: #000;
    text-transform: capitalize;
  }

  h2 {
    border-left: 4px solid #e43f5a;
    padding: 1rem;
    line-height: 1.2;
    font-weight: 500;
    font-size: 1.4rem;
    margin-left: 1rem;

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
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
    p,
    a,
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
    border-top-left-radius: 2px;
    border-top-right-radius: 2px;
    margin-bottom: 20px;

    img {
      width: 100%;
      max-width: 100%;
      display: block;
    }
  }

  .card__content {
    display: flex;
    padding: 1rem;
    font-weight: 500;
    font-size: 1.4rem;

    flex-direction: column;

    h3 {
      font-size: 1.4rem;
      line-height: 1.2;
      font-weight: 500;
      color: #000;
      text-transform: capitalize;
    }
  }

  .card__content_playlist {
    display: flex;
    flex-direction: column-reverse;
    position: relative;
    padding: 1rem;
    min-height: 240px;
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
    margin-bottom: 0.5rem;

    .card__meta {
      border-radius: 4px;
      display: inline-block;
      float: left;
      margin-right: 10px;
      background-color: #e43f5a;

      padding: 2px;
      margin-bottom: 5px;
      font-weight: 500;
      font-size: x-small;
      font-weight: 500;
      line-height: 1.5;

      a {
        color: #fff;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.9rem;
        text-transform: capitalize;
      }
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

const INCREMENT_VIEWS = gql`
  mutation incrementViews($CMS_ID: ID!) {
    incrementViews(id: $CMS_ID)
  }
`;

export const VideoPageWrapper = ({ CMS_ID, title, byline, videoLinks }) => {
  return (
    <div>
      <Container>
        <h2>{title}</h2>
        {byline && <h5>{byline}</h5>}
        <br></br>
        {videoLinks.map((videoLink, index) => {
          return (
            <VideoPlayerCard
              key={index}
              title={videoLink.title}
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
  title,
  CMS_ID,
  groups,
  likes,
  shares,
  bookmarks,
  views,
  comments,
  playlistTitle,
  playlistId,
}) => {
  const router = useRouter();
  const singleArticle = router.query.a_id != undefined ? true : false;
  const [incrementViews] = useMutation(INCREMENT_VIEWS);

  return (
    <div>
      <Container>
        <div className="video__wrapper">
          <div className="video__card">
            <div className="card__content">
              {title != null && (
                <div>
                  <h3>{title}</h3>
                </div>
              )}

              {/* <div className="card__tags">
                {groups.length > 0 &&
                  groups.slice(0, 3).map((group, index) => {
                    return (
                      <div
                        onClick={() => {
                          trackPageView("/group/" + sentenceToSlug(group));
                        }}
                        className="card__meta"
                        key={index}
                      >
                        <Link href={"/group?q=" + group}>
                          <a>{getGroupNameFromSlug(group)}</a>
                        </Link>
                      </div>
                    );
                  })}
              </div> */}
            </div>

            <div className="card__image">
              <ReactPlayer
                playing
                url={url}
                width="100%"
                controls={true}
                playsinline={true}
                light={!singleArticle}
                onStart={() => {
                  incrementViews({ variables: { CMS_ID } });
                  trackPageView("/videos/" + sentenceToSlug(title));
                }}
              />
            </div>

            <SocialPanel
              CMS_ID={CMS_ID}
              likesFromParent={likes}
              sharesFromParent={shares}
              bookmarkFromParent={bookmarks}
              commentsFromParent={comments}
              webShareAPIShareText={createVideosWhatsappTextMessageWebShare(
                title
              )}
              shareText={createVideosWhatsappTextMessage(title)}
              shareUrl={createVideosWhatsappLinkMessageWebAPIShare(CMS_ID)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export const VideoPlaylistCard = ({
  CMS_ID,
  title,
  image,
  topLevelCategorySlug,
}) => {
  const onPlaylistClick = (playlistName) => {
    trackPageView(playlistName);
  };

  return (
    <div>
      <Container image={image}>
        <div className="wrapper">
          <Link
            href={"/videos?vpid=" + CMS_ID + "&tlc=" + topLevelCategorySlug}
          >
            <div
              className="card"
              onClick={() => {
                onPlaylistClick(
                  "/videos/" +
                    topLevelCategorySlug +
                    "/" +
                    sentenceToSlug(title)
                );
              }}
            >
              <div className="card__content_playlist">
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
