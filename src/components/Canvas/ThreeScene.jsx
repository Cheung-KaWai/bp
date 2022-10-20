import { Canvas } from "@react-three/fiber";
import React from "react";
import { Wall } from "../Box/Wall";

export const ThreeScene = () => {
  return (
    <Canvas>
      <color attach="background" args={["#000"]}></color>
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 5]} />
      <Wall scale={[2, 1, 1]} />
    </Canvas>
  );
};
