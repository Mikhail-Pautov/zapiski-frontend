
import NoteItem from '../noteItem/NoteItem';
import SearchPanel from '../searshPanel/SearchPanel';
import { useHttp } from '../../hooks/http.hook';
import { deleteNote } from '../../redux/sllices/notesSlice';
import  { fetchNotes, selectAll, selectById, addNoteInTrash, getTegSearchPanelInput }  from '../../redux/sllices/notesSlice';

import { useSelector, useDispatch} from 'react-redux';
import store from '../../redux/store';

import { useEffect, useCallback, useState } from 'react';
import { selectIsAuth } from '../../redux/sllices/auth';
import { Navigate } from "react-router-dom";

import './notesList.scss';

import Menu from '../menu/Menu';


const NotesList = () => {
 
    //console.log(addNoteInTrash, 'addNoteInTrash');
     
    const dispatch = useDispatch();
    let notes = useSelector(selectAll);
    const isAuth = useSelector(selectIsAuth);  

    //console.log('notes', notes);
    const filtersByDate = useSelector(state => state.notes.dataFromSearchPanelInput)
    const filterByTag = useSelector(state => state.notes.dataFromSearchPanelInputByTag)
    const showSearch = useSelector(state => state.notes.showSearchPanel);
    const [updateList, setUpdateList] = useState(false);
    
   //console.log('In notelist',isAuth);
    
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
               
                console.log(item);
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

        console.log(id);
        let note = selectById(store.getState(), id)
        //dispatch(addNoteInTrash(note))
        request(`${process.env.REACT_APP_API_URL}/trash`, 'POST', JSON.stringify(note))
            .then(dispatch(addNoteInTrash(note)))
            .catch(() => console.log('error go trash'))
//
        request(`${process.env.REACT_APP_API_URL}/notes/${id}`, 'DELETE',)
            .then(dispatch(deleteNote(id)))

        .catch(() => console.log('error delete'))
       // eslint-disable-next-line  
    }, [request]);

    // if(!isAuth) {
    //     console.log('tcnm');
    //     return redirect("/login");
    //     }

    const renderListNotes = (arr) => {
        if(arr.lenght === 0){
            return <h4>Нет записей</h4>
        }

        //console.log(arr);
        return [...arr].reverse().map((item) => {
            
            //console.log(item);
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