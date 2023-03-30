import s from './StringInput.module.css'
import {useDispatch, useSelector} from 'react-redux'
import {selectStr, setStr} from 'reducers/books'
import {useSearchParams} from 'react-router-dom'
import {useEffect} from 'react'

export const StringInput = () => {
	const str = useSelector(selectStr)
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
		dispatch(setStr(searchParams.get('search') || ''))
	}, [dispatch, searchParams])

	return (
		<input
			className={s.Root}
			type='text'
			value={str}
			onChange={(e) => onChangeHandler(e)}
		/>
	)
}
