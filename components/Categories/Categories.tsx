import React from "react";
import styled from "styled-components";

const ChronicIcon = require("image/categories/chronic.png");
const FitnesIcon = require("image/categories/fitness.png");
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
    font-family: Quicksand;
    width: 80%;
    margin: auto;
  }
`;

type CategoryProps = {};

const CategoryNav: React.FunctionComponent<CategoryProps> = ({}) => {
  return (
    <CategoryWrapper>
      <CategoryItem>
        <img src={ChronicIcon} alt="pickbazar-admin" />
        <p>Chronic Conditions</p>
      </CategoryItem>
      <CategoryItem>
        <img src={FitnesIcon} alt="pickbazar-admin" />
        <p>Fitness & Exercise</p>
      </CategoryItem>
      <CategoryItem>
        <img src={NutritionIcon} alt="pickbazar-admin" />
        <p>Diet & Nutrition</p>
      </CategoryItem>
      <CategoryItem>
        <img src={MentalIcon} alt="pickbazar-admin" />
        <p>Mental Wellness</p>
      </CategoryItem>
      <CategoryItem>
        <img src={SexualIcon} alt="pickbazar-admin" />
        <p>Sexual Wellness</p>
      </CategoryItem>
      <CategoryItem>
        <img src={WeightIcon} alt="pickbazar-admin" />
        <p>Weight Management</p>
      </CategoryItem>
      <CategoryItem>
        <img src={GeneralIcon} alt="pickbazar-admin" />
        <p>General Wellness</p>
      </CategoryItem>
      <CategoryItem>
        <img src={PainIcon} alt="pickbazar-admin" />
        <p>Pain Management</p>
      </CategoryItem>
      <CategoryItem>
        <img src={SkinHairIcon} alt="pickbazar-admin" />
        <p>Skin & Hair</p>
      </CategoryItem>
    </CategoryWrapper>
  );
};

export default CategoryNav;
