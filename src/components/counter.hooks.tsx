import { useState, useEffect, useRef, useCallback } from 'react';

const useDialAnimationHook = (speed: number, target: number) => {
	const [rotation, setRotation] = useState(0);
	const isNegative = target < 0;
	const targetRotation = isNegative ? 36 * (10 + target) : 36 * target;
	const animationFrameIdRef = useRef<number | null>(null);
	const lastTimestampRef = useRef<number | null>(null);

	const updateRotation = useCallback(
		(timestamp: number) => {
			if (lastTimestampRef.current === null) {
				lastTimestampRef.current = timestamp;
			}
			const elapsed = timestamp - lastTimestampRef.current;
			let newRotation = isNegative ? (rotation - speed * elapsed) % 360 : (rotation + speed * elapsed) % 360;

			if ((isNegative && newRotation <= targetRotation) || (!isNegative && newRotation >= targetRotation)) {
				newRotation = targetRotation;
				setRotation(newRotation);
				return;
			}
			setRotation(newRotation);
			lastTimestampRef.current = timestamp;
			animationFrameIdRef.current = requestAnimationFrame(updateRotation);
		},
		[speed, rotation, targetRotation, isNegative]
	);

	useEffect(() => {
		animationFrameIdRef.current = requestAnimationFrame(updateRotation);
		return () => {
			if (animationFrameIdRef.current !== null) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
		};
	}, [updateRotation]);

	return rotation;
};

export default useDialAnimationHook;
