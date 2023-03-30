import {FC} from 'react'
import s from './BookItem.module.css'
import {formateString} from 'src/utils/functions'
import {ShowingButton} from './Buttons/ShowingButton'
import {EditingButton} from './Buttons/EditingButton'

export type BookItemType = {
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
	// full - личная страничка для каждой книги, icon же - то что в каталоге
	// неиспользуемые пропсы не используются только для первого задания
	if (format === 'icon') {
		return (
			<div className={s.Root}>
				<div className={s.img}>
					<img
						src={imgSrc}
						alt=''
					/>
				</div>
				<div className={s.info}>
					<div className={s.title}>{formateString(title)}</div>
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
		<div className={s.Root}>
			<div className={s.img}>
				<img
					src={imgSrc}
					alt=''
				/>
			</div>
			<div className={s.info}>
				<div className={s.title}>{formateString(title)}</div>
				<div className={s.author}>{formateString(author)}</div>
			</div>
		</div>
	)
}
