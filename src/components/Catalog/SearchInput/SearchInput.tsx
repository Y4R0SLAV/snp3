import s from './SearchInput.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {selectSearchQuery, setSearchQuery} from 'reducers/books'
import {useSearchParams} from 'react-router-dom'
import {useEffect} from 'react'

export const SearchInput = () => {
	const query = useSelector(selectSearchQuery)
	const dispatch = useDispatch()

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.currentTarget.value
		if (!search) {
			return setSearchParams({})
		}
		setSearchParams({search})
	}

	const [searchParams, setSearchParams] = useSearchParams()

	useEffect(() => {
		dispatch(setSearchQuery(searchParams.get('search') || ''))
	}, [dispatch, searchParams])

	return (
		<input
			className={s.Root}
			type='text'
			value={query}
			onChange={(e) => onChangeHandler(e)}
		/>
	)
}
