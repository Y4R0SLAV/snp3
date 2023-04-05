import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Layout} from './components/Layout/Layout'
import {Catalog} from './components/Catalog/Catalog'
import {fetchBooks, selectShowModal, selectSearchQuery, toggleModalWindow} from 'reducers/books'

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
	const query = useSelector(selectSearchQuery)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

	useEffect(() => {
		dispatch(fetchBooks(query))
	}, [dispatch, query])

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
