import s from './SearchInput.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {selectSearchQuery, setSearchQuery} from 'reducers/books'

export const SearchInput = () => {
	const query = useSelector(selectSearchQuery)
	const dispatch = useDispatch()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setSearchQuery(e.currentTarget.value))
	}

	return (
		<input
			className={s.Root}
			type='text'
			value={query}
			onChange={(e) => onChangeHandler(e)}
		/>
	)
}
