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


//const a = store.getState();
//console.log(a.notes);


export default store;