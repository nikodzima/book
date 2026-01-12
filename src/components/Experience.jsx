import { Book } from "./Book";
export const Experience = () => {

  const rotationX = window.innerWidth > 800 ? -Math.PI / 6 : -Math.PI / 16
  const rotationY = window.innerWidth > 800 ? - Math.PI / 20 : -Math.PI / 16
  const rotationZ = window.innerWidth > 800 ? - Math.PI / 27 : -Math.PI / 1.99
  return (
    <>
      <group rotation-x={rotationX} rotation-y={rotationY} rotation-z={rotationZ}>
        <Book />
      </group>
      {/* <OrbitControls /> */}
      {/* <Environment preset="studio"></Environment> */}
      <directionalLight
        position={[1, window.innerWidth > 800 ? 5 : 2, 2]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />

    </>
  );
};
