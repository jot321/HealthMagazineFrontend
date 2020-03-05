import React, { useState } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";

const Container = styled.div`
  a {
    text-decoration: none;
  }
  h2 {
    line-height: 1.2;
    margin-bottom: 1rem;

    color: #000;
    text-transform: uppercase;
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

    h2,
    p,
    a,
    h4 {
      font-family: Quicksand;
      font-weight: 600;
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
    padding: 1.6rem;
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

  .card__category {
    display: inline-block;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ffcb00;

    a {
      color: #15131d;
      text-transform: uppercase;
      padding: 0 5px;
      font-size: 0.85rem;
      letter-spacing: 1px;
    }
  }

  .card__tags {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;

    .card__meta {
      display: inline-block;
      float: left;
      margin-right: 10px;
      border-bottom: 2px solid #e23e21;

      a {
        color: #15131d;
        text-transform: uppercase;
        padding: 0 5px;
        letter-spacing: 1px;
        font-size: 0.8rem;
      }
    }
  }

  .card__meta time {
    font-size: 1.5rem;
    color: #bbb;
    margin-left: 0.8rem;
  }

  .card__action {
    overflow: hidden;
    padding-right: 1.6rem;
    padding-left: 1.6rem;
    padding-bottom: 1.6rem;
  }

  .card__author {
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
      background: url("https://img.icons8.com/cotton/100/000000/pen.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    a {
      padding: 8px;
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

  .card__readmore {
    color: cadetblue;
  }

  .card__factchecked {
    color: black;
    display: flex;

    .card__factchecked_image {
      width: 30px;
      height: 30px;
      background: url("https://img.icons8.com/plasticine/100/000000/double-tick.png")
        no-repeat center;
      background-size: 100% 100%;
    }

    h4 {
      padding: 8px;
    }
  }
`;

const LoveButton = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/wired/100/000000/like.png") no-repeat
    center;
  background-size: 70% 70%;

  .love-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    color: #505050;
  }
`;

const LoveButtonActivated = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/dusk/100/000000/like.png") no-repeat
    center;
  background-size: 70% 70%;

  //   -webkit-transform: scale(1.2);
  //   -moz-transform: scale(1.2);
  //   -ms-transform: scale(1.2);
  //   -o-transform: scale(1.2);
  //   transform: scale(1.2);

  .love-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    color: #505050;
  }
`;

const ShareButton = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/dusk/100/000000/whatsapp.png")
    no-repeat center;
  background-size: 70% 70%;

  .share-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    color: #505050;
  }
`;

const ShareButtonActivated = styled.div`
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url("https://img.icons8.com/dusk/100/000000/whatsapp.png")
    no-repeat center;
  background-size: 70% 70%;

  //   -webkit-transform: scale(1.2);
  //   -moz-transform: scale(1.2);
  //   -ms-transform: scale(1.2);
  //   -o-transform: scale(1.2);
  //   transform: scale(1.2);

  .share-number {
    display: flex;
    justify-content: center;
    position: absolute;
    width: 50px;
    margin-top: 48px;
    font-size: 0.8em;
    color: #505050;
  }
`;

const CardArticleArea = styled.article`
  a {
    text-decoration: none;
    transition: all 0.5s ease;
  }

  p.description {
    color: #777;
  }
`;

const ExpandedLongText = styled.p``;

export const SimpleCardWithCollapse = ({
  CMS_ID,
  title,
  byline,
  description,
  category,
  tags,
  imageUrl,
  likes,
  shares
}) => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Loves Section
  const [loveClicked, setLoveClicked] = useState(false);
  const INCREMENT_LIKES = gql`
    mutation incrementLikes($CMS_ID: ID!) {
      incrementLikesForShortArticles(id: $CMS_ID) {
        _id
        likes
      }
    }
  `;
  const [incrementLikes] = useMutation(INCREMENT_LIKES);

  const onLoveButtonClick = () => {
    setLoveClicked(true);
    incrementLikes({ variables: { CMS_ID } });
  };

  const onLoveButtonActivatedClick = () => {
    setLoveClicked(false);
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Shares Section
  const [shareClicked, setShareClicked] = useState(false);
  const INCREMENT_SHARES = gql`
    mutation incrementShares($CMS_ID: ID!) {
      incrementSharesForShortArticles(id: $CMS_ID) {
        _id
        likes
      }
    }
  `;
  const [incrementShares] = useMutation(INCREMENT_SHARES);

  const onShareButtonClick = () => {
    setShareClicked(true);
    incrementShares({ variables: { CMS_ID } });
  };

  const onShareButtonActivatedClick = () => {
    setShareClicked(false);
  };

  // Long Text Expansion
  const [longTextExpanded, setLongTextExpanded] = useState(false);

  const onClickExpand = () => {
    setLongTextExpanded(!longTextExpanded);
  };

  return (
    <Container>
      <div className="wrapper">
        <div className="card">
          <div class="card__image">
            <img src={imageUrl} alt="image" />
          </div>

          <div class="card__content">
            <CardArticleArea onClick={onClickExpand}>
              <div class="card__category">
                <a>{category}</a>
              </div>

              <h2>{title}</h2>

              {tags.length > 0 && (
                <div class="card__tags">
                  {tags.map(tag => {
                    return (
                      <div class="card__meta">
                        <a href="#">{tag}</a>
                      </div>
                    );
                  })}
                </div>
              )}

              <p class="description">{byline}</p>
              <br></br>

              {longTextExpanded && (
                <ExpandedLongText>{description}</ExpandedLongText>
              )}

              {!longTextExpanded && (
                <p>
                  <a class="card__readmore">READ MORE</a>
                </p>
              )}
            </CardArticleArea>
          </div>

          <div class="card__action">
            <div class="card__author">
              <div class="card__author-content">
                <div class="card__author-content_image"></div>
                <a href="#">John Doe</a>
              </div>
              <div class="card__factchecked">
                <div class="card__factchecked_image"></div>
                <h4>Fact Checked</h4>
              </div>
            </div>

            <div class="card__metrics">
              {/* Shares Section */}
              {shareClicked ? (
                <ShareButtonActivated
                  className="share-icon"
                  onClick={onShareButtonActivatedClick}
                >
                  {<div class="share-number">{shares + 1}</div>}
                </ShareButtonActivated>
              ) : (
                <ShareButton
                  className="heart-icon"
                  onClick={onShareButtonClick}
                >
                  {<div class="share-number">{shares}</div>}
                </ShareButton>
              )}

              {/* Loves Section */}
              {loveClicked ? (
                <LoveButtonActivated
                  className="heart-icon"
                  onClick={onLoveButtonActivatedClick}
                >
                  {<div class="love-number">{likes + 1}</div>}
                </LoveButtonActivated>
              ) : (
                <LoveButton className="heart-icon" onClick={onLoveButtonClick}>
                  {<div class="love-number">{likes}</div>}
                </LoveButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
