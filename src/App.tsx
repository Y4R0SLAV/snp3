import './App.css'
import {Footer} from './components/Footer/Footer'
import {Header} from './components/Header/Header'
import {Catalog} from './components/Catalog/Catalog'
import {Modal} from './components/Modal/Modal'

function App() {
	return (
		<div>
			<Modal />
			<Header />
			<Catalog />
			<Footer />
		</div>
	)
}

export default App
