import { useEffect, useCallback, useState } from 'react';
import { Navigate } from "react-router-dom";

import NoteItem from '../noteItem/NoteItem';
import SearchPanel from '../searshPanel/SearchPanel';
import { useHttp } from '../../hooks/http.hook';
import Menu from '../menu/Menu';

import { deleteNote } from '../../redux/sllices/notesSlice';
import  { fetchNotes, selectAll, selectById, addNoteInTrash, getTegSearchPanelInput }  from '../../redux/sllices/notesSlice';
import { useSelector, useDispatch} from 'react-redux';
import store from '../../redux/store';
import { selectIsAuth } from '../../redux/sllices/auth';

import './notesList.scss';




const NotesList = () => {
 
    let notes = useSelector(selectAll);
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth);  
    const filtersByDate = useSelector(state => state.notes.dataFromSearchPanelInput)
    const filterByTag = useSelector(state => state.notes.dataFromSearchPanelInputByTag)
    const showSearch = useSelector(state => state.notes.showSearchPanel);
    const [updateList, setUpdateList] = useState(false);
    

    const filtersNotes = () => {
       
        if(filtersByDate.length === 1) {
            //фильтрация по двум датам
             const filteringResultOneDate =  notes.filter(item => {
                return +item.createdAt.slice(0, 10).replaceAll('-', '') === +filtersByDate[0];
            });
            notes =  filteringResultOneDate;
        }

        if(filtersByDate.length === 2) {
           
            //фильтрация по одной дате
            const filteringResultTwo = notes.filter(item => {
                const firstDate = +filtersByDate[0].replaceAll('.', '');
                const secondDate = +filtersByDate[1].replaceAll('.', '');
               
                let itemDate = +item.createdAt.slice(0, 10).replaceAll('-', '');
                
                return itemDate >= firstDate && itemDate <=  secondDate;
            })
            
            notes =  filteringResultTwo; 
        }


        if(filterByTag !== ''){
            //фильтрация по тегу
            const filteringResultByTag = notes.filter(item => {
                return item.tags.includes(filterByTag);
            })

            notes = filteringResultByTag;
        }

    }


    filtersNotes();


    const {request} = useHttp();

    useEffect(() => {
       dispatch(fetchNotes());
       
    }, []);

    
   

    
    const onDeleteNote = useCallback((id) => {

       
        let note = selectById(store.getState(), id)
        
        request(`${process.env.REACT_APP_API_URL}/trash`, 'POST', JSON.stringify(note))
            .then(dispatch(addNoteInTrash(note)))
            .catch(() => console.log('error go trash'))

        request(`${process.env.REACT_APP_API_URL}/notes/${id}`, 'DELETE',)
            .then(dispatch(deleteNote(id)))

        .catch(() => console.log('error delete'))
       // eslint-disable-next-line  
    }, [request]);

   
    const renderListNotes = (arr) => {
        if(arr.lenght === 0){
            return <h4>Нет записей</h4>
        }

        return [...arr].reverse().map((item) => {
            return <NoteItem 
                    key={item._id} 
                    {...item}
                    recoverShow={false}
                    onDeleteNote={() => onDeleteNote(item._id)}
                    />
        });
    }


    const updateListNotes = () => {
        setUpdateList(true); 
        dispatch(getTegSearchPanelInput(''));
    }
    
    
    const notesList = renderListNotes(notes);
    
    if(!window.localStorage.getItem('token') && !isAuth){
        return <Navigate to="/"/>
    }
    
    return (
        <>
            <div className='notes'>
                <Menu/>
                <div className="notes__wrapper">
                    
                    <div className="notes__searchPanel">
                        {showSearch ? <SearchPanel updateListNotes={updateListNotes}/> : null}
                    </div>
                    <div className="notes__list-notes">
                        {notesList.length ? notesList : <div className="notes__list-msg">Ничего не найдено.</div>} 
                    </div>
                        
                </div>
            </div>
           
        </>
    )
}

export default NotesList;