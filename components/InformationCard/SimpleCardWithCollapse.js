import React, { useState } from "react";
import styled from "styled-components";

import {
  createWhatsappTextMessage,
  createWhatsappLinkMessageWebAPIShare,
  createWhatsappTextMessageWebShare,
} from "./helpers";

import { SocialPanel } from "./ParentCard";

const cardFont = "'IBM Plex Sans'";
const veryLightGray = "#222";

const Container = styled.div`
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

  .card__content {
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
      border-radius: 3px;
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

const CardArticleArea = styled.article`
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

const ActionButton = styled.div`
  a {
    color: #ea9085;
    display: flex;
    justify-content: left;
  }
`;

const ExpandedLongText = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 15px;
  white-space: pre-line;
  color: ${veryLightGray};
`;

const ExpandedListicles = styled.div`
  margin-top: 20px;
  font-size: 16px;
  margin-bottom: 15px;
  white-space: pre-line;

  h3 {
    display: inline;
    border-bottom: 2px solid #ea9085;
    font-weight: 600;
    font-family: ${cardFont};
  }

  p {
    padding-top: 10px;
    color: ${veryLightGray};
    padding-bottom: 10px;
    font-weight: 400;
    white-space: pre-line;
  }
`;

export const SimpleCardWithCollapse = ({
  CMS_ID,
  title,
  byline,
  description,
  listicles = [],
  categories,
  visibleTags,
  imageUrl,
  likes,
  shares,
  bookmarks,
}) => {
  const targetRef = React.useRef(null);

  // Long Text Expansion
  const [longTextExpanded, setLongTextExpanded] = useState(false);

  const onClickExpand = () => {
    setLongTextExpanded(!longTextExpanded);
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
            <div class="card__image" onClick={onClickExpand}>
              <img src={imageUrl} alt="image" />
            </div>

            <div class="card__content">
              <CardArticleArea>
                <h2 onClick={onClickExpand}>{title}</h2>

                {/* ---------------------------------------------------------------- */}
                {/* CATEGORIES && TAGS */}
                <div class="card__tags">
                  {categories.length > 0 &&
                    categories.map((category) => {
                      return (
                        <div class="card__meta">
                          <a
                            href={
                              "/category/" + category + "?category=" + category
                            }
                          >
                            {category}
                          </a>
                        </div>
                      );
                    })}
                  {visibleTags.length > 0 &&
                    visibleTags.map((tag) => {
                      return (
                        <div class="card__meta">
                          <a href={"/category/" + tag + "?tag=" + tag}>{tag}</a>
                        </div>
                      );
                    })}
                </div>

                {/* ---------------------------------------------------------------- */}
                {/* DESCRIPTION */}

                <Description onClick={onClickExpand}>{byline}</Description>
                <br></br>

                {/* ---------------------------------------------------------------- */}
                {/* LONGTEST && LISTICLES */}
                {longTextExpanded && (
                  <ExpandedLongText>{description}</ExpandedLongText>
                )}

                {longTextExpanded && listicles.length > 0 && (
                  <ExpandedListicles>
                    {listicles.map((listicle) => {
                      return (
                        <div>
                          <h3>{listicle.listicleItemHeader}</h3>
                          <p>{listicle.listicleItemDescription}</p>
                        </div>
                      );
                    })}
                  </ExpandedListicles>
                )}

                {longTextExpanded && (
                  <ActionButton onClick={onClickContract}>
                    <a class="card__readmore">CLOSE</a>
                  </ActionButton>
                )}

                {!longTextExpanded && (
                  <ActionButton onClick={onClickExpand}>
                    <a class="card__readmore">READ MORE</a>
                  </ActionButton>
                )}
              </CardArticleArea>
            </div>

            <SocialPanel
              CMS_ID={CMS_ID}
              likesFromParent={likes}
              sharesFromParent={shares}
              bookmarkFromParent={bookmarks}
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
