import axios from 'axios'
import {BookItemType} from 'reducers/books'

const instance = axios.create({
	baseURL: `https://json-server-two-gilt.vercel.app/books`,
})

export const bookApi = {
	async getBooks() {
		return instance.get<BookItemType[]>('').then((response) => response.data)
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
