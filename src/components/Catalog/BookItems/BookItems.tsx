import {BookItem} from './BookItem/BookItem'
import s from './BookItems.module.css'
import {useSelector, useDispatch} from 'react-redux'
import {initializeBooks, selectBooks} from 'reducers/books'
import {useEffect} from 'react'
import {getBooksLS, setBooksLS} from 'src/localStorageInteraction'

export const BookItems = () => {
	const books = useSelector(selectBooks)
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

	return (
		<div className={s.Root}>
			{books.map((book) => {
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
