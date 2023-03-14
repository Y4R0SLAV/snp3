import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'

export const Catalog = () => {
	return (
		<div className={s.Root}>
			<AddBookButton />
			<BookItems />
		</div>
	)
}
