import {BookError} from './BookError/BookError'
import {BookItem} from './BookItem/BookItem'
import {Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import {selectBooks, selectBooksIsPending, selectTotalBooksCount} from 'reducers/books'

import s from './BookItems.module.css'

export const BookItems = () => {
	const filteredBooks = useSelector(selectBooks)
	const totalBooksCount = useSelector(selectTotalBooksCount)
	const booksIsPending = useSelector(selectBooksIsPending)

	useEffect(() => {
		setFilteredBooks(getFilteredBooks(books, query, query, 'authorOrTitle'))
	}, [books, query])

	return (
		<div className={s.Root}>
			<BookError
				currentBooksCount={filteredBooks.length}
				totalCount={totalBooksCount}
				isPending={booksIsPending}
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
			<Toaster
				position='top-center'
				reverseOrder={true}
			/>
		</div>
	)
}
