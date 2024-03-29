import React from "react";
import { Canvas } from "@react-three/fiber";
// import { DiceRenderer } from './Dice'
import { Physics } from "@react-three/cannon";
import { Stats } from "@react-three/drei";
import { EffectComposer, DepthOfField } from "@react-three/postprocessing";
// import { SphereRenderer } from './Sphere'
import { DiceBox } from "./DiceBox";
import { Dices } from "./Dices";

export const Field = () => {
  return (
    <div id='canvas-container' style={{ width: "100vw", height: "500px" }}>
      <Canvas
        shadows={"soft"}
        orthographic
        camera={{ zoom: 20, near: -100, far: 100, position: [2, 2, 0] }}
      >
        <color attach='background' args={["#222"]} />
        <ambientLight intensity={0.1} />
        <directionalLight color={"#efefff"} position={[0, 4, 8]} castShadow />
        <directionalLight color={"#efefff"} position={[4, 4, -6]} castShadow />
        <directionalLight color={"#efefff"} position={[-4, 4, -6]} castShadow />
        <Physics gravity={[0, -39.2, 0]}>
          {/* <Debug> */}
          <DiceBox />
          <Dices />
          {/* <SphereRenderer position={[0, 5, 0]} /> */}
          {/* </Debug> */}
        </Physics>
        {/* <OrbitControls enableDamping={false} /> */}

        <Stats />

        <EffectComposer multisampling={4}>
          <DepthOfField
            target={[0, 0, 10]}
            focalLength={0.4}
            bokehScale={5}
            height={700}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
