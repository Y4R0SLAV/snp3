import {Link} from 'react-router-dom'
import s from './Paginator.module.css'

const PrevBlock: React.FC<{prev: number; first: number; url: string}> = ({prev, first, url}) => {
	return (
		<div className={s.linkBlock}>
			<Link to={url + first}>{'« First'}</Link>
			<Link to={url + prev}>{' ‹ Prev'}</Link>
		</div>
	)
}

const NextBlock: React.FC<{next: number; last: number; url: string}> = ({next, last, url}) => {
	return (
		<div className={s.linkBlock}>
			<Link to={url + next}>{'Next ›'}</Link>
			<Link to={url + last}>{' Last »'}</Link>
		</div>
	)
}

export const NavPaginator = () => {
	const currentPage = 2
	const totalPage = 10

	const pageNums = []
	const url = '?search='
	for (let i = -4; i < 5; i++) {
		let num = currentPage + i
		if (num >= 1 && num <= totalPage) {
			pageNums.push(num)
		}
	}

	const min = pageNums[0]
	const max = pageNums[pageNums.length - 1]

	return (
		<div className={s.Root}>
			{currentPage > 1 && (
				<PrevBlock
					prev={currentPage - 1}
					first={1}
					url={url}
				/>
			)}
			{min > 1 && '...'}

			{pageNums.map((i) => (
				<Link to={url + i}> {i} </Link>
			))}

			{max < totalPage && '...'}
			{currentPage < totalPage && (
				<NextBlock
					next={currentPage + 1}
					last={totalPage}
					url={url}
				/>
			)}
		</div>
	)
}
