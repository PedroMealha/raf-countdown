import React from 'react';
import useDialAnimationHook from './counter.hooks';

const Dial: React.FC<{ digit: number; duration: number, isNegative?: boolean }> = ({ digit, duration, isNegative = false }) => {
	const NUMBER_OF_DIGITS = 10;
	const DIAL_RADIUS = 50;
	const rotation = useDialAnimationHook(duration, digit);

	const renderNumber = (index: number) => {
		const rotationAngle = -36 * index;
		const style = { transform: `rotateX(${rotationAngle}deg) translateZ(${DIAL_RADIUS}px)` };
		const displayValue = isNegative && (index === 1 || index === 9) ? '-' : index.toString();

		return (
			<div key={index} className='number' style={style}>
				{displayValue}
			</div>
		);
	};

	return (
		<div className='dial' style={{ transform: `rotateX(${rotation}deg)` }}>
			{[...Array(NUMBER_OF_DIGITS)].map((_, index) => renderNumber(index))}
		</div>
	);
};

export default Dial;
