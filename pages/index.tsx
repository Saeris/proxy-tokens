import React from "react";
import type { NextPage } from "next";
import styled from "styled-components";

export const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  place-self: center;
  height: 100%;
`;

const Home: NextPage = () => <Container>{`Proxy Tokens Demo`}</Container>;

export default Home;
