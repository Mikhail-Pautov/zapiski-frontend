import './noteItem.scss';

const NoteItem = ({id, text, tags, onDeleteNote, onRecoverNote, recoverShow}) => {

    return (
        <div className="note-item">
            <div className="note-item__text"><p> {text}</p>
            </div>
            
            <div className="note-item__botom">
                <div className='note-item__teg'>#{tags}</div>
                {recoverShow ? <div className='note-item__recover-note' onClick={onRecoverNote}>Восстановить</div> :
                <div className="note-item__trash" onClick={onDeleteNote}>
                    <svg  viewBox="0 0 25 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.19232 10.0513H9.1154V24.4359H8.19232V10.0513Z" />
                    <path d="M12.0385 10.0513H12.9615V24.4359H12.0385V10.0513Z" />
                    <path d="M15.8846 10.0513H16.8077V24.4359H15.8846V10.0513Z" />
                    <path d="M0.5 4.28204H24.5V5.20512H0.5V4.28204Z" />
                    <path d="M16.7436 4.24359H15.9487V2.82051C15.9487 1.96744 15.2761 1.29487 14.4231 1.29487H10.5769C9.72386 1.29487 9.05127 1.96744 9.05127 2.82051V4.24359H8.25641V2.82051C8.25641 1.55819 9.3146 0.5 10.5769 0.5H14.4231C15.6854 0.5 16.7436 1.55819 16.7436 2.82051V4.24359Z" />
                    <path d="M5.14255 27.7952L5.14319 27.8034L5.1441 27.8116C5.23498 28.6295 5.95104 29.282 6.73079 29.282H18.2693C18.7056 29.282 19.0978 29.09 19.3767 28.8222C19.6483 28.5615 19.8518 28.19 19.8588 27.7782L21.614 5.21126L22.5392 5.27294L20.7837 27.8447C20.6761 29.189 19.5454 30.2051 18.2693 30.2051H6.73079C5.46296 30.2051 4.32449 29.1334 4.21635 27.8444C4.21632 27.844 4.21628 27.8435 4.21624 27.8431L2.46079 5.27294L3.38602 5.21126L5.14255 27.7952Z" />
                    </svg>
                </div>}
            </div>  
        </div>
    )
} 

export default NoteItem;