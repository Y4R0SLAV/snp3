import {FC} from 'react'
import s from './BookItem.module.css'
import {useDispatch} from 'react-redux'
import {
	setCurrentBook,
	setModalType,
	showingType,
	toggleModalWindow,
} from '../../../../redux/reducers/books'

export type BookItemType = {
	id: number
	title: string
	author: string
	imgSrc: string
	ISBN: string
	publishYear: number
	publisher: string
	description: string
}

const ShowingButton: FC<{id: number}> = ({id}) => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setModalType(showingType))
		dispatch(toggleModalWindow())
		dispatch(setCurrentBook(id))
	}

	return (
		<div
			className={s.btn}
			onClick={clickHandler}
		>
			Quick view
		</div>
	)
}

export const BookItem: FC<BookItemType & {format: 'icon' | 'full'}> = ({
	id,
	title,
	author,
	imgSrc,
	ISBN,
	publishYear,
	publisher,
	description,
	format,
}) => {
	// full - личная страничка для каждой книги, icon же - то что в каталоге
	if (format === 'icon') {
		return (
			<div className={s.Root}>
				<div className={s.img}>
					<img
						src={imgSrc}
						alt=''
					/>
				</div>
				<div className={s.info}>
					<div className={s.title}>{title}</div>
					<div className={s.author}>{author}</div>
				</div>

				<ShowingButton id={id} />
			</div>
		)
	}

	return <div className=''></div>
}
