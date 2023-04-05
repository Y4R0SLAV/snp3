import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector} from 'react-redux'
import {selectBooks, selectTotalBooksCount} from 'reducers/books'

export const BookItems = () => {
	const filteredBooks = useSelector(selectBooks)
	const totalBooksCount = useSelector(selectTotalBooksCount)

	return (
		<div className={s.Root}>
			{filteredBooks.length === 0 &&
				(totalBooksCount > 0 ? (
					<div className={s.warning}>Nothing was found for your query.</div>
				) : (
					<div className={s.warning}>There are no books in the catalog here yet.</div>
				))}

			{filteredBooks.map((book) => (
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
