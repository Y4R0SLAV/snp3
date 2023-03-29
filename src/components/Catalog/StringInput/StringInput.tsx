import s from './StringInput.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {selectStr, setStr} from 'reducers/books'

export const StringInput = () => {
	const str = useSelector(selectStr)
	const dispatch = useDispatch()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setStr(e.currentTarget.value))
	}

	return (
		<input
      className={s.Root}
			type='text'
			value={str}
			onChange={(e) => onChangeHandler(e)}
		/>
	)
}
