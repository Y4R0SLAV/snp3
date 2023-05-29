import {useEffect} from 'react'
import {AddBookButton} from './AddBookButton/AddBookButton'
import {BookItems} from './BookItems/BookItems'
import s from './Catalog.module.css'
import {SearchInput} from './SearchInput/SearchInput'
import {fetchBooks} from 'reducers/books'
import {selectSearchQuery, selectCurrentPage, selectPageSize} from 'reducers/app'
import {useDispatch, useSelector} from 'react-redux'
import {NavPaginator} from './../common/Pagination/Paginator'

export const Catalog: React.FC<{showButtons: boolean}> = ({showButtons}) => {
	const dispatch = useDispatch()
	const query = useSelector(selectSearchQuery)
	const page = useSelector(selectCurrentPage)
	const pageSize = useSelector(selectPageSize)

	useEffect(() => {
		dispatch(fetchBooks({query, page, pageSize}))
	}, [dispatch, query, page, pageSize])

	return (
		<div className={s.Root}>
			<div className={s.content}>
				{showButtons && (
					<div className={s.head}>
						<SearchInput />
						<AddBookButton />
					</div>
				)}
				<BookItems />
				<NavPaginator />
			</div>
		</div>
	)
}
