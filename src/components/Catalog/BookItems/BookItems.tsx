import {Fragment} from 'react'
import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {initializeBooks, selectBooks, selectSearchQuery} from 'reducers/books'
import {useEffect} from 'react'
import {getBooksLS, setBooksLS} from 'src/localStorageInteraction'

export const BookItems = () => {
	const books = useSelector(selectBooks)
	const dispatch = useDispatch()

	const query = useSelector(selectSearchQuery)

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

	return (
		<div className={s.Root}>
			{books.length === 0 && (
				<div className={s.warning}>There are no books in the catalog here yet.</div>
			)}
			{books.map((book) => {
				if (book.author.includes(query) || book.title.includes(query)) {
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
