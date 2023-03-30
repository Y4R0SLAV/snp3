import {useEffect} from 'react'
import {BookItem} from '../Catalog/BookItems/BookItem/BookItem'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {setCurrentBook, selectBook, selectBooks} from 'reducers/books'

export const BookItemPage = () => {
	const params = useParams()
	const id = params.id as string
	const dispatch = useDispatch()

	const book = useSelector(selectBook)
	const books = useSelector(selectBooks)

	useEffect(() => {
		dispatch(setCurrentBook(+id))
	}, [dispatch, id, books])
	// books нужны чтобы избежать выбора книги до инициализации, и избежать получения undefined вместо искомой

	if (book) {
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
	} else {
		return <>'Book is undefined'</>
	}
}
