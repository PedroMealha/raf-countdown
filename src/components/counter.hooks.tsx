import { useState, useEffect, useRef } from 'react';

const useDialAnimationHook = (duration: number, target: number, initial: number, isNegative: boolean = false) => {
	const rotationPerDigit = 36;
	const startRotation = (initial % 10) * rotationPerDigit;
	let rotationDifference = ((target % 10) - (initial % 10)) * rotationPerDigit;

	if (isNegative) {
		rotationDifference = target < 0 ? -36 : 36;
	} else {
		if (rotationDifference < 0) rotationDifference += 360;
	}

	const [rotation, setRotation] = useState(startRotation);
	const animationFrameIdRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);

	useEffect(() => {
		const updateRotation = (timestamp: number) => {
			if (!startTimeRef.current) {
				startTimeRef.current = timestamp;
			}
			const elapsed = timestamp - startTimeRef.current;
			const normalizedTime = Math.min(elapsed / duration, 1);
			const newRotation = startRotation + normalizedTime * rotationDifference;

			setRotation(newRotation);

			if (normalizedTime < 1) {
				animationFrameIdRef.current = requestAnimationFrame(updateRotation);
			}
		};

		animationFrameIdRef.current = requestAnimationFrame(updateRotation);
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
		};
	}, [startRotation, rotationDifference, duration]);

	return rotation;
};

export default useDialAnimationHook;
