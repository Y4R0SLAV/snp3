import s from './BookShowcase.module.css'
import {selectBook, selectBookIsPending} from 'reducers/books'
import {useSelector} from 'react-redux'
import Preloader from 'src/components/common/Preloader/Preloader'

export const BookShowcase = () => {
	const book = useSelector(selectBook)
	const bookIsPending = useSelector(selectBookIsPending)

	if (bookIsPending) {
		return <Preloader />
	}

	if (book) {
		return (
			<div className={s.Root}>
				<div className={s.cover}>
					<img
						src={book.imgSrc}
						alt=''
					/>
				</div>
				<div className={s.info}>
					<div>Title: {book.title}</div>
					<div>Author: {book.author}</div>
					<div>ISBN-13: {book.ISBN}</div>
					<div>Published in: {book.publishYear}</div>
					<div>Published by: {book.publisher}</div>
					<div>Description: {book.description}</div>
				</div>
			</div>
		)
	}
	return <>Error: book is not selected</>
}
