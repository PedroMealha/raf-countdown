import React from 'react';
import Dial from './dial.component';
import './counter.css';

const Counter: React.FC<{ initial: number; target: number; duration: number }> = ({ initial, target, duration }) => {
	const maxDigits = Math.max(Math.abs(initial), Math.abs(target)).toString().length;
	const initialDigits = Math.abs(initial).toString().padStart(maxDigits, '0').split('').map(Number);
	const targetDigits = Math.abs(target).toString().padStart(maxDigits, '0').split('').map(Number);
	const showNegativeDial = initial < 0 || target < 0;
	const totalDigitsLength = target.toString().split('').map(Number).length;

	return (
		<div className='counter' style={{ width: `${showNegativeDial ? totalDigitsLength + 1 : totalDigitsLength}ch` }}>
			{showNegativeDial && (
				<Dial key='negative' digit={target < 0 ? 1 : 0} duration={duration} initial={initial < 0 ? 1 : 0} isNegative />
			)}
			{initialDigits.map((digit, idx) => (
				<Dial key={idx} digit={targetDigits[idx]} duration={duration} initial={digit} />
			))}
		</div>
	);
};

export default Counter;
