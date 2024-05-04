import { hideCreateNote, hideSearhPanel, getTegSearchPanelInput, getDataSearchPanelInput } from "../../redux/sllices/notesSlice"
import { useSelector, useDispatch} from 'react-redux';
import { useState } from 'react';
import { Link } from "react-router-dom";

import { Notification } from '../notification/Notification'
import { logout } from '../../redux/sllices/auth'



import './menu.scss';

const Menu = () => {
    
    const dispatch = useDispatch();
    const checkShowSearch = useSelector(state => state.notes.showSearchPanel);
    const [ showNotification, setShowNotification] = useState(false);
    

    dispatch(logout);


    const createNote = () => {
        dispatch(hideCreateNote());
    } 
 

    const updateList = () => {
        dispatch(getTegSearchPanelInput(''));
        dispatch(getDataSearchPanelInput([]));
    }


    const checkShowSearchPanel = () => {
        if(checkShowSearch){
            dispatch(hideSearhPanel())
        } else {
            return
        }
    }


    const onExit = () => {
        dispatch(logout());
        window.localStorage.removeItem('token');
    }


    const notification = showNotification ? <Notification msg="Уверены что хотите выйти?" clickOnYes={onExit}  setShowNotification={setShowNotification}/> : null;

    
    return(
        <>
            {notification}
            <div className="menu">
            <Link to="/notes">
                <div className="menu__home" onClick={() => {checkShowSearchPanel(); updateList()}}>
                    <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M28.6667 12.2859V28.9526C28.6667 30.7936 27.1743 32.2859 25.3333 32.2859H8.66667C6.82572 32.2859 5.33333 30.7936 5.33333 28.9526V12.2859M22 32.2859V23.9526C22 22.1116 20.5077 20.6193 18.6667 20.6193H15.3333C13.4924 20.6193 12 22.1116 12 23.9526V32.2859M32 15.6193L19.357 2.97631C18.0553 1.67456 15.9447 1.67456 14.643 2.97631L2 15.6193" stroke="#CACACA" strokeWidth="3" />
                    </svg>
                </div>
            </Link>
            
            <div className="menu__plus" onClick={() => createNote()}>
               <svg  viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.569 12.931V13.431H17.069H27.931C28.7928 13.431 29.5 14.1382 29.5 15C29.5 15.8618 28.7928 16.569 27.931 16.569H17.069H16.569V17.069V27.931C16.569 28.7928 15.8618 29.5 15 29.5C14.1382 29.5 13.431 28.7928 13.431 27.931V17.069V16.569H12.931H2.06897C1.20718 16.569 0.5 15.8618 0.5 15C0.5 14.1382 1.20718 13.431 2.06897 13.431H12.931H13.431V12.931V2.06897C13.431 1.20718 14.1382 0.5 15 0.5C15.8618 0.5 16.569 1.20718 16.569 2.06897V12.931Z" fill="#CACACA" stroke="#CACACA"/>
                
                </svg>   
            </div>

            <div className='menu__search' onClick={() => dispatch(hideSearhPanel())}> 
                <svg  viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="path-1-outside-1_111_108" maskUnits="userSpaceOnUse" x="0" y="0" width="34" height="34" fill="black">
                <rect fill="white" width="34" height="34"/>
                <path d="M24.3896 24.4216L32 31.9992ZM15.1247 7.62486C19.2666 7.62486 22.6245 10.9826 22.6245 15.1247ZM28.2493 15.1247C28.2493 7.87612 22.3732 2 15.1247 2C7.87612 2 2 7.87612 2 15.1247C2 22.3732 7.87612 28.2493 15.1247 28.2493C22.3732 28.2493 28.2493 22.3732 28.2493 15.1247Z"/>
                </mask>
                <path d="M25.4479 23.3587C24.8609 22.7742 23.9111 22.7762 23.3266 23.3633C22.7421 23.9503 22.7441 24.9001 23.3312 25.4846L25.4479 23.3587ZM30.9416 33.0622C31.5287 33.6467 32.4784 33.6447 33.0629 33.0576C33.6475 32.4706 33.6454 31.5208 33.0584 30.9363L30.9416 33.0622ZM15.1247 6.12486C14.2962 6.12486 13.6247 6.79643 13.6247 7.62486C13.6247 8.45329 14.2962 9.12486 15.1247 9.12486V6.12486ZM21.1245 15.1247C21.1245 15.9531 21.7961 16.6247 22.6245 16.6247C23.4529 16.6247 24.1245 15.9531 24.1245 15.1247H21.1245ZM23.3312 25.4846L30.9416 33.0622L33.0584 30.9363L25.4479 23.3587L23.3312 25.4846ZM15.1247 9.12486C18.4382 9.12486 21.1245 11.8111 21.1245 15.1247H24.1245C24.1245 10.1542 20.095 6.12486 15.1247 6.12486V9.12486ZM29.7493 15.1247C29.7493 7.0477 23.2017 0.5 15.1247 0.5V3.5C21.5448 3.5 26.7493 8.70455 26.7493 15.1247H29.7493ZM15.1247 0.5C7.04769 0.5 0.5 7.04769 0.5 15.1247H3.5C3.5 8.70455 8.70455 3.5 15.1247 3.5V0.5ZM0.5 15.1247C0.5 23.2017 7.0477 29.7493 15.1247 29.7493V26.7493C8.70455 26.7493 3.5 21.5448 3.5 15.1247H0.5ZM15.1247 29.7493C23.2017 29.7493 29.7493 23.2017 29.7493 15.1247H26.7493C26.7493 21.5448 21.5448 26.7493 15.1247 26.7493V29.7493Z" fill="#CACACA" mask="url(#path-1-outside-1_111_108)"/>
                </svg>
            </div>

            <Link  to="/trash" >
                <div className='menu__trash'>
                    <svg  viewBox="0 0 30 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.73077 11.9615H11.0385V29.4231H9.73077V11.9615Z" fill="#CACACA" stroke="#CACACA"/>
                    <path d="M14.3462 11.9615H15.6539V29.4231H14.3462V11.9615Z" fill="#CACACA" stroke="#CACACA"/>
                    <path d="M18.9615 11.9615H20.2692V29.4231H18.9615V11.9615Z" fill="#CACACA" stroke="#CACACA"/>
                    <path d="M0.5 5.03845H29.5V6.34614H0.5V5.03845Z" fill="#CACACA" stroke="#CACACA"/>
                    <path d="M20.1923 5.1923H19.0385V3.38461C19.0385 2.41615 18.2761 1.65385 17.3077 1.65385H12.6923C11.7239 1.65385 10.9615 2.41615 10.9615 3.38461V5.1923H9.80769V3.38461C9.80769 1.8146 11.1223 0.5 12.6923 0.5H17.3077C18.8777 0.5 20.1923 1.8146 20.1923 3.38461V5.1923Z" fill="#CACACA" stroke="#CACACA"/>
                    <path d="M6.27074 33.3465L6.27138 33.3547L6.27229 33.3629C6.37599 34.2962 7.19462 35.0385 8.07692 35.0385H21.9231C22.4171 35.0385 22.8638 34.8208 23.1828 34.5145C23.4944 34.2154 23.7237 33.7926 23.7306 33.3292L25.8448 6.14717L27.1546 6.23449L25.0401 33.4217C24.9069 35.0865 23.507 36.3461 21.9231 36.3461H8.07692C6.5014 36.3461 5.0937 35.018 4.95993 33.4213C4.95989 33.4209 4.95985 33.4205 4.95981 33.42L2.84539 6.23449L4.15524 6.14717L6.27074 33.3465Z" fill="#CACACA" stroke="#CACACA"/>
                    </svg>
                </div>
            </Link>
           
            <div className='menu__exit' onClick={() => {
                setShowNotification(true)
                document.body.style.overflow = "hidden"}}>
                <svg  viewBox="0 8 62 62" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.9803 41.9L25.9661 49.7409C25.9648 50.4313 26.5236 50.9919 27.2138 50.9932L49.7138 51.0339C50.4041 51.0351 50.9648 50.4765 50.9661 49.7861L51.0339 12.2862C51.0351 11.5959 50.4765 11.0352 49.7861 11.0339L27.2862 10.9932C26.5959 10.992 26.0352 11.5507 26.0339 12.241L26.0197 20.082" stroke="#CACACA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M36 31.009L8.50003 30.9593M8.50003 30.9593L15.9832 39.7229M8.50003 30.9593L16.0158 22.2229" stroke="#CACACA" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            
            
            
        </div>
        </>
       
    )
}

export default Menu;