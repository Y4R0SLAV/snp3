import s from './App.module.css'
import {Footer} from './components/Footer/Footer'
import {Header} from './components/Header/Header'
import {Catalog} from './components/Catalog/Catalog'

function App() {
	return (
		<div className={s.Root}>
			<Header />
			<Catalog />
			<Footer />
		</div>
	)
}

export default App
