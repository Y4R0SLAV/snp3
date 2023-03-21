import {useDispatch} from 'react-redux'
import {setModalType, toggleModalWindow, addingType} from 'reducers/books'
import {Button} from 'src/components/common/Button/Button'

export const AddBookButton = () => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setModalType(addingType))
		dispatch(toggleModalWindow())
	}

	return <Button onClick={clickHandler}>Add a book</Button>
}
