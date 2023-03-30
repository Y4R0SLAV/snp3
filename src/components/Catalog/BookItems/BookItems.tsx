import {Fragment} from 'react'
import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector} from 'react-redux'
import {selectBooks, selectStr} from 'reducers/books'

export const BookItems = () => {
	const books = useSelector(selectBooks)

	const str = useSelector(selectStr)

	return (
		<div className={s.Root}>
			{books.length === 0 && (
				<div className={s.warning}>There are no books in the catalog here yet.</div>
			)}
			{books.map((book) => {
				if (book.author.includes(str) || book.title.includes(str)) {
					return (
						<BookItem
							key={book.id}
							title={book.title}
							id={book.id}
							ISBN={book.ISBN}
							author={book.author}
							description={book.description}
							imgSrc={book.imgSrc}
							publishYear={book.publishYear}
							publisher={book.publisher}
							format='icon'
						/>
					)
				}
				return <Fragment key={book.id} />
			})}
		</div>
	)
}
