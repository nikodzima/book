import { Environment, Float, OrbitControls } from "@react-three/drei";
import { Book } from "./Book";
export const Experience = () => {

  const rotationX = window.innerWidth > 800 ? -Math.PI / 6 : -Math.PI / 16
  const rotationY = window.innerWidth > 800 ? - Math.PI / 20 : -Math.PI / 16
  const rotationZ = window.innerWidth > 800 ? - Math.PI / 30 : -Math.PI / 1.97

  return (
    <>
      <group rotation-x={rotationX} rotation-y={rotationY} rotation-z={rotationZ}>
        <Book />
      </group>
      {/* <OrbitControls /> */}
      {/* <Environment preset="studio"></Environment> */}
      <directionalLight
        position={[3, window.innerWidth > 800 ? 5 : 2, 2]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={window.innerWidth > 800 ? -1.5 : -3} rotation-x={-Math.PI / (window.innerWidth > 800 ? 2 : 12)} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </>
  );
};
