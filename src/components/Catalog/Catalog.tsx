import {useEffect} from 'react'
import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'
import {SearchInput} from './SearchInput/SearchInput'
import {fetchBooks, selectSearchQuery} from 'reducers/books'
import {useDispatch, useSelector} from 'react-redux'

export const Catalog = () => {
	const dispatch = useDispatch()
	const query = useSelector(selectSearchQuery)

	useEffect(() => {
		dispatch(fetchBooks(query))
	}, [dispatch, query])

	return (
		<div className={s.Root}>
			<div className={s.content}>
				<SearchInput />
				<AddBookButton />
				<BookItems />
			</div>
		</div>
	)
}
