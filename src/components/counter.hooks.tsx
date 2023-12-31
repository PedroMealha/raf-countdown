import { useState, useEffect, useRef, useCallback } from 'react';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const useDialAnimationHook = (duration: number, target: number) => {
	const [rotation, setRotation] = useState(0);
	const isNegative = target < 0;
	const finalRotation = target === 0 ? 360 : (isNegative ? -1 : 1) * 36 * Math.abs(target);
	const animationFrameIdRef = useRef<number | null>(null);
	const startTimeRef = useRef<number | null>(null);

	const updateRotation = useCallback(
		(timestamp: number) => {
			if (startTimeRef.current === null) {
				startTimeRef.current = timestamp;
			}
			const elapsed = timestamp - startTimeRef.current;
			const normalizedTime = Math.min(elapsed / duration, 1);
			const easedTime = easeInOutCubic(normalizedTime);
			const newRotation = easedTime * finalRotation;

			if (elapsed < duration) {
				setRotation(newRotation);
				animationFrameIdRef.current = requestAnimationFrame(updateRotation);
			} else {
				setRotation(finalRotation);
			}
		},
		[duration, finalRotation]
	);

	useEffect(() => {
		animationFrameIdRef.current = requestAnimationFrame(updateRotation);
		return () => {
			if (animationFrameIdRef.current) {
				cancelAnimationFrame(animationFrameIdRef.current);
			}
		};
	}, [updateRotation]);

	return rotation;
};

export default useDialAnimationHook;
