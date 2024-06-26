import './notification.scss';


export const Notification = (props) => {
    const {msg, setShowNotification,  clickOnYes} = props
    return (
        <div className='notification'>
            <div className='notification__wrapper'>
                <div className='notification__text'>{msg}</div>
                <div className='notification__wrapper-btn'>
                   
                    <div className='notification__btn' onClick={() => {
                        clickOnYes()
                        document.body.style.overflow = ""}}>Да</div>
                    <div className='notification__btn' onClick={() => {
                        setShowNotification(false)
                        document.body.style.overflow = ""}}>Нет</div>
                </div>
            </div>
        </div>
    )
}