import {useDispatch} from 'react-redux'
import {fetchBook, setModalType, toggleModalWindow} from 'reducers/books'
import {showingType} from 'reducers/types'
import {Button} from 'common/Button/Button'

import s from './ButtonStyle.module.css'

export const ShowingButton: React.FC<{id: number}> = ({id}) => {
	const dispatch = useDispatch()

	const clickHandler = () => {
		dispatch(setModalType(showingType))
		dispatch(toggleModalWindow())
		dispatch(fetchBook(id.toString()))
	}

	return (
		<Button
			onClick={clickHandler}
			classNames={s.btn}
		>
			Quick view
		</Button>
	)
}
