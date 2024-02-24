
import { Routes, Route } from 'react-router-dom'
import Menu from '../menu/Menu';
import Container from "@mui/material/Container";
import NotesList from '../notesList/NotesList';
import CreateNote from '../createNote/CreateNote';
import Trash from "../trash/Trash";
import Login from "../login/Login";

import SearchPanel from "../searshPanel/SearchPanel"
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuthMe, selectIsAuth } from '../../redux/sllices/auth';
import { Navigate } from "react-router-dom";
import './app.scss';

const App = () => {
    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchAuthMe());
      }, []);

     

    return (
        <main className="app">
           
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="notes" element={<NotesList/>}/>
                <Route path="/trash" element={<Trash/>}/>
                <Route path="*" element={<Login/>} />   
            </Routes>
            
            <CreateNote/>
        </main>
    )
}

export default App;