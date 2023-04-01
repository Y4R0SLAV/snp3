import {Fragment} from 'react'
import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector} from 'react-redux'
import {selectBooks} from 'reducers/books'

export const BookItems = () => {
	const books = useSelector(selectBooks)

	return (
		<div className={s.Root}>
			{books.length === 0 && (
				<div className={s.warning}>There are no books in the catalog here yet.</div>
			)}
			{books.map((book) => (
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
			))}
		</div>
	)
}
