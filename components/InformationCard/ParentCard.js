import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { AuthContext } from "contexts/auth/auth.context";
import { openModal } from "@redq/reuse-modal";
import AuthenticationForm from "containers/SignInOutForm/Form";
import { useQuery } from "@apollo/react-hooks";

import { trackPageView } from "analytics";

const loveIcon = require("../../image/icons/love_new.png");
const shareIcon = require("../../image/icons/share_new.png");
const bookmarkIcon = require("../../image/icons/bookmark_new.png");
const bookmarkActivatedIcon = require("../../image/icons/bookmark_activated_new.png");

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
    padding-bottom: 1rem;
    padding-top: 40px;
    padding-left: 5px;
    padding-right: 5px;
  }

  .card__author {
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    float: left;
    font-size: 0.8em;
  }

  .card__metrics {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
  }

  .item__wrapper {
    width: 25%;
    display: flex;
    flex-direction: row;
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
  width: 40px;
  height: 40px;
  background: url(${loveIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const LoveButtonActivated = styled.div`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url(${loveIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const LoveButtonNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50px;
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
  width: 40px;
  height: 40px;
  background: url(${shareIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const ShareButtonNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50px;
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
  width: 40px;
  height: 40px;
  background: url(${bookmarkIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const BookmarkButtonActivated = styled.div`
  margin: auto;
  float: right;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 40px;
  background: url(${bookmarkActivatedIcon}) no-repeat center;
  background-size: 70% 70%;
`;

const BookmarkButtonNumber = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  font-size: 0.8em;
  font-weight: 400;
  color: #4dcfe0;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

const BookmarkButtonNumberActivated = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50px;
  font-size: 0.8em;
  font-weight: 400;
  color: #75daad;

  .number {
    font-weight: 700;
    white-space: break-spaces;
  }
`;

const CommentWrapper = styled.div`
  p.question_opinion {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
    padding-top: 5px;
  }

  span.question_option_button {
    padding: 2px;
    background-color: #eeeeee;
    color: #e43f5a;
    border-radius: 7px;
    padding: 3px;
    padding-left: 7px;
    padding-right: 7px;
    min-width: 150px;
    display: flex;
    justify-content: center;
    font-weight: 500;
    white-space: break-spaces;

    span.number {
      font-weight: 800;
      font-size: 0.9rem;
      display: contents;
    }
  }

  span.question_option_button_activated {
    padding: 2px;
    background-color: #eeeeee;
    border: 2px solid;
    color: #e43f5a;
    border-radius: 7px;
    padding: 3px;
    padding-left: 7px;
    padding-right: 7px;
    min-width: 150px;
    display: flex;
    justify-content: center;
    font-weight: 500;
    white-space: break-spaces;

    span.number {
      font-weight: 800;
      font-size: 0.9rem;
      display: contents;
    }
  }

  form {
    margin-top: 10px;
    margin-bottom: 10px;
    box-sizing: border-box;
  }

  input.add_opinion_question {
    width: 80%;
    height: 70px;
    border: 2px solid #e43f5a;
    margin-left: 10px;
    padding: 10px;
    font-size: 1rem;

    ::placeholder {
      color: #f3d4d4;
      font-size: 0.9rem;
      padding: 10px;
    }
  }

  button {
    height: 70px;
    border: 2px solid #e43f5a;
    background-color: #e43f5a;
    color: #fff;
    font-weight: 600;
    width: 16%;
    font-size: 1rem;
    padding: 3px;
  }

  p.error_input {
    margin-left: 10px;
    font-size: 12px;
    color: red;
  }

  .signup_popup {
    display: flex;
    justify-content: space-around;
    padding-bottom: 10px;
    padding-top: 5px;

    .button {
      padding: 2px;
      background-color: #eeeeee;
      color: #e43f5a;
      border-radius: 7px;
      padding: 3px;
      padding-left: 7px;
      padding-right: 7px;
      min-width: 150px;
      display: flex;
      justify-content: center;
      font-weight: 500;
      white-space: break-spaces;
    }
  }
`;

const Comment = styled.div`
  height: 100%;
  background-color: #fef6fb;
  display: flex;
  flex-direction: column;
  justify-content: end;
  padding: 10px;
  margin-top: 2px;
  font-size: 0.9rem;

  p.user_name {
    font-weight: 500;
    padding-bottom: 5px;
    color: #000;
  }

  p.content {
    font-weight: 500;
    color: #393e46;
  }

  .comment_social {
    display: flex;
    flex-direction: row-reverse;
    padding-top: 15px;
  }

  .comment_like {
    display: flex;
    align-items: center;
    color: #fe4540;
    width: 60px;
  }

  .comment_share {
    display: flex;
    align-items: center;
    color: #74b980;
    width: 30px;
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

const ADD_COMMENT = gql`
  mutation addComment(
    $userId: String!
    $CMS_ID: String!
    $content: String!
    $writtenByExpert: Boolean
  ) {
    addExpertComment(
      userId: $userId
      CMS_ID: $CMS_ID
      content: $content
      writtenByExpert: $writtenByExpert
    )
  }
`;

const INCREMENT_COMMENT_LIKE = gql`
  mutation incrementExpertCommentLikes($CMS_ID: String!, $CommentId: String!) {
    incrementExpertCommentLikes(CMS_ID: $CMS_ID, CommentId: $CommentId)
  }
`;

const defaultCommentsData = {
  comments: [],
  expertCommentsCount: 0,
  discussionsCount: 0,
  topComments: [],
};

export const SocialPanel = ({
  CMS_ID,
  likesFromParent,
  sharesFromParent,
  bookmarkFromParent,
  commentsFromParent = defaultCommentsData,
  webShareAPIShareText,
  shareText,
  shareUrl,
}) => {
  const router = useRouter();
  const discussions = commentsFromParent.comments.filter((comment) => {
    return !comment.writtenByExpert;
  });

  const expertDiscussions = commentsFromParent.comments.filter((comment) => {
    return comment.writtenByExpert;
  });

  const [commentsShown, setCommentsShown] = useState(
    router.query.selectedCommentsSection === "discussions"
      ? discussions
      : expertDiscussions
  );

  const [selectedCommentsSection, setSelectedCommentsSection] = useState(
    router.query.selectedCommentsSection === "discussions"
      ? "discussions"
      : "experts"
  );

  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext(AuthContext);

  const showCompleteVersion =
    router.query.completeVersion === "true" ? true : false;

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
    setLove(love_ - 1);
    setLoveClicked(false);
    decrementLikes({ variables: { CMS_ID } });
  };

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Shares Section

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userSystemId, setUserSystemId] = useState("");
  const [userIsExpert, setUserIsExpert] = useState(false);

  const [shareClicked, setShareClicked] = useState(false);
  const [shares_, setShares] = useState(sharesFromParent);
  const [incrementShares] = useMutation(INCREMENT_SHARES);

  const onShareButtonClick = () => {
    console.log(shareText);
    console.log(shareUrl);
    console.log(webShareAPIShareText);

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
    trackPageView("/triedSave");
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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  // Comments Section

  const [addComment] = useMutation(ADD_COMMENT);
  const [incrementExpertCommentLikes] = useMutation(INCREMENT_COMMENT_LIKE);

  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false);
  const [commentContent, setCommentContent] = useState("");

  const { handleSubmit, register, errors } = useForm();

  const postInstantComment = (content, user) => {
    commentsShown.unshift({
      content: content,
      likes: 0,
      replies: [],
      shares: 0,
      userName: user,
    });
  };

  const onSubmit = (values) => {
    if (!isAuthenticated) {
      setCommentContent(values.comment);
      setShowSignUpPopUp(true);
    } else {
      postInstantComment(values.comment, userName);

      addComment({
        variables: {
          userId: userSystemId,
          CMS_ID: CMS_ID,
          content: values.comment,
          writtenByExpert: userIsExpert,
        },
      });

      if (userIsExpert) {
        commentsFromParent.expertCommentsCount =
          commentsFromParent.expertCommentsCount + 1;
      } else {
        commentsFromParent.discussionsCount =
          commentsFromParent.discussionsCount + 1;
      }
    }
  };

  const onClickSignUpButton = () => {
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
  };

  const onClickPostAsAGuest = () => {
    postInstantComment(commentContent, "Guest");
    setShowSignUpPopUp(false);
    addComment({
      variables: {
        userId: "GUEST",
        CMS_ID: CMS_ID,
        content: commentContent,
      },
    });

    commentsFromParent.discussionsCount =
      commentsFromParent.discussionsCount + 1;
  };

  const onClickCommentLike = (commentId) => {
    incrementExpertCommentLikes({
      variables: {
        CMS_ID: CMS_ID,
        CommentId: commentId,
      },
    });
  };

  const onClickOpenExpertComments = () => {
    if (!showCompleteVersion) {
      router.push(
        "/article?a_id=" +
          CMS_ID +
          "&completeVersion=true&selectedCommentsSection=experts"
      );
    } else {
      setSelectedCommentsSection("experts");
    }
    setCommentsShown(expertDiscussions);
  };

  const onClickOpenAskOrDiscuss = () => {
    if (!showCompleteVersion) {
      router.push(
        "/article?a_id=" +
          CMS_ID +
          "&completeVersion=true&selectedCommentsSection=discussions"
      );
    } else {
      setSelectedCommentsSection("discussions");
    }
    setCommentsShown(discussions);
  };

  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
    setUserName(localStorage.getItem("user_name"));
    setUserSystemId(localStorage.getItem("user_system_id"));
    setUserIsExpert(
      localStorage.getItem("user_is_expert") === "true" ? true : false
    );
  });

  return (
    <Container>
      <div className="card__action">
        <div className="card__metrics">
          <div className="item__wrapper">
            <ShareButton onClick={onShareButtonClick}></ShareButton>
            <ShareButtonNumber>
              <span className="number">{shares_}</span> Shares
            </ShareButtonNumber>
          </div>

          {loveClicked ? (
            <div className="item__wrapper">
              <LoveButtonActivated
                onClick={onLoveButtonActivatedClick}
              ></LoveButtonActivated>
              <LoveButtonNumber>
                <span className="number">{love_}</span> Likes
              </LoveButtonNumber>
            </div>
          ) : (
            <div className="item__wrapper">
              <LoveButton onClick={onLoveButtonClick}></LoveButton>
              <LoveButtonNumber>
                <span className="number">{love_}</span> Likes
              </LoveButtonNumber>
            </div>
          )}

          {bookmarkClicked ? (
            <div className="item__wrapper">
              <BookmarkButtonActivated
                onClick={onBookmarkButtonActivatedClick}
              ></BookmarkButtonActivated>
              <BookmarkButtonNumberActivated>
                <span className="number">{bookmark_}</span> Saves
              </BookmarkButtonNumberActivated>
            </div>
          ) : (
            <div className="item__wrapper">
              <BookmarkButton onClick={onBookmarkButtonClick}></BookmarkButton>
              <BookmarkButtonNumber>
                <span className="number">{bookmark_}</span> Saves
              </BookmarkButtonNumber>
            </div>
          )}
        </div>
      </div>

      {
        <CommentWrapper>
          <p className="question_opinion">
            <span
              className={`${
                showCompleteVersion === true &&
                selectedCommentsSection === "discussions"
                  ? "question_option_button_activated"
                  : "question_option_button"
              }`}
              onClick={onClickOpenAskOrDiscuss}
            >
              {"Ask or Discuss  "}
              <span className="number">
                {commentsFromParent.discussionsCount}
              </span>
            </span>
            <span
              className={`${
                showCompleteVersion === true &&
                selectedCommentsSection === "experts"
                  ? "question_option_button_activated"
                  : "question_option_button"
              }`}
              onClick={onClickOpenExpertComments}
            >
              {"Expert Opinions  "}
              <span className="number">
                {commentsFromParent.expertCommentsCount}
              </span>
            </span>
          </p>

          {showCompleteVersion && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                name="comment"
                className="add_opinion_question"
                placeholder="Ask a question or start a discussion!!!"
                ref={register({
                  validate: (value) =>
                    value !== "" || "Please enter a comment!!!",
                })}
              />

              <button type="submit">POST</button>
              <p className="error_input">
                {errors.comment && errors.comment.message}
              </p>
            </form>
          )}

          {showSignUpPopUp && (
            <div className="signup_popup">
              <div className="button" onClick={onClickSignUpButton}>
                Sign In
              </div>
              <div
                className="button"
                onClick={() => {
                  onClickPostAsAGuest();
                }}
              >
                Post as a guest
              </div>
            </div>
          )}

          {showCompleteVersion &&
            commentsShown.map((comment) => {
              return (
                <Comment>
                  <p className="user_name">{comment.userName}</p>
                  <p className="content">{comment.content}</p>

                  <div className="comment_social">
                    <div className="comment_share">
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                        src={shareIcon}
                      ></img>
                    </div>
                    <div className="comment_like">
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                        src={loveIcon}
                        onClick={() => {
                          onClickCommentLike(comment._id);
                          comment.likes = comment.likes + 1;
                        }}
                      ></img>
                      {comment.likes}
                    </div>
                  </div>
                </Comment>
              );
            })}

          {!showCompleteVersion &&
            commentsFromParent.topComments.map((comment) => {
              return (
                <Comment>
                  <p className="user_name">{comment.userName}</p>
                  <p className="content">{comment.content}</p>
                  <div className="comment_social">
                    <div className="comment_share">
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                        src={shareIcon}
                      ></img>
                    </div>
                    <div className="comment_like">
                      <img
                        style={{
                          width: "20px",
                          height: "20px",
                          marginRight: "10px",
                        }}
                        src={loveIcon}
                        onClick={() => {
                          onClickCommentLike(comment._id);
                          comment.likes = comment.likes + 1;
                        }}
                      ></img>
                      {comment.likes}
                    </div>
                  </div>
                </Comment>
              );
            })}
        </CommentWrapper>
      }
    </Container>
  );
};
