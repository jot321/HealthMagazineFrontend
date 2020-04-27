import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "containers/SignInOutForm/Form";
import { useQuery } from "@apollo/react-hooks";

const loveIcon = require("../../image/icons/love.png");
const shareIcon = require("../../image/icons/share.png");
const bookmarkIcon = require("../../image/icons/bookmark.png");
const bookmarkActivatedIcon = require("../../image/icons/bookmark_activated.png");

// CSS styling for the buttons

const Container = styled.div`
  font-family: "'IBM Plex Sans'";

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
    border-left: 4px solid #ea9085;
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
    margin-top: -20px;
    overflow: hidden;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-bottom: 1rem;
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
    display: flex;
    flex-direction: row-reverse;
  }

  .item__wrapper {
    width: 70px;
    display: flex;
    flex-direction: column;
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
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${loveIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const LoveButtonActivated = styled.div`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${loveIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const LoveButtonNumber = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.8em;
  font-weight: 400;
  color: #fe4540;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

const ShareButton = styled.a`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${shareIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const ShareButtonNumber = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.8em;
  font-weight: 400;
  color: #74b980;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

const BookmarkButton = styled.div`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${bookmarkIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const BookmarkButtonActivated = styled.div`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 50px;
  height: 50px;
  background: url(${bookmarkActivatedIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const BookmarkButtonNumber = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.8em;
  font-weight: 400;
  color: #9aceff;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

const BookmarkButtonNumberActivated = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 0.8em;
  font-weight: 400;
  color: #75daad;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

// Actions logic for the buttons

const CHECK_IF_POST_BOOKMARKED = gql`
  query($userId: ID!, $CMS_ID: String!) {
    checkIfPostBookmarkedByUser(userId: $userId, CMS_ID: $CMS_ID)
  }
`;

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

const INCREMENT_SHARES = gql`
  mutation incrementShares($CMS_ID: ID!) {
    incrementShares(id: $CMS_ID)
  }
`;

const BOOKMARK_POST = gql`
  mutation bookmarkPost($userId: String!, $CMS_ID: String!) {
    bookmarkPost(userId: $userId, CMS_ID: $CMS_ID)
  }
`;

const UNBOOKMARK_POST = gql`
  mutation unBookmarkPost($userId: String!, $CMS_ID: String!) {
    unBookmarkPost(userId: $userId, CMS_ID: $CMS_ID)
  }
`;

const INCREMENT_BOOKMARKS = gql`
  mutation incrementBookmarks($CMS_ID: ID!) {
    incrementBookmarks(id: $CMS_ID)
  }
`;

const DECREMENT_BOOKMARKS = gql`
  mutation decrementBookmarks($CMS_ID: ID!) {
    decrementBookmarks(id: $CMS_ID)
  }
`;

export const SocialPanel = ({
  CMS_ID,
  likesFromParent,
  sharesFromParent,
  bookmarkFromParent,
  webShareAPIShareText,
  shareText,
  shareUrl,
}) => {
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Loves Section

  const [loveClicked, setLoveClicked] = useState(false);
  const [love_, setLove] = useState(likesFromParent);
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

  const [userId, setUserId] = useState("");
  const [shareClicked, setShareClicked] = useState(false);
  const [shares_, setShares] = useState(sharesFromParent);
  const [incrementShares] = useMutation(INCREMENT_SHARES);

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const onShareButtonClick = () => {
    setShares(shares_ + 1);
    setShareClicked(true);
    incrementShares({ variables: { CMS_ID } });

    const combinedShareMsg = shareText + process.env.DOMAIN_NAME + shareUrl;

    if (navigator.share) {
      navigator
        .share({
          title: "Urban Nuskha",
          text: webShareAPIShareText,
          url: shareUrl,
        })
        .then(() => {
          console.log("Thanks for sharing!");
        })
        .catch(() => {
          console.log("Navigator Share available not working.");
          window.location.href =
            "https://api.whatsapp.com/send?text=" + combinedShareMsg;
        });
    } else {
      try {
        console.log("Whatsapp App share");
        window.location.href = "whatsapp://send?text=" + combinedShareMsg;
      } catch {
        window.location.href =
          "https://api.whatsapp.com/send?text=" + combinedShareMsg;
      }
    }
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Bookmark Section

  // Setting the bookmark to clicked initialy from the user profile
  // TODO: Bookmarked posts can be fetched at the start when user signs in
  let userHasBookmarkedThisPost = false;
  const { data, loading, error, fetchMore } = useQuery(
    CHECK_IF_POST_BOOKMARKED,
    {
      variables: {
        userId: userId,
        CMS_ID: CMS_ID,
      },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: "network-only",
    }
  );

  if (data && data.checkIfPostBookmarkedByUser) {
    userHasBookmarkedThisPost = data.checkIfPostBookmarkedByUser;
  }
  const [bookmarkClicked, setBookmarkClicked] = useState(
    userHasBookmarkedThisPost
  );

  useEffect(() => {
    setBookmarkClicked(userHasBookmarkedThisPost);
  }, [userHasBookmarkedThisPost]);

  const [bookmark_, setBookmark] = useState(bookmarkFromParent);

  const [bookmarkPost] = useMutation(BOOKMARK_POST);
  const [unBookmarkPost] = useMutation(UNBOOKMARK_POST);
  const [incrementBookmarks] = useMutation(INCREMENT_BOOKMARKS);
  const [decrementBookmarks] = useMutation(DECREMENT_BOOKMARKS);

  const onBookmarkButtonClick = () => {
    // Authenticate if not already logged in
    if (!isAuthenticated) {
      authDispatch({
        type: "SIGNIN_UN",
      });

      openModal({
        show: true,
        overlayClassName: "quick-view-overlay",
        closeOnClickOutside: true,
        component: AuthenticationForm,
        closeComponent: "",
        config: {
          enableResizing: false,
          disableDragging: true,
          className: "quick-view-modal",
          width: 458,
          height: "auto",
        },
      });
    } else {
      bookmarkPost({
        variables: { userId: userId, CMS_ID: CMS_ID },
      });
      incrementBookmarks({ variables: { CMS_ID } });
      setBookmark(bookmark_ + 1);
      setBookmarkClicked(true);
    }
  };

  const onBookmarkButtonActivatedClick = () => {
    unBookmarkPost({
      variables: { userId: userId, CMS_ID: CMS_ID },
    });
    decrementBookmarks({ variables: { CMS_ID } });
    setBookmark(bookmark_ - 1);
    setBookmarkClicked(false);
  };

  return (
    <Container>
      <div className="card__action">
        {/* <div class="card__author">
                <div class="card__author-content">
                <div class="card__author-content_image"></div>
                <a href="#">John Doe</a>
              </div>
                <div class="card__factchecked">
                  <div class="card__factchecked_image"></div>
                  <h4>Fact Checked</h4>
                </div>
              </div> */}

        <div className="card__metrics">
          <div className="item__wrapper">
            <ShareButton onClick={onShareButtonClick}></ShareButton>
            <ShareButtonNumber>
              <span className="number">{shares_ + " "}</span> Shares
            </ShareButtonNumber>
          </div>

          {loveClicked ? (
            <div className="item__wrapper">
              <LoveButtonActivated
                onClick={onLoveButtonClick}
              ></LoveButtonActivated>
              <LoveButtonNumber>
                <span className="number">{love_ + " "}</span> Likes
              </LoveButtonNumber>
            </div>
          ) : (
            <div className="item__wrapper">
              <LoveButton onClick={onLoveButtonClick}></LoveButton>
              <LoveButtonNumber>
                <span className="number">{love_ + " "}</span> Likes
              </LoveButtonNumber>
            </div>
          )}

          {bookmarkClicked ? (
            <div className="item__wrapper">
              <BookmarkButtonActivated
                onClick={onBookmarkButtonActivatedClick}
              ></BookmarkButtonActivated>
              <BookmarkButtonNumberActivated>
                <span className="number">{bookmark_ + " "}</span> Saves
              </BookmarkButtonNumberActivated>
            </div>
          ) : (
            <div className="item__wrapper">
              <BookmarkButton onClick={onBookmarkButtonClick}></BookmarkButton>
              <BookmarkButtonNumber>
                <span className="number">{bookmark_ + " "}</span> Saves
              </BookmarkButtonNumber>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};
