import s from './AddBookButton.module.css'
import {useDispatch} from 'react-redux'
import {setModalType, toggleModalWindow, addingType} from 'reducers/books'

export const AddBookButton = () => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setModalType(addingType))
		dispatch(toggleModalWindow())
	}

	return (
		<div
			className={s.Root}
			onClick={clickHandler}
		>
			Add a book
		</div>
	)
}
