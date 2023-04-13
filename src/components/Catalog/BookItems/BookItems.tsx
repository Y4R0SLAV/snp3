import {BookError} from './BookError/BookError'
import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector} from 'react-redux'
import {selectBooks, selectErrorMessage, selectTotalBooksCount} from 'reducers/books'

export const BookItems = () => {
	const filteredBooks = useSelector(selectBooks)
	const totalBooksCount = useSelector(selectTotalBooksCount)
	const errorMessage = useSelector(selectErrorMessage)

	return (
		<div className={s.Root}>
			<BookError
				currentBooksCount={filteredBooks.length}
				totalCount={totalBooksCount}
				errorMessage={errorMessage}
			/>

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
