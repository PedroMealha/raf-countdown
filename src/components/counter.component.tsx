import React from 'react';
import Dial from './dial.component';
import './counter.css';

const Counter: React.FC<{ initial: number; target: number; duration: number }> = ({ initial, target, duration }) => {
	const isNegativeTransition = initial < 0 || target < 0;
	const maxDigits = Math.max(Math.abs(initial), Math.abs(target)).toString().length;

	const initialDigits = Math.abs(initial).toString().padStart(maxDigits, '0').split('').map(Number);
	const targetDigits = Math.abs(target).toString().padStart(maxDigits, '0').split('').map(Number);

	const totalDigitsLength = target.toString().length;

	return (
		<div className='counter' style={{ width: `${totalDigitsLength}ch` }}>
			{isNegativeTransition && <Dial digit={0} duration={duration} initial={0} isNegative />}
			{initialDigits.map((digit, idx) => (
				<Dial key={idx} digit={targetDigits[idx]} duration={duration} initial={digit} />
			))}
		</div>
	);
};

export default Counter;
