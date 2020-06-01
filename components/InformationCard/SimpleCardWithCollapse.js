import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

import {
  createWhatsappTextMessage,
  createWhatsappLinkMessageWebAPIShare,
  createWhatsappTextMessageWebShare,
} from "./helpers";

import { SocialPanel } from "./ParentCard";

import { trackPageView } from "analytics";
import { sentenceToSlug } from "helper/slug";
import { getGroupNameFromSlug } from "constants/groups_mapping";

const Container = styled.div`
  font-family: "'IBM Plex Sans'";

  margin: 0;
  padding: 0;
  margin-bottom: -15px;

  a {
    text-decoration: none;
  }
  h2 {
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 500;

    color: #000;
    text-transform: capitalize;
  }

  h4 {
    text-transform: uppercase;
    font-weight: 400;
    border-bottom: 2px solid #e43f5a;
    display: inline-block;
    margin-bottom: 10px;
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
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08),
      0 5px 15px 0 rgba(0, 0, 0, 0.05);
    overflow: hidden;
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

  .card__content {
    position: relative;
    padding: 1rem;
  }

  a.card__readmore {
    font-weight: 700;
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
  h2 {
    font-size: 1.4rem;
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
  font-size: 1rem;
  font-weight: 400px;
`;

const ActionButton = styled.div`
  display: flex;
  justify-content: center;
  a {
    color: #e43f5a;
    display: flex;
    justify-content: left;
  }
`;

const ExpandedLongText = styled.p`
  font-family: "IBM Plex Sans";
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 15px;
  white-space: pre-line;
  color: "#222";
`;

const ExpandedListicles = styled.div`
  font-family: "IBM Plex Sans";
  margin-top: 20px;
  font-size: 1.03rem;
  margin-bottom: 15px;
  white-space: pre-line;

  h3 {
    display: inline;
    border-bottom: 2px solid #ea9085;
    font-weight: 600;
  }

  p {
    padding-top: 10px;
    color: #222;
    padding-bottom: 10px;
    font-weight: 400;
    white-space: pre-line;
  }
`;

export const SimpleCardWithCollapse = ({
  CMS_ID,
  title,
  byline = null,
  description = null,
  listicles = [],
  externalLinkData = null,
  groups,
  categories,
  visibleTags,
  imageUrl,
  isImageArticle = false,
  likes,
  shares,
  bookmarks,
  comments,
}) => {
  const targetRef = React.useRef(null);

  // Long Text Expansion
  const [longTextExpanded, setLongTextExpanded] = useState(false);

  const onClickExpand = () => {
    if (!isImageArticle) {
      if (externalLinkData != null) {
        window.open(externalLinkData.link);
      } else {
        setLongTextExpanded(!longTextExpanded);
        trackPageView("/article/" + sentenceToSlug(title));
      }
    }
  };

  const onClickContract = () => {
    setLongTextExpanded(!longTextExpanded);
    targetRef.current.scrollIntoView();
  };

  return (
    <div ref={targetRef}>
      <Container>
        <div className="wrapper">
          <div className="card">
            <div className="card__image" onClick={onClickExpand}>
              <img src={imageUrl} alt="image" />
            </div>

            <div className="card__content">
              <CardArticleArea>
                {externalLinkData != null && <h4>{externalLinkData.source}</h4>}
                <h2 onClick={onClickExpand}>{title}</h2>

                {/* ---------------------------------------------------------------- */}
                {/* CATEGORIES && TAGS */}
                <div className="card__tags">
                  {groups.length > 0 &&
                    groups.map((group, index) => {
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
                </div>

                {/* ---------------------------------------------------------------- */}
                {/* DESCRIPTION */}

                {!isImageArticle && (
                  <Description onClick={onClickExpand}>{byline}</Description>
                )}
                <br></br>

                {/* ---------------------------------------------------------------- */}
                {/* LONGTEST && LISTICLES */}
                {longTextExpanded && (
                  <ExpandedLongText>{description}</ExpandedLongText>
                )}

                {longTextExpanded && listicles.length > 0 && (
                  <ExpandedListicles>
                    {listicles.map((listicle, index) => {
                      return (
                        <div key={index}>
                          <h3>{listicle.listicleItemHeader}</h3>
                          <p>{listicle.listicleItemDescription}</p>
                        </div>
                      );
                    })}
                  </ExpandedListicles>
                )}

                {!isImageArticle && longTextExpanded && (
                  <ActionButton onClick={onClickContract}>
                    <a className="card__readmore">CLOSE</a>
                  </ActionButton>
                )}

                {!isImageArticle && !longTextExpanded && (
                  <ActionButton onClick={onClickExpand}>
                    <a className="card__readmore">READ MORE</a>
                  </ActionButton>
                )}
              </CardArticleArea>
            </div>

            <SocialPanel
              CMS_ID={CMS_ID}
              likesFromParent={likes}
              sharesFromParent={shares}
              bookmarkFromParent={bookmarks}
              commentsFromParent={comments}
              webShareAPIShareText={createWhatsappTextMessageWebShare(
                title,
                byline
              )}
              shareText={createWhatsappTextMessage(title, byline)}
              shareUrl={createWhatsappLinkMessageWebAPIShare(CMS_ID)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};
