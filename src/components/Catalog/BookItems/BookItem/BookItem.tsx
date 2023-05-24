import {FC} from 'react'
import s from './BookItem.module.css'
import {formateString} from 'src/utils/functions'
import {ShowingButton} from './Buttons/ShowingButton'
import {EditingButton} from './Buttons/EditingButton'

import {Link} from 'react-router-dom'

export interface BookItemType {
	id: number
	title: string
	author: string
	imgSrc: string
	ISBN: string
	publishYear: number
	publisher: string
	description: string
}

export const BookItem: FC<BookItemType & {format: 'icon' | 'full'}> = ({
	id,
	title,
	author,
	imgSrc,
	ISBN,
	publishYear,
	publisher,
	description,
	format,
}) => {
	const toPage = `/items/${id}`
	// full - личная страничка для каждой книги, icon для того, что отображается в каталоге
	if (format === 'icon') {
		return (
			<div className={s.Root}>
				<div className={s.img}>
					<Link to={toPage}>
						<img
							src={imgSrc}
							alt=''
						/>
					</Link>
				</div>
				<div className={s.info}>
					<div className={s.title}>
						<Link to={toPage}>{formateString(title)}</Link>
					</div>
					<div className={s.author}>{formateString(author)}</div>
				</div>

				<div className={s.btns}>
					<ShowingButton id={id} />
					<EditingButton id={id} />
				</div>
			</div>
		)
	}

	return (
		<div className={s.full}>
			<div className={s.firstRow}>
				<div className={s.img}>
					<img
						src={imgSrc}
						alt=''
					/>
				</div>
				<div className={s.info}>
					<div className={s.title}>{title}</div>
					<div className={s.author}>{author}</div>
					<div className={s.ISBN}>ISBN: {ISBN}</div>
					<div className={s.publishYear}>Publish Date: {publishYear}</div>
					<div className={s.publisher}>Publisher: {publisher}</div>
				</div>
			</div>

			<div className={s.secondRow}>
				<div className={s.description}>{description}</div>
			</div>
		</div>
	)
}
