import {useState} from 'react'
import {Modal} from '../Modal/Modal'
import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'

export const Catalog = () => {
	const [showModal, setShowModal] = useState(false)

	return (
		<div className={s.Root}>
			<Modal
				show={showModal}
				setShowModal={setShowModal}
			/>
			<AddBookButton setShowModal={setShowModal} />
			<BookItems />
		</div>
	)
}
