import {useState} from 'react'
import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {initializeBooks, selectBooks, selectSearchQuery} from 'reducers/books'
import {useEffect} from 'react'
import {getBooksLS, setBooksLS} from 'src/localStorageInteraction'
import {getFilteredBooks} from 'src/utils/getFilteredBooks'

export const BookItems = () => {
	const books = useSelector(selectBooks)
	const query = useSelector(selectSearchQuery)

	// первый query - поиск по автору, второй по названию
	const [filteredBooks, setFilteredBooks] = useState(
		getFilteredBooks(books || [], query, query, 'authorOrTitle'),
	)

	const dispatch = useDispatch()

	useEffect(() => {
		// инициализация книжек
		const booksFromLS = getBooksLS()
		if (booksFromLS.length > 0) {
			dispatch(initializeBooks(booksFromLS))
		}
	}, [dispatch])

	useEffect(() => {
		setBooksLS(books)
	}, [books])

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
		</div>
	)
}
