import React from 'react';
import useDialAnimationHook from './counter.hooks'; // Assuming this is the correct path

const renderNegativeNumber = (index: number, rotationAngle: number, dialRadius: number) => {
	const style = { transform: `rotateX(${rotationAngle}deg) translateZ(${dialRadius}px)` };
	const number = index === 1 || index === 9 ? '-' : ''; // "-" on 1 and 9 positions

	return (
		<div key={index} className='number' style={style}>
			{number}
		</div>
	);
};

const NegativeDial: React.FC<{ digit: number }> = ({ digit }) => {
	const NUMBER_OF_DIGITS = 10;
	const DIAL_RADIUS = 50;
	const SPEED = 0.1;
	const rotation = useDialAnimationHook(SPEED, digit);

	return (
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)` }}>
			{[...Array(NUMBER_OF_DIGITS)].map((_, index) => renderNegativeNumber(index, -36 * index, DIAL_RADIUS))}
		</div>
	);
};

export default NegativeDial;
