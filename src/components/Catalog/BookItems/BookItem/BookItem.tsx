import {FC} from 'react'
import s from './BookItem.module.css'
import {useDispatch} from 'react-redux'
import {
	redactoringType,
	setCurrentBook,
	setModalType,
	showingType,
	toggleModalWindow,
} from 'reducers/books'
import {Button} from 'src/components/common/Button/Button'

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
		<Button
			onClick={clickHandler}
			props={{classnames: s.btn}}
		>
			Quick view
		</Button>
	)
}

const EditingButton: FC<{id: number}> = ({id}) => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setCurrentBook(id))
		dispatch(setModalType(redactoringType))
		dispatch(toggleModalWindow())
	}

	return (
		<Button
			onClick={clickHandler}
			props={{classnames: s.btn}}
		>
			Edit
		</Button>
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
	const formateString = (str: string) => {
		let answer = str
		if (str.length > 20) {
			answer = str.slice(0, 20) + '...'
		}
		return answer
	}
	// full - личная страничка для каждой книги, icon же - то что в каталоге
	// неиспользуемые пропсы не используются только для первого задания
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
					<div className={s.title}>{formateString(title)}</div>
					<div className={s.author}>{formateString(author)}</div>
				</div>

				<div className={s.btns}>
					<ShowingButton id={id} />
					<EditingButton id={id} />
				</div>
			</div>
		)
	}

	return <div className=''></div>
}
