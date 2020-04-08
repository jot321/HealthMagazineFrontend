import React, { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Avatar } from "baseui/avatar";
import { Modal, ModalHeader, ModalBody } from "baseui/modal";
import { Button } from "baseui/button";
import Container from "components/Container/Container";
// import Posts from "../containers/Posts/Posts";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { withApollo } from "helper/apollo";
import {
  PageTitle,
  InfoBar,
  UserAvatar,
  UserName,
  UserRole,
  Menu,
  MenuList,
  Strong,
  AlignItems,
  List,
  ListItem,
} from "components/PageStyles/Profile.styled";
import { Block } from "baseui/block";

const GET_PROFILE = gql`
  query getProfile($id: String!) {
    profile(id: $id) {
      id
      name
      role
      avatar
      posts {
        id
        type
        image
        video
        gallery
        comments {
          id
          role
          username
          avatar
          comment
          createdAt
        }
      }
      followers {
        id
        avatar
        name
      }
      following {
        id
        avatar
        name
      }
    }
  }
`;

const Profile: NextPage<{}> = () => {
  // const { data, loading, error, fetchMore } = useQuery(GET_PROFILE, {
  //   variables: {
  //     id: "user_1",
  //   },
  //   notifyOnNetworkStatusChange: true,
  // });

  const [active, setActive] = useState("posts");
  const [visible, setVisible] = useState(false);
  // if (!data) return null;
  // const { name, role, avatar, posts, followers, following } = data.profile;

  const user = {
    id: "user_1",
    name: "Lucinda Kerr",
    role: "Art & Social Activist",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=707b9c33066bf8808c934c8ab394dff6",
    posts: [
      {
        id: "1",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/1.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "2",
        type: "gallery",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/2.jpg",
        gallery: [
          "https://s3.amazonaws.com/redqteam.com/inst/post/2.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/11.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/6.jpg",
        ],
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            createdAt: new Date(),
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "3",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/9.jpg",
        video: `<iframe src="https://player.vimeo.com/video/359281775?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "4",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/3.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "5",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/4.jpg",
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            createdAt: new Date(),
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "6",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/5.jpg",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "7",
        type: "gallery",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/7.jpg",
        gallery: [
          "https://s3.amazonaws.com/redqteam.com/inst/post/7.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/25.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/9.jpg",
        ],
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            createdAt: new Date(),
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "8",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/8.jpg",
        video: `<iframe src="https://player.vimeo.com/video/35396305?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "9",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/9.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "10",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/10.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "11",
        type: "gallery",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/11.jpg",
        gallery: [
          "https://s3.amazonaws.com/redqteam.com/inst/post/11.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/12.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/26.jpg",
        ],
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            createdAt: new Date(),
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "12",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/12.jpg",
        video: `<iframe src="https://player.vimeo.com/video/359281775?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "13",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/13.jpg",
        video: `<iframe src="https://player.vimeo.com/video/35396305?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            createdAt: new Date(),
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            createdAt: new Date(),
          },
        ],
      },
      {
        id: "14",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/14.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            time: "133w",
          },
        ],
      },
      {
        id: "15",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/15.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            time: "133w",
          },
        ],
      },
      {
        id: "16",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/16.jpg",
        video: `<iframe src="https://player.vimeo.com/video/359281775?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            time: "133w",
          },
        ],
      },
      {
        id: "17",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/17.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            time: "133w",
          },
        ],
      },
      {
        id: "18",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/18.jpg",
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            time: "133w",
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            time: "133w",
          },
        ],
      },
      {
        id: "19",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/19.jpg",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            time: "133w",
          },
        ],
      },
      {
        id: "20",
        type: "gallery",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/20.jpg",
        gallery: [
          "https://s3.amazonaws.com/redqteam.com/inst/post/7.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/5.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/9.jpg",
        ],
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            time: "133w",
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            time: "133w",
          },
        ],
      },
      {
        id: "21",
        type: "gallery",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/21.jpg",
        gallery: [
          "https://s3.amazonaws.com/redqteam.com/inst/post/7.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/5.jpg",
          "https://s3.amazonaws.com/redqteam.com/inst/post/9.jpg",
        ],
        numberOflike: "34",
        numberOfcomment: "2",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "💪 😊 👍 🏆",
            time: "133w",
          },
          {
            id: "3",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@jenny_doe",
            comment: "wow!! 👌👌😍😍",
            time: "133w",
          },
        ],
      },
      {
        id: "22",
        type: "video",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/22.jpg",
        video: `<iframe src="https://player.vimeo.com/video/35396305?color=d4d4d4&title=0&byline=0&portrait=0&badge=0" width="640" height="360" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`,
        numberOfView: "134",
        numberOflike: "47",
        numberOfcomment: "48",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment:
              "How delightful, total eye candy🌸😻😻 Are you interested in being featured next in our gallery? Write to me for more info!!",
            time: "133w",
          },
        ],
      },
      {
        id: "23",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/23.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            time: "133w",
          },
        ],
      },
      {
        id: "24",
        type: "image",
        image: "https://s3.amazonaws.com/redqteam.com/inst/post/24.jpg",
        numberOflike: "21",
        numberOfcomment: "8",
        comments: [
          {
            id: "1",
            role: "author",
            avatar: "https://randomuser.me/api/portraits/men/99.jpg",
            username: "@lucinda_kerr",
            comment:
              'Hi 👋🏻😊<br /> These are my personal favorites of my last year\'s render challenge. And maybe that\'s also a reason to try this new instagram feature... 😜<br /> <a class="" href="#">#lekoarts</a> <a class="" href="#">#arsaurea</a> <a class="" href="#">#photoshop</a> <a class="" href="#">#cinema4d</a> <a class="" href="#">#c4d</a> <a class="" href="#">#graphicdesign</a> <a class="" href="#">#artwork</a> <a class="" href="#">#digitalart</a> <a class="" href="#">#artoftheday</a> <a class="" href="#">#abstract</a>',
            time: "133w",
          },
          {
            id: "2",
            role: "user",
            avatar: "https://randomuser.me/api/portraits/men/64.jpg",
            username: "@jon_doe",
            comment: "Hey. This is so dope",
            time: "133w",
          },
        ],
      },
    ],
    followers: [
      {
        id: "1",
        avatar:
          "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg",
        name: "Thomas Stock",
      },
      {
        id: "2",
        avatar: "https://randomuser.me/api/portraits/men/97.jpg",
        name: "Veeti Seppanen",
      },
      {
        id: "3",
        avatar: "https://randomuser.me/api/portraits/women/26.jpg",
        name: "Bonnie Riley",
      },
      {
        id: "4",
        avatar:
          "https://tinyfac.es/data/avatars/7D3FA6C0-83C8-4834-B432-6C65ED4FD4C3-500w.jpeg",
        name: "Steve T. Scaife",
      },
      {
        id: "5",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Leo Gill",
      },
      {
        id: "6",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "June Cha",
      },
      {
        id: "7",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        name: "Renee Sims",
      },
      {
        id: "8",
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        name: "Jonathan Cha",
      },
      {
        id: "9",
        avatar: "https://randomuser.me/api/portraits/men/97.jpg",
        name: "Veeti Seppanen",
      },
      {
        id: 10,
        avatar: "https://randomuser.me/api/portraits/women/26.jpg",
        name: "Bonnie Riley",
      },
      {
        id: 11,
        avatar:
          "https://tinyfac.es/data/avatars/7D3FA6C0-83C8-4834-B432-6C65ED4FD4C3-500w.jpeg",
        name: "Steve T. Scaife",
      },
      {
        id: 12,
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Leo Gill",
      },
    ],
    following: [
      {
        id: "1",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Leo Gill",
      },
      {
        id: "2",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "June Cha",
      },
      {
        id: "3",
        avatar: "https://randomuser.me/api/portraits/women/65.jpg",
        name: "Renee Sims",
      },
      {
        id: "4",
        avatar: "https://randomuser.me/api/portraits/men/43.jpg",
        name: "Jonathan Cha",
      },
      {
        id: "5",
        avatar:
          "https://tinyfac.es/data/avatars/B0298C36-9751-48EF-BE15-80FB9CD11143-500w.jpeg",
        name: "Thomas Stock",
      },
      {
        id: "6",
        avatar: "https://randomuser.me/api/portraits/men/97.jpg",
        name: "Veeti Seppanen",
      },
      {
        id: "7",
        avatar: "https://randomuser.me/api/portraits/women/26.jpg",
        name: "Bonnie Riley",
      },
      {
        id: "8",
        avatar:
          "https://tinyfac.es/data/avatars/7D3FA6C0-83C8-4834-B432-6C65ED4FD4C3-500w.jpeg",
        name: "Steve T. Scaife",
      },
    ],
  };

  const name = user.name;
  const role = user.role;
  const avatar = user.avatar;
  const posts = user.posts;
  const followers = user.followers;
  const following = user.following;

  return (
    <>
      <Head>
        <title>Profile | INST.</title>
        <meta name="Description" content="Inst profile page" />
      </Head>

      <PageTitle>
        <Container>
          <Block
            overrides={{
              Block: {
                style: {
                  "@media only screen and (max-width: 667px)": {
                    textAlign: "center",
                  },
                },
              },
            }}
          >
            <UserAvatar src={avatar} alt={name} />
          </Block>

          <InfoBar>
            <Block>
              <UserName>{name}</UserName>
              <UserRole>{role}</UserRole>
            </Block>

            <Menu className="profile-menu">
              <MenuList
                className={active === "posts" ? "active" : ""}
                onClick={() => {
                  setActive("posts");
                }}
              >
                Posts <Strong>{posts.length}</Strong>
              </MenuList>
              <MenuList
                className={active === "followers" ? "active" : ""}
                onClick={() => {
                  setActive("followers");
                  setVisible(true);
                }}
              >
                Followers <Strong>{followers.length}</Strong>
              </MenuList>
              <MenuList
                className={active === "following" ? "active" : ""}
                onClick={() => {
                  setActive("following");
                  setVisible(true);
                }}
              >
                Following <Strong>{following.length}</Strong>
              </MenuList>
            </Menu>
          </InfoBar>
        </Container>
      </PageTitle>

      <Container>
        {/* <Posts data={posts} avatar={avatar} username={name} /> */}

        <Modal
          onClose={() => {
            setVisible(false);
            setActive("posts");
          }}
          closeable
          isOpen={visible}
          animate
          size="default"
          role="dialog"
          unstable_ModalBackdropScroll={true}
          overrides={{
            Root: {
              style: () => {
                return { zIndex: 9999 };
              },
            },
          }}
        >
          {active === "followers" && (
            <>
              <ModalHeader>Followers</ModalHeader>
              <ModalBody style={{ overflow: "hidden" }}>
                {followers.length > 0 ? (
                  <List className="followers-list">
                    {followers.map((follower: any) => (
                      <ListItem key={`follower-key${follower.id}`}>
                        <AlignItems>
                          <Avatar
                            name={follower.name}
                            size="scale1400"
                            src={follower.avatar}
                          />
                          <span style={{ margin: "0 10px" }}>
                            {follower.name}
                          </span>
                        </AlignItems>
                        <Button
                          size="compact"
                          kind="secondary"
                          shape="pill"
                          onClick={() => console.log("Follow", follower.id)}
                        >
                          Follow
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  "0 Followers"
                )}
              </ModalBody>
            </>
          )}

          {active === "following" && (
            <>
              <ModalHeader>Following</ModalHeader>
              <ModalBody style={{ overflow: "hidden" }}>
                {following.length > 0 ? (
                  <List className="followers-list">
                    {following.map((follower: any) => (
                      <ListItem key={`following-key${follower.id}`}>
                        <AlignItems>
                          <Avatar
                            name={follower.name}
                            size="scale1400"
                            src={follower.avatar}
                          />
                          <span style={{ margin: "0 10px" }}>
                            {follower.name}
                          </span>
                        </AlignItems>
                        <Button
                          size="compact"
                          kind="secondary"
                          shape="pill"
                          onClick={() => console.log("Unfollow", follower.id)}
                        >
                          Unfollow
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  "0 Following"
                )}
              </ModalBody>
            </>
          )}
        </Modal>
      </Container>
    </>
  );
};

export default withApollo(Profile);
