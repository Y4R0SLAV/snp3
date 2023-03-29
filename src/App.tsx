import {useDispatch, useSelector} from 'react-redux'

import {Footer} from './components/Footer/Footer'
import {Header} from './components/Header/Header'
import {Catalog} from './components/Catalog/Catalog'
import {selectShowModal, toggleModalWindow} from 'reducers/books'

import {Modal} from './components/Modal/Modal'
import {ModalContent} from './components/Modal/ModalContent/ModalContent'

import './App.css'
// в App.css глобальные переменные

function App() {
	const dispatch = useDispatch()
	const show = useSelector(selectShowModal)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

	return (
		<div>
			<Modal
				isVisible={show}
				onClose={toggleModal}
			>
				<ModalContent />
			</Modal>

			<Header />
			<Catalog />
			<Footer />
		</div>
	)
}

export default App
