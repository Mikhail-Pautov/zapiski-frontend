import { createSlice, createAsyncThunk, createEntityAdapter, } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';


const notesAdapter = createEntityAdapter({
    selectId: (notes) => notes._id,
});


const initialState = notesAdapter.getInitialState({
    showCreateNote: true,
    showSearchPanel: false,
    trash: [],
    dataFromSearchPanelInput: [],
    dataFromSearchPanelInputByTag: ''
});



export const fetchNotes = createAsyncThunk(
	'notes/fetchNotes',
	() => {
		const {request} = useHttp();
		//return request("http://localhost:3001/notes");
        //console.log('вызов');
		console.log(`${process.env.REACT_APP_API_URL}notes/`);
        return request(`${process.env.REACT_APP_API_URL}/notes/`);
        //return request(`https://zapiski-backend-mikhail-789.amvera.io/notes/`);
	}
);

export const fetchNotesTrash = createAsyncThunk(
    'notes/fetchNotesTrash',
    () => {
		const {request} = useHttp();
		return request(`${process.env.REACT_APP_API_URL}/trash`); 
	}
)

const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        deleteNote: (state, action) => {
            notesAdapter.removeOne(state, action.payload);
        },
        deleteNoteInTrash: (state, action) => {
            
            let newArr = state.trash.filter(item => {
                return item._id !== action.payload;
            })
            state.trash = newArr;
        },
        clearNotesInTrash: (state) => {
            state.trash = [];
        },
        addNoteInTrash: (state, action) => {
            state.trash.push(action.payload);
        },
        createNote: (state, action) => { 
            console.log('action.payload', action.payload);
            notesAdapter.addOne(state, action.payload);
        },
        hideCreateNote: state => {
            
            state.showCreateNote = !state.showCreateNote;
        },
        hideSearhPanel: state => {
            state.showSearchPanel = !state.showSearchPanel
        },
        getDataSearchPanelInput: (state, action) => {
            state.dataFromSearchPanelInput = action.payload;
           
        },
        getTegSearchPanelInput: (state, action) => {
            state.dataFromSearchPanelInputByTag = action.payload
        },
        
    },
    extraReducers: (builder) => {
		builder
            //получаем записи
			.addCase(fetchNotes.pending, () => console.log('получаем'))
            .addCase(fetchNotes.fulfilled, (state, action) => {
                notesAdapter.setAll(state, action.payload);
            })
            .addCase(fetchNotes.rejected, () => console.log('чет сломалось'))
            //получаем корзину
            .addCase(fetchNotesTrash.pending, () => console.log('получаем из корзины'))
            .addCase(fetchNotesTrash.fulfilled, (state, action) => {
                state.trash = action.payload;
            })
            .addCase(fetchNotesTrash.rejected, () => console.log('чет сломалось при получении из корзины'))
			.addDefaultCase(() => {})
	}
    
})



const {reducer, actions} = notesSlice;



export default reducer;


export const {selectAll, selectById} = notesAdapter.getSelectors(state => state.notes);

//console.log();

export const { 
    notesShow, 
    deleteNote, 
    createNote, 
    hideCreateNote, 
    addNoteInTrash, 
    clearNotesInTrash, 
    hideSearhPanel,
    getDataSearchPanelInput,
    getTegSearchPanelInput,
    filterinfNotes,
    deleteNoteInTrash} = actions;
























