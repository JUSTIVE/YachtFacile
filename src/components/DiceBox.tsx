import React, { Ref } from "react";
import { useBox } from "@react-three/cannon";
import { DiceBoxProps } from "./DiceBox.props";
import { Mesh, BufferGeometry, Material, DoubleSide } from "three";

export const DiceBox = (props: DiceBoxProps) => {
  const boxBottomSize = 15;
  const sqrt2 = Math.sqrt(2);

  // const rotatedCoord = [x, y, z];
  const [backLeftRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    rotation: [0, (Math.PI * 3) / 4, 0],
    position: [
      (-boxBottomSize * sqrt2) / 4,
      boxBottomSize / 2,
      (boxBottomSize * sqrt2) / 4,
    ],
    ...props,
  }));

  const [backRightRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    position: [
      (-boxBottomSize * sqrt2) / 4,
      boxBottomSize / 2,
      (-boxBottomSize * sqrt2) / 4,
    ],
    rotation: [0, Math.PI / 4, 0],
    ...props,
  }));

  const [frontLeftRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    position: [
      (boxBottomSize * sqrt2) / 4,
      boxBottomSize / 2,
      (boxBottomSize * sqrt2) / 4,
    ],
    rotation: [0, (-Math.PI * 3) / 4, 0],
    ...props,
  }));

  const [frontRightRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    position: [
      (boxBottomSize * sqrt2) / 4,
      boxBottomSize / 2,
      (-boxBottomSize * sqrt2) / 4,
    ],
    rotation: [0, -Math.PI / 4, 0],
    ...props,
  }));

  const [bottomRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    rotation: [-Math.PI / 2, 0, -Math.PI / 4],
    ...props,
  }));

  const [ceilRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    position: [0, boxBottomSize, 0],
    rotation: [Math.PI / 2, 0, -Math.PI / 4],
    ...props,
  }));

  return (
    <>
      <mesh
        ref={
          backLeftRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={"material"} color={"#fff"} />
      </mesh>
      <mesh
        ref={
          backRightRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={"material"} color={"#fff"} />
      </mesh>
      <mesh
        ref={
          frontLeftRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={"material"} color={"#fff"} />
      </mesh>
      <mesh
        ref={
          frontRightRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={"material"} color={"#fff"} />
      </mesh>
      <mesh
        ref={
          bottomRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial
          attach={"material"}
          color={"#fff"}
          side={DoubleSide}
        />
      </mesh>
      <mesh
        ref={
          ceilRef as
            | Ref<Mesh<BufferGeometry, Material | Material[]>>
            | undefined
        }
        receiveShadow
      >
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={"material"} color={"#fff"} />
      </mesh>
    </>
  );
};
