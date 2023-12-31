import Dial from './components/counter.component';

function App() {
	return (
		<div className='App'>
			<Dial target={40128} duration={2000}/>
		</div>
	);
}

export default App;

