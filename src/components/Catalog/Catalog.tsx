import {Modal} from '../Modal/Modal'
import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'

export const Catalog = () => {
	return (
		<div className={s.Root}>
			<Modal />
			<div className={s.content}>
				<AddBookButton />
				<BookItems />
			</div>
		</div>
	)
}
