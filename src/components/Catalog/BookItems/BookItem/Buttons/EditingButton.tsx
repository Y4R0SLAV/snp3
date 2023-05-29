import {useDispatch} from 'react-redux'
import {fetchBook} from 'reducers/books'
import {setModalType, toggleModalWindow} from 'reducers/app'
import {redactoringType} from 'reducers/types'
import {Button} from 'common/Button/Button'

import s from './ButtonStyle.module.css'

export const EditingButton: React.FC<{id: number}> = ({id}) => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(fetchBook(id.toString()))
		dispatch(setModalType(redactoringType))
		dispatch(toggleModalWindow())
	}

	return (
		<Button
			onClick={clickHandler}
			classNames={s.btn}
		>
			Edit
		</Button>
	)
}
