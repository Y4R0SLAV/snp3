import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'
import {SearchInput} from './SearchInput/SearchInput'

export const Catalog = () => {
	return (
		<div className={s.Root}>
			<div className={s.content}>
				<SearchInput />
				<AddBookButton />
				<BookItems />
			</div>
		</div>
	)
}
