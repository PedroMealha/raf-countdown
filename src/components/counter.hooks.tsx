import { useState, useEffect, useRef, useCallback } from 'react';

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const useDialAnimationHook = (duration: number, target: number, initial: number) => {
    const rotationPerDigit = 36; // Degrees per digit
    // The initial rotation should be based on the initial digit, ensuring it's within a 0-360 degree range
    const initialRotation = (initial % 10) * rotationPerDigit;
    // The final rotation should similarly represent the target digit
    const finalRotation = (target % 10) * rotationPerDigit;

    const [rotation, setRotation] = useState(initialRotation);
    const animationFrameIdRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);

    const updateRotation = useCallback((timestamp: number) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }
        const elapsed = timestamp - startTimeRef.current;
        const normalizedTime = Math.min(elapsed / duration, 1);
        const easedTime = easeInOutCubic(normalizedTime);
        // Calculate new rotation based on eased time
        const newRotation = initialRotation + easedTime * (finalRotation - initialRotation);

        setRotation(newRotation);

        if (normalizedTime < 1) {
            animationFrameIdRef.current = requestAnimationFrame(updateRotation);
        }
    }, [initialRotation, finalRotation, duration]);

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
