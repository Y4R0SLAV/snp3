import {configureStore} from '@reduxjs/toolkit'
import booksReducer from './reducers/books'
import createSagaMiddleware from 'redux-saga'
import {bookWatcher} from './saga/booksSaga'

const saga = createSagaMiddleware()

export const store = configureStore({
	reducer: {
		books: booksReducer,
	},
	middleware: [saga],
})

saga.run(bookWatcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
