import { RefObject } from "react";
import { Event, Object3D } from "three";
export type DiceRendererProps = {
	// position: Vec3Array
	// rotation: Vec3Array
	diceId: number;
	colliderRef: RefObject<Object3D<Event>>;
};
