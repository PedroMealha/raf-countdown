import Dial from './components/counter.component';

function App() {
	return (
		<div className='App'>
			<Dial initial={14230} target={-40128} duration={2000}/>
		</div>
	);
}

export default App;

