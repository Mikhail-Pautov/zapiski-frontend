import { useSelector } from 'react-redux';
import  { createNote, deleteNoteInTrash }  from '../../redux/sllices/notesSlice';
import NoteItem from '../noteItem/NoteItem';
import { useEffect, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchNotesTrash, clearNotesInTrash } from '../../redux/sllices/notesSlice';
import { useHttp } from '../../hooks/http.hook';

import Menu from '../menu/Menu';
import { Notification } from '../notification/Notification'
import { selectIsAuth } from '../../redux/sllices/auth';
import { Navigate } from "react-router-dom";



import './trash.scss';



const Trash = () => {

    const isAuth = useSelector(selectIsAuth);  
    const notesInTrash = useSelector(state => state.notes.trash);
    const {request} = useHttp();
    const dispatch = useDispatch();
    const [ showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        dispatch(fetchNotesTrash());
     }, []);
 

    const getNotesInTradh = useSelector(state => state.notes.trash);
     
    


    const clearTrash = () => {
        getNotesInTradh.forEach(element => {
            request(`${process.env.REACT_APP_API_URL}/trash/${element._id}`, 'DELETE')
                .then(dispatch(clearNotesInTrash()))
                .catch(() => console.log('error go trash'))
        }); 
        
        setShowNotification(false);
    }



    const onRecoverNote = useCallback((id) => {


        
        let note = notesInTrash.filter(item => {
           
            return item._id === id
        }) 

        
        request(`${process.env.REACT_APP_API_URL}/notes`, 'POST', JSON.stringify(...note))
            .then(() => {dispatch(createNote(...note));})
            .catch(() => {console.log('slomal')
            
        }); 

        
        request(`${process.env.REACT_APP_API_URL}/trash/${id}`, 'DELETE',)
            .then(dispatch(deleteNoteInTrash(id)))
            .catch(() => console.log('error delete'));
            // eslint-disable-next-line  

    }, [request]);

    

    const renderListNotesTrash = (arr) => {
        
        if(arr.lenght === 0){
            return <h4>Нет записей</h4>
        }

        
        return arr.map((item) => {
            
            return <NoteItem 
                    key={item._id} 
                    {...item}
                    recoverShow={true}
                    onRecoverNote={() => onRecoverNote(item._id)}
                    />
        });
    }


    const notesList = renderListNotesTrash(getNotesInTradh);
    const notification = showNotification ? <Notification  msg="Удалить записи безвозвратно?" clickOnYes={clearTrash} setShowNotification={setShowNotification}/> : null;

    
    if(!window.localStorage.getItem('token') && !isAuth){
        return <Navigate to="/"/>
    }
    
    return (

        <>
            {notification}
            <div className="trash">
                    <Menu/>
                <div className="trash__wrapper">
                    <div className='trash__wrapper-top'>
                        <div className="trash__title">Корзина</div> 
                        {notesList.length === 0 ? <div className="trash__title" style={{border: 'none'}}>Нет записей</div> : <div className="trash__btn" onClick={() => {setShowNotification(true) 
                        document.body.style.overflow = "hidden"}}>Очистить корзину</div>}
                    </div>

                    <div className="trash__wrapper-content">
                        {notesList}
                    </div>

                </div> 

                
            </div>
        </>
        
    )
}

// const Notification = ({clearTrash, setShowNotification}) => {
//     return (
//         <div className='notification'>
//             <div className='notification__wrapper'>
//                 <div className='notification__text'>Удалить записи безвозвратно?</div>
//                 <div className='notification__wrapper-btn'>
//                     <div className='notification__btn' onClick={() => clearTrash()}>Да</div>
//                     <div className='notification__btn' onClick={() => setShowNotification(false)}>Нет</div>
//                 </div>
//             </div>
//         </div>
//     )
// }
export default Trash;























