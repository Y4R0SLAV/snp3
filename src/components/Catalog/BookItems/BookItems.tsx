import {BookItem, BookItemType} from './BookItem/BookItem'
import s from './BookItems.module.css'

export const BookItems = () => {
	const books: Array<BookItemType> = [
		{
			id: 1,
			ISBN: '9781526363237',
			title: 'World Full Of Wildlife',
			author: 'Layton Neal',
			description: 'h21r356214gyiu21hk4hb1igg4n yu14gyu12 b412u uyb412gn4',
			imgSrc:
				'https://cdn.shopify.com/s/files/1/0410/9529/9228/products/9781526363237_1024x1024@2x.jpg?v=1678693485',
			publisher: 'WREN & ROOK',
			publishYear: 2021,
		},
		{
			id: 2,
			ISBN: '9785170430529',
			title: `Brat'ya Karamazovy`,
			author: 'Fyodor Dostoevsky',
			description:
				'The Brothers Karamazov is a murder mystery, a courtroom drama, and an exploration of erotic rivalry in a series of triangular love affairs involving the “wicked and sentimental” Fyodor Pavlovich Karamazov and his three sons―the impulsive and sensual Dmitri; the coldly rational Ivan; and the healthy, red-cheeked young novice Alyosha. Through the gripping events of their story, Dostoevsky portrays the whole of Russian life, is social and spiritual striving, in what was both the golden age and a tragic turning point in Russian culture.',
			imgSrc: 'https://cv2.litres.ru/pub/c/cover_max1500/67645625.jpg',
			publisher: 'The Russian Messenger',
			publishYear: 1780,
		},
	]
	return (
		<div className={s.Root}>
			{books.map((book) => {
				return (
					<BookItem
						title={book.title}
						id={book.id}
						ISBN={book.ISBN}
						author={book.author}
						description={book.description}
						imgSrc={book.imgSrc}
						publishYear={book.publishYear}
						publisher={book.publisher}
						format='icon'
					/>
				)
			})}
		</div>
	)
}
