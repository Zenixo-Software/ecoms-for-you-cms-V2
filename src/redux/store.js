import createSagaMiddleware from 'redux-saga'
import rootReducer from "./rootReducer"
import {configureStore} from "@reduxjs/toolkit"
import rootSaga from './rootSaga'

// saga middleware
const sagaMiddleware = createSagaMiddleware()

// redux store
const store = configureStore({
    reducer: rootReducer,
    middleware: [sagaMiddleware]
})

// run saga middleware
sagaMiddleware.run(rootSaga)

export default store

