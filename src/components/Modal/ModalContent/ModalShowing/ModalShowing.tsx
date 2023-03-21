import s from './ModalShowing.module.css'
import {selectBook} from 'reducers/books'
import {useSelector} from 'react-redux'

const BookShowcase = () => {
	const book = useSelector(selectBook)

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

export default BookShowcase
