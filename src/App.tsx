import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Layout} from './components/Layout/Layout'
import {Catalog} from './components/Catalog/Catalog'
import {initializeBooks, selectBooks, selectShowModal, toggleModalWindow} from 'reducers/books'

import {Modal} from './components/Modal/Modal'
import {ModalContent} from './components/Modal/ModalContent/ModalContent'

import {BookItemPage} from './components/BookItemPage/BookItemPage'
import {getBooksLS, setBooksLS} from './localStorageInteraction'

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

	const books = useSelector(selectBooks)

	useEffect(() => {
		// инициализация книжек
		const booksFromLS = getBooksLS()
		if (booksFromLS.length > 0) {
			dispatch(initializeBooks(booksFromLS))
		}
	}, [dispatch])

	useEffect(() => {
		setBooksLS(books)
	}, [books])

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
