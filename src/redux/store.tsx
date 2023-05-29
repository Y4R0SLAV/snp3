import {configureStore} from '@reduxjs/toolkit'
import booksReducer from './reducers/books'
import appReducer from './reducers/app'
import createSagaMiddleware from 'redux-saga'
import {bookWatcher} from './saga/booksSaga'

const saga = createSagaMiddleware()

export const store = configureStore({
	reducer: {
		books: booksReducer,
		app: appReducer,
	},
	middleware: [saga],
})

saga.run(bookWatcher)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
