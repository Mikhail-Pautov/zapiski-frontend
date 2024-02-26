import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios';



export const fetchAuth = createAsyncThunk('auth/fetchUserData', async (params) => {
    
    const { data } = await axios.post('/login', params);
    return data;
});


export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});



export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async (params) => {
    const { data } = await axios.get('/me');
    //console.log( data );
    return data;
});





const initialState = {
    data: null,
    
    status: 'loading',
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log('logout');
            state.data = null;
        }
    },
     extraReducers: (builder) => {
        builder
            .addCase(fetchAuth.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuth.fulfilled, (state, actions) => {
                state.status = 'loaded';
                state.data = actions.payload;
            })
            .addCase(fetchAuth.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, actions) => {
                state.status = 'loaded';
                //console.log( actions.payload);
                state.data = actions.payload;
            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'error';
                state.data = null;
            })
            .addCase(fetchRegister.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchRegister.fulfilled, (state, actions) => {
                state.status = 'loaded';
                state.data = actions.payload;

            })
            .addCase(fetchRegister.rejected, (state) => {
                state.status = 'error';
                state.data = null;
        })
    } 
});


export const selectIsAuth = state => Boolean(state.auth.data);



export const authReducer = authSlice.reducer;


export const { logout } = authSlice.actions;

