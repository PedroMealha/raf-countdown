import React from 'react';
import Dial from './dial.component';
import NegativeDial from './negative-dial.component';
import './counter.css';

const Counter: React.FC<{ target: number }> = ({ target }) => {
	const isNegative = target < 0;
	const targetDigits = Math.abs(target).toString().split('').map(Number);
	const totalDigitsLength = target.toString().split('').map(Number).length;

	return (
		<div className='counter' style={{ width: `${totalDigitsLength}ch` }}>
			{isNegative && <NegativeDial digit={1} />}
			{targetDigits.map((digit, idx) => (
				<Dial key={idx} digit={digit} />
			))}
		</div>
	);
};

export default Counter;
