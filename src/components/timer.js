import React ,{Component} from "react"
import ReactDom from "react-dom"
import {Notification , NotificationSys} from "./notification"

export default class Timer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hours:0,
            minutes:0,
            delay: 100,
            start_m: null,
            refNotification: null
        } 

        this.timeH = React.createRef();
        this.timeM = React.createRef();

        this.render = this.render.bind(this)
        this.reload = this.reload.bind(this)
        this.exit = this.exit.bind(this)
        this.cancel = this.cancel.bind(this)
         
    }

    addNotification(text) {
        ReactDom.render(
            <></>,
            this.state.refNotification.current
        )
        setTimeout(() => {
            ReactDom.render(
                <Notification 
                    warning={text} 
                    parent={this.state.refNotification.current} 
                />,
                this.state.refNotification.current
            )
        },100)
        
    }
    setClick(target,time,direction) {
     
        const setCounter = () => {
            
            if(this.state[time]+direction >= 0) {
                if(time === "hours") {
                    if(this.state[time]+direction < 24) {
                        this.state[time] += direction
                        this.timeH.current.textContent = this.state[time]
                    } 
                }
                    
                if(time === "minutes"){
                    if(this.state[time]+direction < 60) {
                        this.state[time] += direction
                        this.timeM.current.textContent = this.state[time]
                    } 
                }               
            } 
        }
        
        
        setCounter()
        let start_t, start_i;
        target.onmousedown = () => {
            start_t = setTimeout(() => {
                start_i = setInterval( () => {
                    setCounter()
                },this.state.delay)
            },1000)
        }

        target.onmouseup = () => {
            target.onmousedown = null
            clearTimeout(start_t)
            clearInterval(start_i)
        }
    }

    toTop = ({target}) =>  {
        const isTime = target.classList.contains("h");
        if(isTime) this.setClick(target,"hours",1)
        else this.setClick(target,"minutes",1)
        
    }

    toBottom = ({target}) => {
        const isTime = target.classList.contains("h");
        if(isTime) this.setClick(target,"hours",-1)
        else this.setClick(target,"minutes",-1)
    }

    

    winFinish(mode) {
        this.state.start_m = setInterval( () => {
            if(this.state.minutes <= 1) {
                if(this.state.hours === 0) {
                    clearInterval(this.state.start_m)
                    this.state.start_m = "start"
                    ReactDom.render(
                        <NotificationSys 
                            method={this.cancel}
                            mode={mode} 
                            text={`${ mode == "exit" ? "выход" : "перзагрузка"}`}
                        />,
                        this.state.refNotification.current
                    )
                }
                else {
                    this.state.hours -= 1;
                    this.state.minutes = 59;
                    this.timeH.current.textContent = this.state.hours
                }    
            } 
            this.state.minutes -= 1
            this.timeM.current.textContent = this.state.minutes 
        }, 1000 * 60 )
    }

    reload = () => {  

        if(this.state.minutes + this.state.hours !== 0) {
            if(this.state.start_m !== null) {
                clearInterval(this.state.start_m)
                this.state.start_m = null
                setTimeout(() => this.winFinish("reload"), 1000)
                 
            } 
            else this.winFinish("reload")
            this.addNotification("перезагрузка началась")
        }
        else this.addNotification("выберите перезагрузку или выход из системы")

        
    }

    exit = () => {

        if(this.state.minutes + this.state.hours != 0) {
            if(this.state.start_m !== null) {
                clearInterval(this.state.start_m)
                this.state.start_m = null
                setTimeout(() => this.winFinish("exit"), 1000)
            } 
            else this.winFinish("exit")
            this.addNotification("выход из системы активировался")
        }
        else this.addNotification("выберите перезагрузку или выход из системы")

        
    }

    cancel = () => { 

        clearInterval(this.state.start_m)
        this.state.start_m = null
        this.state.hours = 0
        this.state.minutes = 0

        this.timeM.current.textContent = this.state.minutes
        this.timeH.current.textContent = this.state.hours

        this.addNotification("действия отменились")
        
    }

    render() {
        return (
            <div className="timer">
                <div className="timer__time">
                    <div className="timer__time_case">
                        <p className="timer__case_head">HOURS</p>
                        <div className="timer__case_main">
                            <p className="timer__case_text"  ref={this.timeH}>{this.state.hours}</p>
                            <div className="timer__case_pane">
                                <button className="timer__pane_button upper h" onClick={this.toTop}></button>
                                <button className="timer__pane_button lower h" onClick={this.toBottom}></button>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <div className="timer__time">
                    <div className="timer__time_case">
                        <p className="timer__case_head ">MINUTES</p>
                        <div className="timer__case_main">
                            <p className="timer__case_text" ref={this.timeM}>{this.state.minutes}</p>
                            <div className="timer__case_pane">
                                <button className="timer__pane_button upper m" onClick={this.toTop}></button>
                                <button className="timer__pane_button lower m" onClick={this.toBottom}></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } 
} 