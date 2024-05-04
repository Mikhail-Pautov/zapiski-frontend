import { useState, useEffect } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { useSelector, useDispatch} from 'react-redux';
import {  createNote, hideCreateNote, fetchNotes } from '../../redux/sllices/notesSlice';
import './createNote.scss';


const CreateNote = () => {
    const [textTextarea, setTextTextarea] = useState(''); 
    const [textInput, setTextInput] = useState(''); 
    const [savedNote, setSavedNote] = useState('false');
    const [postStatus, setPostStatus] = useState('Сохранить'); 
    const {request} = useHttp();
    const dispatch = useDispatch();
    const { showCreateNote } = useSelector(state => state.notes);
    

    useEffect(() => {
        if(showCreateNote) return ;
        document.body.style.overflow = "hidden";
        document.addEventListener('keydown', hideWindow)
        return () => {
            document.removeEventListener('keydown', hideWindow)
            document.body.style.overflow = "";
        }
      })
    
   
    const hideWindow = (e) => {
        if(e.key === 'Escape'){
            console.log('loz');
            dispatch(hideCreateNote())
        }
    }


    const saveNote = () => {

        if(textTextarea === ''){
            return;
        }

        let note = {
            text: textTextarea,
            tags: textInput,
        }
        
        console.log('note', note);

        request(`${process.env.REACT_APP_API_URL}/notes/`, 'POST', JSON.stringify(note))
                .then((res) => {
                    dispatch(createNote({...note, _id: res._id})); 
                    setSavedNote(true);
                    dispatch(fetchNotes());
                    setPostStatus('Запись опубликованна!');   
                })
                  
                .catch(() => {
                    console.log('slomal')
                    setPostStatus('Ошибка! Запись не сохранена.')
                }); 
        
        setTextTextarea('');
        setTextInput('');

        setTimeout(() => {
            console.log('setTimeout');
            dispatch(hideCreateNote());
            setPostStatus('Сохранить');
        }, 2000)
    }

    
    let toggleShowCreateNote = showCreateNote ? 'none' : '';
    
    return (
        <div 
            className="createNote" 
            style={{display: `${toggleShowCreateNote}`}}> 
            <div className='createNote__wrapper'>
                <div className="createNote__text">
                    <textarea 
                        id="addNote" 
                        name="addNote" rows="6" cols="17" maxLength="150" spellCheck="false" 
                        placeholder="Введите текст. Максимум 150 символов"
                        value={textTextarea}
                        onChange={(e) => setTextTextarea(e.target.value)}

                    ></textarea>
                    <input
                        id="teg"
                        name="teg"
                        placeholder="Введите одно ключевое слово"
                        maxLength="30"
                        value={textInput}
                        onChange={(e) => setTextInput(e.target.value)}
                    ></input>
                    <div onClick={() => saveNote()}className="createNote__btnSave">{postStatus}</div>
                    <div className="createNote__close" onClick={() => dispatch(hideCreateNote())}>&times;</div>
                </div>
                
            </div>
            
            
        </div>
    )
}


export default CreateNote;






















