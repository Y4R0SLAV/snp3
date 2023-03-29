import {useDispatch} from 'react-redux'
import {setModalType, toggleModalWindow} from 'reducers/books'
import {addingType} from 'reducers/types'
import {Button} from 'common/Button/Button'

export const AddBookButton = () => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setModalType(addingType))
		dispatch(toggleModalWindow())
	}

	return <Button onClick={clickHandler}>Add a book</Button>
}
