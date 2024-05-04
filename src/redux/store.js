import { configureStore } from '@reduxjs/toolkit';
import notes from './sllices/notesSlice'
import { authReducer } from './sllices/auth'


const store = configureStore({
     reducer: {
          notes: notes,
          auth: authReducer},
     middleware: getDefaultMiddleware => getDefaultMiddleware(),
     devTools: process.env.NODE_ENV !== 'production',
})

export default store;