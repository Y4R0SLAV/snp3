import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'
import { StringInput } from './StringInput/StringInput'

export const Catalog = () => {
	return (
		<div className={s.Root}>
			<div className={s.content}>
				<StringInput />
				<AddBookButton />
				<BookItems />
			</div>
		</div>
	)
}
