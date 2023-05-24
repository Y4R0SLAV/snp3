<<<<<<< HEAD
import {useState, useEffect} from 'react'
=======
import {BookError} from './BookError/BookError'
>>>>>>> feature/5_json_server
import {BookItem} from './BookItem/BookItem'
import {Toaster} from 'react-hot-toast'
import {useSelector} from 'react-redux'
import {selectBooks, selectBooksIsPending, selectTotalBooksCount} from 'reducers/books'

import s from './BookItems.module.css'
<<<<<<< HEAD
import {useSelector} from 'react-redux'
import {selectBooks, selectSearchQuery} from 'reducers/books'
import {getFilteredBooks} from 'src/utils/getFilteredBooks'

export const BookItems = () => {
	const books = useSelector(selectBooks)
	const query = useSelector(selectSearchQuery)

	const [filteredBooks, setFilteredBooks] = useState(
		getFilteredBooks(books || [], query, query, 'authorOrTitle'),
	)

	useEffect(() => {
		setFilteredBooks(getFilteredBooks(books, query, query, 'authorOrTitle'))
	}, [books, query])

	return (
		<div className={s.Root}>
			{filteredBooks.length === 0 &&
				(books.length > 0 ? (
					<div className={s.warning}>Nothing was found for your query.</div>
				) : (
					<div className={s.warning}>There are no books in the catalog here yet.</div>
				))}

			{filteredBooks.map((book) => {
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
			})}
=======

export const BookItems = () => {
	const filteredBooks = useSelector(selectBooks)
	const totalBooksCount = useSelector(selectTotalBooksCount)
	const booksIsPending = useSelector(selectBooksIsPending)

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
>>>>>>> feature/5_json_server
		</div>
	)
}
