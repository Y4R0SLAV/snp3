import axios from 'axios'
import {BookItemType} from 'src/components/Catalog/BookItems/BookItem/BookItem'

const instance = axios.create({
	baseURL: `https://json-server-two-gilt.vercel.app/books`,
})

export const bookApi = {
	async getBooks(query?: string) {
		return instance.get<BookItemType[]>(`?q=${query}`).then((response) => {
			return response.data
		})
	},
	async getBook(id: string) {
		return instance.get<BookItemType>(`/${id}`).then((response) => {
			return response.data
		})
	},
	async getTotalBooksCount() {
		return instance.get<BookItemType[]>('').then((response) => {
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
