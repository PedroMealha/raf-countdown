import React from 'react';
import useDialAnimationHook from './counter.hooks';
import './counter.css';

const renderNumber = (index: number, rotationAngle: number, dialRadius: number) => {
	const style = {
		transform: `rotateX(${rotationAngle}deg) translateZ(${dialRadius}px)`,
	};
	return (
		<div key={index} className='number' style={style}>
			{index}
		</div>
	);
};

const Dial: React.FC<{ digit: number }> = ({ digit }) => {
	const NUMBER_OF_DIGITS = 10;
	const DIAL_RADIUS = 50;
	const SPEED = 0.2;
	const rotation = useDialAnimationHook(SPEED, digit);

	return (
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)` }}>
			{[...Array(NUMBER_OF_DIGITS)].map((_, index) => renderNumber(index, -36 * index, DIAL_RADIUS))}
		</div>
	);
};

export default Dial;
