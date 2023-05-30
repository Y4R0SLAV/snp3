import {FC, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import {useDispatch, useSelector} from 'react-redux'
import {
	selectCurrentPage,
	selectPageSize,
	selectTotalBooksCount,
	setCurrentPage,
} from 'reducers/app'
import classNames from 'classnames/bind'

import s from './Paginator.module.css'

const PrevBlock: FC<{prev: number; firstUrl: string; url: string; show: boolean}> = ({
	prev,
	firstUrl,
	url,
	show,
}) => {
	const cn = classNames.bind(s)
	return (
		<div className={cn({linkBlock: true, hide: !show})}>
			<Link to={firstUrl}>{'« First'}</Link>
			<Link to={prev === 1 ? firstUrl : url + prev}>{' ‹ Prev'}</Link>
		</div>
	)
}

const NextBlock: FC<{next: number; last: number; url: string; show: boolean}> = ({
	next,
	last,
	url,
	show,
}) => {
	const cn = classNames.bind(s)
	return (
		<div className={cn({linkBlock: true, hide: !show})}>
			<Link to={url + next}>{'Next ›'}</Link>
			<Link to={url + last}>{' Last »'}</Link>
		</div>
	)
}

export const NavPaginator = () => {
	const dispatch = useDispatch()

	const params = useParams()
	const pageString = params.pageNum || 1
	const pageNum = +pageString

	const totalBooksCount = useSelector(selectTotalBooksCount)
	const bookPerPage = useSelector(selectPageSize)
	const totalPage = Math.ceil(totalBooksCount / bookPerPage)

	const url = '/page/'
	const firstUrl = '..'

	useEffect(() => {
		dispatch(setCurrentPage(+pageNum))
	}, [pageNum, dispatch])

	const pageNums = []

	// инициализация массива кнопок-страниц
	for (let i = -4; i < 5; i++) {
		let num = pageNum + i
		if (num >= 1 && num <= totalPage) {
			pageNums.push(num)
		}
	}

	const min = pageNums[0]
	const max = pageNums[pageNums.length - 1]

	const cn = classNames.bind(s)
	return (
		<div className={s.Root}>
			<PrevBlock
				prev={pageNum - 1}
				firstUrl={firstUrl}
				url={url}
				show={pageNum > 1}
			/>
			{min > 1 && '...'}

			<div className={s.pages}>
				{pageNums.map((i) => (
					<Link
						to={i === 1 ? firstUrl : url + i}
						key={i}
						className={cn({active: i === pageNum})}
					>
						{i}
					</Link>
				))}
			</div>

			{max < totalPage && '...'}
			<NextBlock
				next={pageNum + 1}
				last={totalPage}
				url={url}
				show={pageNum < totalPage}
			/>
		</div>
	)
}
