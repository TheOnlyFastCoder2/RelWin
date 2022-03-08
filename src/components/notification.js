import ReactDom from "react-dom"
import {useState, useEffect} from "react"


const {ipcRenderer} = window.require('electron');

export function NotificationSys ({method,text,mode}) {

    let setTime
    const [time,useTime] = useState(59)

    function ChangeTime() {
        useTime( time - 1)
    }
    function cancelSys() {
        clearInterval(setTime)
        method()    
    }

    useEffect(() => {
        setTime =  setInterval(() => {
            if( time == 0 ) {
                clearInterval(setTime)
                ipcRenderer.send("closeApp",mode)
            }
            else ChangeTime()
            
        },1000)

        return () => clearInterval(setTime);
    },[time])

    return (
        <div className="notificationSys">
            <div className="notificationSys__container">
                <div className="notificationSys__content">
                    <div className="notificationSys__content_warning">
                        <p>
                            <strong>Система: <br/></strong>{text} через {time}с
                        </p>
                    </div>
                    <div className="notificationSys__content_cancel">
                        <button onClick={cancelSys}>cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export function Notification({warning,parent}) {

    const clearWarnings = () =>  ReactDom.render(<></>,parent)
    return (
        <div className="notification">
            <div className="notification__close" onClick={clearWarnings}>
                 <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="7.91745" width="1.53096" height="10.7167" transform="rotate(45 7.91745 0)" fill="white"/>
                    <rect y="1.08258" width="1.53096" height="10.7167" transform="rotate(-45 0 1.08258)" fill="white"/>
                </svg>
            </div>
            <div className="notification__wrapper">
                <p> <strong>warning:</strong> {warning}</p>
            </div>
        </div>
    )
}

