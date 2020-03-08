import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 25px;
  background-color: #f4f4f4;
  position: relative;
  z-index: 1;

  @media (max-width: 768px) {
    margin-left: -7.5px;
    margin-right: -7.5px;
    margin-top: 15px;
  }
`;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const ProductsCol = styled.div`
  flex: 0 0 33.33333%;
  max-width: 33.33333%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;

  @media (min-width: 1301px) and (max-width: 1500px) {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333%;
  }

  @media (min-width: 768px) and (max-width: 1300px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (max-width: 768px) {
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 15px;
    flex: 0 0 100%;
    max-width: 100%;
  }
  @media (max-width: 1199px) and (min-width: 991px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
`;

export const NoResult = styled.div`
  width: 100%;
  padding: 100px 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: ${themeGet("fontFamily.0", "sans-serif")};
  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
  color: ${themeGet("colors.darkBold", "#0D1136")};
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
`;

export const LoaderItem = styled.div`
  width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;
`;

export const ProductCardWrapper = styled.div`
  height: 100%;

  > div {
    height: 100%;
  }
`;
