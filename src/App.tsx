import {useDispatch, useSelector} from 'react-redux'
import {Layout} from './components/Layout/Layout'
import {Catalog} from './components/Catalog/Catalog'
import {selectShowModal, toggleModalWindow} from 'reducers/books'

import {Modal} from './components/Modal/Modal'
import {ModalContent} from './components/Modal/ModalContent/ModalContent'

import {BookItemPage} from './components/BookItemPage/BookItemPage'

import {Routes} from 'react-router'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import './App.css'
// в App.css глобальные переменные

function App() {
	const dispatch = useDispatch()
	const show = useSelector(selectShowModal)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

	return (
		<Router>
			<Modal
				isVisible={show}
				onClose={toggleModal}
			>
				<ModalContent />
			</Modal>

			<Layout>
				<Routes>
					<Route
						path='/'
						element={<Catalog />}
					/>
					<Route
						path='/items/:id'
						element={<BookItemPage />}
					/>
				</Routes>
			</Layout>
		</Router>
	)
}

export default App
