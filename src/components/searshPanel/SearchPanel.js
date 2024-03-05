import './searchPanel.scss';
import { useState } from 'react'; 
import  {  selectAll, getDataSearchPanelInput, getTegSearchPanelInput }  from '../../redux/sllices/notesSlice';
import { useSelector, useDispatch} from 'react-redux';


const SearchPanel = () => {

    
    const [showInputDate, setShowInputDate] = useState('none');
    const [showInputTag, setShowInputTag] = useState('none');
    const [showAllTags, setShowAllTags] = useState(false);

    const [dataInputTag, setDataInputTag] = useState('');
    const [InputDate_1, setInputDate_1] = useState('');
    const [InputDate_2, setInputDate_2] = useState('');
    
    const dispatch = useDispatch();

    let notes = useSelector(selectAll);

    let arrAllTags = [];
    
    notes.forEach(item => {
        if(item.tags.trim().length === 0 ){
            return
        }
        arrAllTags.push(item.tags);
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

        console.log('dateArr', dateArr);
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
        
                    <div className='search-panel__show-tags' onClick={() => setShowAllTags(true)}>
                    <svg  viewBox="0 0 34 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M32 2L17 22L2 2"  strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
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

    console.log('Мы тут', arrAllTags);
    const  Tag = (props) => {
        console.log(props.text);
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










