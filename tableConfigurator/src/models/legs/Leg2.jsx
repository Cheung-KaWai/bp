import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
export function Leg2({ position, material }) {
  const { nodes, materials } = useGLTF("/assets/models/legs/leg2.glb");
  return (
    <group position={position} dispose={"/assets/models/legs/leg2.glb"}>
      <mesh
        geometry={nodes.Cube001.geometry}
        material={material}
        position={[0, 0.34, 0]}
        rotation={[-Math.PI, Math.PI / 2, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.Cube011.geometry}
        material={material}
        position={[0, 0.379, -0.0015]}
        rotation={[Math.PI, Math.PI / 2, 1.57]}
      />
      <mesh
        geometry={nodes.Cube002.geometry}
        material={material}
        position={[0, 0.79, 0]}
        rotation={[Math.PI, Math.PI / 2, Math.PI]}
      />
      <mesh
        geometry={nodes.Cube012.geometry}
        material={material}
        position={[0, 0.005, 0]}
        rotation={[Math.PI, Math.PI / 2, Math.PI]}
      />
    </group>
  );
}

useGLTF.preload("/assets/models/legs/leg2.glb");
