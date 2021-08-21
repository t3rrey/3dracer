import React, { useRef, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, useFBX } from "@react-three/drei";
import {
  Physics,
  usePlane,
  useBox,
  useRaycastVehicle,
} from "@react-three/cannon";
import model from "./3d-assets/1920s.fbx";
import "./styles/App.css";

const Model = () => {
  const fbx = useFBX(model);
  return <primitive object={fbx} scale={0.05} />;
};

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[100, 100]} />
    </mesh>
  );
}

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }));
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="hotpink" />
    </mesh>
  );
}

const car = (props) => {
  const [ref] = useRaycastVehicle(() => ({}));
  return <mesh ref={ref}></mesh>;
};

export default function App() {
  return (
    <Canvas
      shadowMap
      sRGB
      gl={{ alpha: false }}
      camera={{ position: [-1, 2, 50], fov: 50 }}
    >
      <color attach="background" args={["lightblue"]} />
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[10, 10, 10]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <Physics>
        <Model />
        <Cube />
        <Cube position={[0, 10, -2]} />
        <Cube position={[0, 20, -2]} />
        <Plane />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}
