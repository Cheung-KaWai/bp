import React, { useContext, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../context/DataContextProvider";
import { LightContext } from "../../context/LightContextProvider";
import { getData } from "../../js/firebase";
import { FlexContainer } from "../Layout/FlexContainer";
import * as THREE from "three";

export const GenerateRoom = () => {
  const context = useContext(DataContext);
  const lightContext = useContext(LightContext);

  const [roomId, setRoomId] = useState("");
  const [err, setErr] = useState("");

  const handleGeneration = async () => {
    const data = await getData(roomId);

    if (typeof data === "string") {
      setErr(data);
    } else {
      context.setRoomData(data);
      context.setRerender((prev) => !prev);
      lightContext.setStep(1);

      const transform = data.walls[0].transform;
      const matrix = new THREE.Matrix4();
      matrix.set(...transform);
      let translation = new THREE.Vector3();
      let rotation = new THREE.Quaternion();
      let scaleMatrix = new THREE.Vector3();
      matrix.transpose().decompose(translation, rotation, scaleMatrix);

      const dimensions = data.walls[0].dimensions;
      lightContext.setHeight(dimensions[1] / 2);
      lightContext.setRotation(rotation);
    }
  };

  const handleNextStep = () => {
    lightContext.setStep(1);
  };

  return (
    <InputContainer>
      <FlexContainer align="center" justify="space-between">
        <Label>Room ID</Label>
        <ErrorMessage>{err}</ErrorMessage>
      </FlexContainer>
      <Input
        placeholder="wCCz3UBJxB5lqnqousUo"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        onFocus={() => setErr("")}
      />
      <Generate onClick={handleGeneration}>Generate Room</Generate>
      {/* <Generate onClick={handleNextStep}>Configure light</Generate> */}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.label`
  display: block;
  font-size: 2rem;
`;

const Input = styled.input`
  width: 100%;
  height: 5rem;
  padding: 0 2rem;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  ::placeholder {
    color: #dee2e6;
  }
`;

const ErrorMessage = styled.span`
  color: red;
`;

const Generate = styled.button`
  margin-top: 1rem;
  background-color: #91a7ff;
  height: 5rem;
  padding: 0 2rem;
  border-radius: 0.5rem;
  color: #364fc7;
  text-align: center;
  transition: all 0.3s ease-out;
  :hover {
    transform: scale(1.01);
  }
`;