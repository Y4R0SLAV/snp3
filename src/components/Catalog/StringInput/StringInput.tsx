import s from './StringInput.module.css'
import {useDispatch} from 'react-redux'
import {useSearchParams} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {useDebounce} from 'src/hooks/useDebounce'
import {setStr} from 'reducers/books'

export const StringInput = () => {
	const dispatch = useDispatch()

	const [searchParams, setSearchParams] = useSearchParams()
	const [value, setValue] = useState(searchParams.get('search') || '')

	const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const search = e.currentTarget.value
		setValue(e.currentTarget.value)

		if (search) {
			setSearchParams({search})
		} else {
			setSearchParams({})
		}
	}

	const debouncedHandler = (search: string) => {
		dispatch(setStr(search))
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
