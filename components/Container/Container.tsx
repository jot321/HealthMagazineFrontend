import React from "react";
import {
  ContainerArea,
  CoachPageMobileOnlyContainer,
} from "./Container.styled";

export const Container: React.FunctionComponent<{}> = ({ children }) => {
  return <ContainerArea>{children}</ContainerArea>;
};

export const MobileOnlyContainer: React.FunctionComponent<{}> = ({
  children,
}) => {
  return (
    <CoachPageMobileOnlyContainer>{children}</CoachPageMobileOnlyContainer>
  );
};
