import React from "react"

import Button from "./defaultButton"
import Timer from "./timer"

import icon__themeDark from "./../imgs/moon.png"
import icon__themeWhite from "./../imgs/sun.png"


import {getParentNode} from "./exes/extenetions"


const {ipcRenderer} = window.require('electron');


export default function App () {
   
    const notification = React.createRef()
    const timer = new Timer();

    timer.state.refNotification = notification;

    const changeTheme = ({target}) => {
        const themes = getParentNode(target,2).children

        if(target.parentElement.classList.contains("dark")) {
            themes[0].style.display = "none"
            themes[1].style.display = "block"
            document.documentElement.style.setProperty("--main-colorOne", "#2A2A2A")
            document.documentElement.style.setProperty("--main-colorTwo","#538A96")
        }
        else {
            themes[0].style.display = "block"
            themes[1].style.display = "none"
            document.documentElement.style.setProperty("--main-colorOne", "#FFFFFF")
            document.documentElement.style.setProperty("--main-colorTwo","#363636")
        }
    }

    const closeBtn = () => {
        if(timer.state.start_m != null)
            timer.addNotification("программу невозможно закрыть , таймер активировался!!")
        else 
            ipcRenderer.send("closeApp","default")
    }
    
    const minimizeBtn = () => {
        ipcRenderer.send("turnOFF") 
    }


    return (
        <>
            <div className="app" >
                <div className="app__bar">
                    <div className="app__bar_dragPanel"></div>
                    <ul className="app__bar_panel">
                        <li onClick={minimizeBtn} className="app_bar_button">
                            <svg width="9" height="3" viewBox="0 0 9 3" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="9" height="3" fill="white"/>
                            </svg>
                        </li>
                        <li onClick={closeBtn} className="app_bar_button">
                            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="7.91745" width="1.53096" height="10.7167" transform="rotate(45 7.91745 0)" fill="white"/>
                                <rect y="1.08258" width="1.53096" height="10.7167" transform="rotate(-45 0 1.08258)" fill="white"/>
                            </svg>
                        </li>
                    </ul>
                </div>
               
                <div className="app_canvas">
                    <header>
                        <div className="header__theme dark" onClick={changeTheme}><img src={icon__themeDark}/></div>
                        <div className="header__theme white" onClick={changeTheme}><img src={icon__themeWhite}/></div>
                    </header>
                    <main>
                        <timer.render/>
                    </main>
                    <footer>
                        <Button text="RELOAD" onclick={timer.reload}/>
                        <Button text="EXIT" onclick={timer.exit}/>
                        <Button text="CANCEL" onclick={timer.cancel}/>
                    </footer>
                </div>
                <div className="notificationBox" ref={notification}></div>
            </div>
        </>
    )
}