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

import { topCategoryToGroupMapping } from "constants/groups_mapping";
import { topLevelCategorySlugNameMap } from "constants/categories";

const FormWrapper = styled.div`
  .input_wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
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
    width: 50%;
    font-size: 1rem;
    padding: 3px;
    margin: auto;
  }

    h1, h3, h4 {
      width: 100%;
      margin: auto;
      font-weight: 400;
      padding: 10px;
      color: #e43f5a;
      text-align: center;
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
  mutation addQuestion($title: String!, $topLevelCategory: String!) {
    addQuestion(title: $title, topLevelCategory: $topLevelCategory)
  }
`;

const ExampleHookForm: NextPage<{}> = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupNotSelectedError, setGroupNotSelectedError] = useState(null);
  const { handleSubmit, register, errors } = useForm();
  const {
    authState: { isAuthenticated },
    authDispatch,
  } = useContext<any>(AuthContext);

  const [addQuestion] = useMutation(ADD_QUESTION);
  const topLevelCategorySlug =
    useRouter().query.topLevelCategory !== null
      ? useRouter().query.topLevelCategory.toString()
      : "";

  const onClickSelectGroup = (groupSlug) => {
    setSelectedGroup(groupSlug);
  };

  const onSubmit = (values) => {
    if (selectedGroup == null) {
      setGroupNotSelectedError("Please select a group to post the question.");
      return;
    }

    if (values.anonymous === true) {
      addQuestion({
        variables: {
          title: values.question,
          topLevelCategory: topLevelCategorySlugNameMap[topLevelCategorySlug],
        },
      });
    } else if (isAuthenticated === true) {
      addQuestion({
        variables: {
          title: values.question,
          topLevelCategory: topLevelCategorySlugNameMap[topLevelCategorySlug],
        },
      });
    } else {
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
    }
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

      <Modal>
        <FormWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Ask a question!</h1>
            <h3>
              You can ask a question any question on your mind. We would get it
              answered from an expert. People from the community can also chip
              in and answer your question.
            </h3>
            <div className="input_wrapper">
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

              <div className="select_group">
                <h4>Select a group to add question:</h4>
                {topCategoryToGroupMapping[topLevelCategorySlug].map(
                  (element) => {
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
                  }
                )}
              </div>

              <p className="error_input">{groupNotSelectedError}</p>

              <div className="anon_checkbox">
                <input name="anonymous" type="checkbox" ref={register} />
                <h2>Post anonymously</h2>
              </div>

              <br />
              <button type="submit">POST</button>
            </div>
          </form>
        </FormWrapper>
      </Modal>
    </>
  );
};

export default withApollo(ExampleHookForm);
