import {useEffect} from 'react'
import {BookItem} from '../Catalog/BookItems/BookItem/BookItem'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {selectBook, selectBooks, fetchBook, selectBookIsPending} from 'reducers/books'
import {BookError} from './../Catalog/BookItems/BookError/BookError'

export const BookItemPage = () => {
	const params = useParams()
	const id = params.id as string
	const dispatch = useDispatch()

	const book = useSelector(selectBook)
	const books = useSelector(selectBooks)

	const bookIsPending = useSelector(selectBookIsPending)

	useEffect(() => {
		dispatch(fetchBook(id))
	}, [dispatch, id, books])
	// books нужны чтобы избежать выбора книги до инициализации, и избежать получения undefined вместо искомой

	if (book?.id === +id) {
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
				format='full'
			/>
		)
	}
	return (
		<BookError
			isPending={bookIsPending}
			totalCount={1}
			currentBooksCount={0}
		/>
	)
}
