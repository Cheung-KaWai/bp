import { getModel } from "@/js/firebase";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

export const ArView = () => {
  const { id } = useParams();
  const [glb, setGlb] = useState(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      getModel(id).then((model) => {
        setGlb(model);
        setLoadingDone(true);
        setError(null);
        console.log(model);
      });
    } catch (err) {
      console.log(err);
      setError(err?.message);
    }
  }, []);

  return (
    <Container>
      {loadingDone && (
        <>
          <model-viewer
            src={glb}
            ar
            ar-modes="scene-viewer quick-look"
            camera-controls
            shadow-intensity="0"
            exposure="0.3"
            shadow-softness="1"
          >
            <button slot="ar-button" id="ar-button">
              View in your space
            </button>
            {/* <button id="ar-failure">AR is not tracking!</button> */}
          </model-viewer>
        </>
      )}
      {error && <p>{error}</p>}
    </Container>
  );
};

const StartButton = styled.button`
  position: absolute;
  bottom: 15rem;
  left: 50%;
  transform: translateX(-50%);
  border: none;
  background-color: transparent;
  padding: 1rem 2.5rem;
  color: #42607a;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 1px;
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
`;
