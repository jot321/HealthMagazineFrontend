import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { withApollo } from "helper/apollo";
import { useMutation } from "@apollo/react-hooks";

import { Modal, openModal } from "@redq/reuse-modal";
import { AuthContext } from "contexts/auth/auth.context";
import AuthenticationForm from "containers/SignInOutForm/Form";
import NavBarItems from "constants/storeType";
import StoreNav from "components/StoreNav/StoreNav";

import { topCategoryToGroupMapping } from "constants/groups_mapping";
import { topLevelCategorySlugNameMap } from "constants/categories";

const FormWrapper = styled.div`
  .input_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: 10px;

    h6{
      font-weight: 500;
      font-size: 01rem;
      padding: 5px;
      margin-left: 15px;

      margin-top: 10px;
    }
  }

  .anon_checkbox{
    display: flex;
    margin: auto;
    padding: 10px;
    justify-content: center;
    align-items: center;
  }

  .select_group{
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    p.category{
      padding: 5px 15px;
      border-radius: 16px;
      background-color: #e4e4e4;
      margin-right: 10px;
      margin-bottom: 10px;
    }

    p.active {
      background-color: #e43f5a;
      color: #fff;

    }
  }

  input.add_opinion_question {
    width: 90%;
    margin: auto;
    height: 100px;
    border: 2px solid #e43f5a;    
    padding: 10px;
    font-size: 1rem;

    ::placeholder {
      color: #f3d4d4;
      font-size: 0.9rem;
      padding: 10px;
    }
  }

  p.error_input {
    margin: auto;
    font-size: 12px;
    color: red;
  }

  button {
    height: 40px;
    border: 2px solid #e43f5a;
    background-color: #e43f5a;
    color: #fff;
    font-weight: 600;
    width: 48%;
    font-size: 1rem;
    padding: 3px;
    margin: auto;
    border-radius: 16px;
  }

    h1, h3, h4 {
      width: 100%;
      margin: auto;
      font-weight: 400;
      padding: 10px;
      color: #e43f5a;
      text-align: center;
    }

    h1{
      font-weight: 600;
      font-size: 1.7rem;
      white-space: break-spaces;
    }

    h2{
      font-size: 12px;
      color: #222;
      font-weight: 500;
    }

    h3{
      font-size: 15px;
      color: #222;
    }

    h4{
      font-weight: 500;
      padding: 20px;
    }
  }
`;

const ADD_QUESTION = gql`
  mutation addQuestion(
    $title: String!
    $text: String
    $topLevelCategory: String!
    $group: String!
  ) {
    addQuestion(
      title: $title
      text: $text
      topLevelCategory: $topLevelCategory
      group: $group
    )
  }
`;

const UserInputForm: NextPage<{}> = ({}) => {
  const router = useRouter();

  const topLevelCategorySlug =
    router.query.topLevelCategory !== null
      ? router.query.topLevelCategory.toString()
      : "";

  const groupSlugFromUrl =
    router.query.groupSlug !== undefined
      ? router.query.groupSlug.toString()
      : null;

  const [selectedGroup, setSelectedGroup] = useState(groupSlugFromUrl);
  const [groupNotSelectedError, setGroupNotSelectedError] = useState(null);
  const [postAnon, setPostAnon] = useState(false);

  const { handleSubmit, register, errors } = useForm();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const [addQuestion] = useMutation(ADD_QUESTION);

  const onClickSelectGroup = (groupSlug) => {
    setSelectedGroup(groupSlug);
  };

  const onSubmit = (values) => {
    if (selectedGroup == null) {
      setGroupNotSelectedError("Please select a group to post the question.");
      return;
    }

    if (postAnon === true) {
      addQuestion({
        variables: {
          title: values.question,
          text: values.extra_details,
          topLevelCategory: topLevelCategorySlugNameMap[topLevelCategorySlug],
          group: selectedGroup,
        },
      });
      router.push("/group?q=" + selectedGroup + "&contentType=8");
    } else {
      addQuestion({
        variables: {
          title: values.question,
          text: values.extra_details,
          topLevelCategory: topLevelCategorySlugNameMap[topLevelCategorySlug],
          group: selectedGroup,
        },
      });
      router.push("/group?q=" + selectedGroup + "&contentType=8");
    }
  };

  const onClickSignInUser = () => {
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

  return (
    <>
      <Head>
        <title>Urban Nuskha</title>
        <meta
          name="Description"
          content="Let the community and experts help in answering your health query."
        />
      </Head>
      <StoreNav items={NavBarItems.HomePage} />

      <Modal>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>{"Please ask your query !!!"}</h1>
            <h3>
              Ask away !!! We would get it answered from an expert. People from
              the community can also help you.
            </h3>
            <div className="input_wrapper">
              <h6>Please type your question</h6>
              <input
                name="question"
                className="add_opinion_question"
                placeholder="Please type"
                ref={register({
                  validate: (value) =>
                    value !== "" || "Question cannot be empty !!!",
                })}
              />

              <p className="error_input">
                {errors.comment && errors.comment.message}
              </p>

              <h6>Please enter any other details (Optional)</h6>
              <input
                name="extra_details"
                className="add_opinion_question"
                placeholder="Please type"
                ref={register}
              />

              <div className="select_group">
                <h4>Select a group to add question</h4>
                {topCategoryToGroupMapping[topLevelCategorySlug]
                  .slice(0, -1)
                  .map((element) => {
                    return (
                      <p
                        className={`category ${
                          selectedGroup === element.slug ? "active" : ""
                        }`}
                        onClick={() => {
                          onClickSelectGroup(element.slug);
                        }}
                      >
                        {element.name}
                      </p>
                    );
                  })}
              </div>

              <p className="error_input">{groupNotSelectedError}</p>

              <br />
              {!isAuthenticated && (
                <div style={{ display: "flex" }}>
                  <button
                    onClick={() => {
                      onClickSignInUser();
                    }}
                  >
                    Sign in
                  </button>

                  <button
                    type="submit"
                    onClick={() => {
                      setPostAnon(true);
                    }}
                  >
                    Ask as Guest
                  </button>
                </div>
              )}

              {isAuthenticated && (
                <div style={{ display: "flex " }}>
                  <button type="submit">Post</button>

                  <button
                    type="submit"
                    onClick={() => {
                      setPostAnon(true);
                    }}
                  >
                    Ask anonymously
                  </button>
                </div>
              )}
            </div>
          </form>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default withApollo(UserInputForm);
