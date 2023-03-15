import s from './Modal.module.css'
import classNames from 'classnames/bind'
import {ModalAdding} from './ModalAdding/ModalAdding'
import {selectBook, selectShowModal, toggleModalWindow} from '../../redux/reducers/books'
import {useDispatch, useSelector} from 'react-redux'
import {selectModalType} from './../../redux/reducers/books'
import {BookItemType} from '../Catalog/BookItems/BookItem/BookItem'

export const Modal = () => {
	const dispatch = useDispatch()
	const show = useSelector(selectShowModal)

	const toggleModal = () => {
		dispatch(toggleModalWindow())
	}

	const cx = classNames.bind(s)
	return (
		<div
			className={cx({Root: true, hide: !show})}
			onClick={() => toggleModal()}
		>
			<div
				className={s.content}
				onClick={(e) => e.stopPropagation()}
			>
				<ModalContent />
			</div>
		</div>
	)
}

const ModalContent = () => {
	const type = useSelector(selectModalType)

	if (type === 'adding') {
		return <ModalAdding />
	} else if (type === 'showing') {
		return <ModalShowing />
	} else {
		return <>Error: incorect type of a modal window</>
	}
}

const ModalShowing = () => {
	return (
		<div className=''>
			<div className={s.title}>Showing the book</div>
			<BookShowcase />
		</div>
	)
}

const BookShowcase = () => {
	const book = useSelector(selectBook)
	if (book) {
		return (
			<div className={s.showcase}>
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
					<div>Published: {book.publisher}</div>
				</div>
			</div>
		)
	}
	return <>Error: book is not selected</>
}
