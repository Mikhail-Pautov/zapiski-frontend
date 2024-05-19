import { useState, useEffect } from 'react'; 
import { useSelector, useDispatch} from 'react-redux';

import  {  selectAll, getDataSearchPanelInput, getTegSearchPanelInput }  from '../../redux/sllices/notesSlice';

import './searchPanel.scss';

const SearchPanel = () => {

    const [showInputDate, setShowInputDate] = useState('none');
    const [showInputTag, setShowInputTag] = useState('none');
    const [showAllTags, setShowAllTags] = useState(false);
    const [dataInputTag, setDataInputTag] = useState('');
    const [InputDate_1, setInputDate_1] = useState('');
    const [InputDate_2, setInputDate_2] = useState('');
    const dispatch = useDispatch();
    let notes = useSelector(selectAll);
    let allTags = [];
    

    notes.forEach(item => {
        if(item.tags.trim().length === 0 ){
            return
        }

        allTags.push(item.tags.toLowerCase());
        
    });
    

    const getСhoiceTag = (tag) => {
        setDataInputTag(tag)
    }
    
    const showInput = (e) => {
        if(e.target.textContent === "по дате"){
            setShowInputDate('');
            setShowInputTag('none');
        }

        if(e.target.textContent === "по тегу"){
            setShowInputTag('');
            setShowInputDate('none');
        }
    }


    const setDate = () => {

        let date_1 = InputDate_1.replaceAll('-', '');
        let date_2 = InputDate_2.replaceAll('-', '');
        
        if(date_1 === '' && date_2 === ''){
            return
        }

        let arr = +date_1 > +date_2 ? [date_2, date_1] : [date_1, date_2];
        let dateArr = arr.filter(item => item !== '');

        dispatch(getDataSearchPanelInput(dateArr));
    }

    const setTeg = () => {
        if(dataInputTag.trim() === ''){ 
            return;
        }
        
        dispatch(getTegSearchPanelInput(dataInputTag.trim().toLowerCase()));

        setDataInputTag('');
    }

    const filterWeek = () => {
        const toDay = new Date();
        const days = 7 * (24 * 60 * 60 * 1000);
        const forOneWeekStart = new Date(toDay.getTime() - days).toLocaleDateString().split('.').reverse().toString().replaceAll(',', '');
        const forOneWeekAnd = new Date().toLocaleDateString().split('.').reverse().toString().replaceAll(',', '');
       
        dispatch(getDataSearchPanelInput([forOneWeekStart, forOneWeekAnd]));
    }


    const updateListNotes = () => {
        setDataInputTag('');
        setInputDate_1('');
        setInputDate_2('');       
        dispatch(getTegSearchPanelInput(''));
        dispatch(getDataSearchPanelInput([]));
    }
   

    

    let arrAllTags = Array.from(new Set(allTags));

    
    return (
        <div className='search-panel'>
                <div className='search-panel__text'>Поиск: </div>
                
                <div className='search-panel__item' onClick={() => 
                    {setShowInputTag('none'); 
                    setShowInputDate('none');
                    filterWeek();}}> за неделю</div>
                <div className='search-panel__item' onClick={(e) => showInput(e)}>по дате</div>
                <div className='search-panel__item'onClick={(e) => showInput(e)}>по тегу</div>
                
                {/* инпут с датама*/}
                <div className='search-panel__date' style={{display: `${showInputDate}`}}>
                    
                        <input
                            type="date"
                            id="date" 
                            required
                            value={InputDate_1}
                            onChange={(e) => setInputDate_1(e.target.value)}
                        ></input>
                        <input
                            type="date"
                            id="date" 
                            required
                            value={InputDate_2}
                            onChange={(e) => setInputDate_2(e.target.value)}
                        ></input>

                        <div className='search-panel__btn' onClick={() => setDate()}>Найти</div>
                    
                   
                </div>

                <div className='search-panel__teg' style={{display: `${showInputTag}`}}>
                    <input
                        type="text"
                        name="text"
                        value={dataInputTag}
                        onChange={(e) => setDataInputTag(e.target.value)}
                    ></input>
        
                    <div className='search-panel__show-tags' onClick={() => setShowAllTags(!showAllTags)}>
                   {/*  tyt svg */}
                  
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.70711 9.71069C5.31658 10.1012 5.31658 10.7344 5.70711 11.1249L10.5993 16.0123C11.3805 16.7927 12.6463 16.7924 13.4271 16.0117L18.3174 11.1213C18.708 10.7308 18.708 10.0976 18.3174 9.70708C17.9269 9.31655 17.2937 9.31655 16.9032 9.70708L12.7176 13.8927C12.3271 14.2833 11.6939 14.2832 11.3034 13.8927L7.12132 9.71069C6.7308 9.32016 6.09763 9.32016 5.70711 9.71069Z" fill="#CACACA" stroke="#CACACA" strokeWidth="1"/>
</svg>
                        {showAllTags?  <ShowAllTags arrAllTags={arrAllTags} getСhoiceTag={getСhoiceTag}/> : null}
                    </div>
                    <div className='search-panel__btn' onClick={() => {
                        setTeg();
                        setShowAllTags(false);
                        }}>Найти</div>
                </div>
                
               
                <div className='search-panel__clear-result'onClick={() => updateListNotes()}>Обновить</div>
        </div>
        
    )
}


const ShowAllTags = ({arrAllTags, getСhoiceTag}) => {

    
    const  Tag = (props) => {
        
        return <li>{props.text}</li>;
    }

    return (
        <div className='allTags'>
            <div className='allTags__title'>Все теги:</div>
            <ul className='allTags__list' onClick={(e) => getСhoiceTag(e.target.innerText)}>
                {arrAllTags.map((tag, id) => <Tag key={id} text={tag} />)}
            </ul>
        </div>
    )
}

export default SearchPanel;










