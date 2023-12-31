import React from 'react';
import Dial from './dial.component';
import './counter.css';

const Counter: React.FC<{ target: number; duration?: number }> = ({ target, duration = 2000 }) => {
	const isNegative = target < 0;
	const targetDigits = Math.abs(target).toString().split('').map(Number);
	const totalDigitsLength = target.toString().split('').map(Number).length;

	return (
		<div className='counter' style={{ width: `${totalDigitsLength}ch` }}>
			{isNegative && <Dial digit={1} duration={duration} isNegative={true} />}
			{targetDigits.map((digit, idx) => (
				<Dial key={idx} digit={digit} duration={duration} />
			))}
		</div>
	);
};

export default Counter;
