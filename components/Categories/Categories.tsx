import React from "react";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { useRouter } from "next/router";

import {
  CHRONIC_PAGE,
  WEIGHT_PAGE,
  SKIN_HAIR_PAGE,
  FITNESS_PAGE,
  DIET_PAGE,
  MENTAL_PAGE,
  SEXUAL_PAGE,
  GENERAL_PAGE,
  PAIN_PAGE
} from "constants/navigation";

const ChronicIcon = require("image/categories/chronic.png");
const FitnessIcon = require("image/categories/fitness.png");
const NutritionIcon = require("image/categories/nutrition.png");
const MentalIcon = require("image/categories/mental.png");
const SexualIcon = require("image/categories/sexual.png");
const WeightIcon = require("image/categories/weight.png");
const GeneralIcon = require("image/categories/general.png");
const PainIcon = require("image/categories/pain.png");
const SkinHairIcon = require("image/categories/skinhair.png");

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-bottom: -60px;
  margin-top: 20px;
`;

const CategoryItem = styled.div`
  height: 140px;
  width: 120px;
  text-align: center;

  img {
    width: 80px;
    height: 80px;
  }
  p {
    font-family: ${themeGet("fontFamily.0", "sans-serif")};
    width: 80%;
    margin: auto;
  }
`;

type CategoryProps = {};

const CategoryNav: React.FunctionComponent<CategoryProps> = ({}) => {
  const router = useRouter();

  const onClickCategory = categoryLink => {
    router.push({
      pathname: categoryLink
    });
  };

  return (
    <CategoryWrapper>
      <CategoryItem
        onClick={() => {
          onClickCategory(CHRONIC_PAGE);
        }}
      >
        <img src={ChronicIcon} alt="pickbazar-admin" />
        <p>Chronic Conditions</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(FITNESS_PAGE);
        }}
      >
        <img src={FitnessIcon} alt="pickbazar-admin" />
        <p>Fitness & Exercise</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(DIET_PAGE);
        }}
      >
        <img src={NutritionIcon} alt="pickbazar-admin" />
        <p>Diet & Nutrition</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(MENTAL_PAGE);
        }}
      >
        <img src={MentalIcon} alt="pickbazar-admin" />
        <p>Mental Wellness</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(SEXUAL_PAGE);
        }}
      >
        <img src={SexualIcon} alt="pickbazar-admin" />
        <p>Sexual Wellness</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(WEIGHT_PAGE);
        }}
      >
        <img src={WeightIcon} alt="pickbazar-admin" />
        <p>Weight Management</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(GENERAL_PAGE);
        }}
      >
        <img src={GeneralIcon} alt="pickbazar-admin" />
        <p>General Wellness</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(PAIN_PAGE);
        }}
      >
        <img src={PainIcon} alt="pickbazar-admin" />
        <p>Pain Management</p>
      </CategoryItem>
      <CategoryItem
        onClick={() => {
          onClickCategory(SKIN_HAIR_PAGE);
        }}
      >
        <img src={SkinHairIcon} alt="pickbazar-admin" />
        <p>Skin & Hair</p>
      </CategoryItem>
    </CategoryWrapper>
  );
};

export default CategoryNav;
