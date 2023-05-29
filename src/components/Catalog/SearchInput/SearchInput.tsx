import s from './SearchInput.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDebounce} from 'src/hooks/useDebounce'
import {selectSearchQuery, setSearchQuery} from 'reducers/app'

export const SearchInput = () => {
	const dispatch = useDispatch()

	const stateSearchQuery = useSelector(selectSearchQuery)
	const [searchParams, setSearchParams] = useSearchParams()
	const [value, setValue] = useState(searchParams.get('search') || stateSearchQuery)

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.currentTarget.value

		setValue(e.currentTarget.value)
		search ? setSearchParams({search}) : setSearchParams({})
	}

	const debouncedHandler = (search: string) => {
		dispatch(setSearchQuery(search))
	}

	const debounceOnChange = useDebounce(debouncedHandler, 200)

	useEffect(() => {
		debounceOnChange(value)
	}, [debounceOnChange, value])

	return (
		<input
			className={s.Root}
			type='text'
			value={value}
			onChange={(e) => onChangeHandler(e)}
			placeholder='Search a book'
		/>
	)
}
