import axios from 'axios'
import {BookItemType} from 'src/components/Catalog/BookItems/BookItem/BookItem'

const instance = axios.create({
	baseURL: `https://json-server-two-gilt.vercel.app/books`,
})

export const bookApi = {
	async getBooks(payload: {query: string; page: number; pageSize: number}) {
		return instance
			.get<BookItemType[]>(`?q=${payload.query}&_page=${payload.page}&_limit=${payload.pageSize}`)
			.then((response) => {
				return response.data
			})
	},
	async getBook(id: string) {
		return instance.get<BookItemType>(`/${id}`).then((response) => {
			return response.data
		})
	},
	async getTotalBooksCount(query: string) {
		return instance.get<BookItemType[]>(`?q=${query}`).then((response) => {
			return response.data.length
		})
	},
	async addBook(book: BookItemType) {
		return instance.post('', book)
	},
	async editBook(book: BookItemType) {
		return instance.put('/' + book.id, book)
	},
	async removeBook(id: string) {
		return instance.delete('/' + id)
	},
}
