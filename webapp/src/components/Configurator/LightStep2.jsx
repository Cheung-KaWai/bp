import React, { useContext } from "react";
import styled from "styled-components";
import { LightContext } from "../../context/LightContextProvider";
import { Button } from "../UI/Button";
import { ConfigTitle } from "./ConfigTitle";

export const LightStep2 = () => {
  const lightContext = useContext(LightContext);

  const handleClick = (ev) => {
    const angle = ev.target.value;
    lightContext.lightRef.current.angle = (angle * Math.PI) / 180;
    const value = angle / 1000;
    lightContext.pointRef.current.intensity = value;
    console.log(lightContext);
  };

  return (
    <>
      <ConfigTitle title={"Lamp Beam Angle"} />
      <AngleContainer>
        <button value={15} onClick={handleClick}>
          15°
        </button>
        <button value={35} onClick={handleClick}>
          35°
        </button>
        <button value={60} onClick={handleClick}>
          60°
        </button>
      </AngleContainer>
      {/* <Button
        onClick={() => {
          ev.preventDefault();
          lightContext.setStep(3);
        }}
      >
        Next step
      </Button> */}
    </>
  );
};

const AngleContainer = styled.div``;
