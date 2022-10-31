import React from "react";
import styled from "styled-components";

export const SceneContainer = ({ children }) => {
  return <BaseContainer>{children}</BaseContainer>;
};

const BaseContainer = styled.div`
  width: 75vw;
  height: 100vh;
`;
