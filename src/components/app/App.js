
import { Routes, Route } from 'react-router-dom'
import NotesList from '../notesList/NotesList';
import CreateNote from '../createNote/CreateNote';
import Trash from "../trash/Trash";
import Login from "../login/Login";


import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { fetchAuthMe } from '../../redux/sllices/auth';

import './app.scss';

const App = () => {
    
    const dispatch = useDispatch();
    
     useEffect(() => {
        dispatch(fetchAuthMe());
      }, []); 

     

    return (
        <main className="app">
         <h2>Davai rabotay!!! Pes</h2> 
             <Routes> 
                 <Route path="/" element={<Login/>}/> 
                 <Route path="notes" element={<NotesList/>}/> 
                {/* <Route path="/trash" element={<Trash/>}/> */}
                {/* <Route path="*" element={<Login/>} />    */}
             </Routes> 
            
          {/*   <CreateNote/> */}
        </main>
    )
}

export default App;
