import { Canvas } from "@react-three/fiber";
import React, { useContext } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { SceneContainer } from "../Layout/SceneContainer";
import { GroupWalls } from "../Room/GroupWalls";
import { LightContext } from "../../context/LightContextProvider";
import { Lamp } from "./Lamp.jsx";
import { Floor } from "./Floor";
import { Camera } from "./Camera";
import { GroupWindows } from "../Room/GroupWindows";
import { GroupDoors } from "../Room/GroupDoors";
import { GroupObjects } from "../Room/GroupObjects";
import { DataContext } from "../../context/DataContextProvider";

export const Scene = () => {
  const lightContext = useContext(LightContext);
  const context = useContext(DataContext);

  const FixFloorpliz = () => {
    const result = context.cornerPoints.reduce((unique, o) => {
      if (!unique.some((obj) => obj.x === o.x && obj.y === o.y && obj.z === o.z)) {
        unique.push(o);
      }
      return unique;
    }, []);

    const getCubes = result.map((point, key) => (
      <mesh scale={[0.1, 0.1, 0.1]} position={[point.x, point.y, point.z]} key={key}>
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    ));
    return getCubes;
  };

  return (
    <SceneContainer>
      <Canvas shadows flat>
        <OrbitControls ref={lightContext.orbitRef} makeDefault />
        <color attach="background" args={["#70777F"]} />
        <Camera />
        <Center>
          <GroupWalls />
          <Environment preset="studio" ref={lightContext.envRef} />
          <GroupWindows />
          <GroupDoors />
          <GroupObjects />
        </Center>
        {/* {FixFloorpliz()} */}
        <Floor />
        {/* <Lamp /> */}
      </Canvas>
    </SceneContainer>
  );
};
// const Button = styled.button`
//   background-color: red;
//   z-index: 4;
//   position: fixed;
//   top: 0;
//   right: 0;
// `;

// class Point {
//   constructor(x, y) {
//     this.x = x;
//     this.y = y;
//   }
// }

// // To find orientation of ordered triplet (p, q, r).
// // The function returns following values
// // 0 --> p, q and r are collinear
// // 1 --> Clockwise
// // 2 --> Counterclockwise
// function orientation(p, q, r) {
//   let val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);

//   if (val == 0) return 0; // collinear
//   return val > 0 ? 1 : 2; // clock or counterclock wise
// }

// // Prints convex hull of a set of n points.
// function convexHull(points, n) {
//   // There must be at least 3 points
//   if (n < 3) return;

//   // Initialize Result
//   let hull = [];

//   // Find the leftmost point
//   let l = 0;
//   for (let i = 1; i < n; i++) if (points[i].x < points[l].x) l = i;

//   // Start from leftmost point, keep moving
//   // counterclockwise until reach the start point
//   // again. This loop runs O(h) times where h is
//   // number of points in result or output.
//   let p = l;
//   let q;
//   do {
//     // Add current point to result
//     hull.push(points[p]);

//     // Search for a point 'q' such that
//     // orientation(p, q, x) is counterclockwise
//     // for all points 'x'. The idea is to keep
//     // track of last visited most counterclock-
//     // wise point in q. If any point 'i' is more
//     // counterclock-wise than q, then update q.
//     q = (p + 1) % n;

//     for (let i = 0; i < n; i++) {
//       // If i is more counterclockwise than
//       // current q, then update q
//       if (orientation(points[p], points[i], points[q]) == 2) q = i;
//     }

//     // Now q is the most counterclockwise with
//     // respect to p. Set p as q for next iteration,
//     // so that q is added to result 'hull'
//     p = q;
//   } while (p != l); // While we don't come to first
//   // point

//   // Print Result
//   console.log(hull);
// }
