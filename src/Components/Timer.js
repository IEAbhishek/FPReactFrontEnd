import React, { useState, useRef } from 'react'
import IdleTimer from 'react-idle-timer'
import Modal from 'react-modal'
import Chat from "./Chat"
import Login from "./Login"
import {useNavigate} from "react-router-dom";

Modal.setAppElement('#root')


function IdleTimerContainer() {
    const [isLoggedIn, setisLoggedIn]= useState(true);
    const [modalIsOpen, setModalIsOpen]=useState(false);
    const idleTimerRef=useRef(null)
    const sessionTimeOutRef= useRef(null) 

    const onIdle=()=>{
        console.log('User is idle')
        setModalIsOpen(true)
        sessionTimeOutRef.current=setTimeout(logOut,5000)
    }

    const stayActive=()=>{
    setModalIsOpen(false)
    clearTimeout(sessionTimeOutRef.current)
    console.log('User is Active')

    }

    const history = useNavigate();
    const logOut=()=>{
        setModalIsOpen(false)
        setisLoggedIn(false)
        clearTimeout(sessionTimeOutRef.current)
        console.log('Logged out')
        localStorage.clear();
        //history.push("/Login");
        window.location = "/Login";
    }
    return (
        <div>
            {
                isLoggedIn ? <Chat/> : <Login/>
            }
            <Modal isOpen={modalIsOpen}>
                <h2> You have been idle for a while!</h2>
                <p> You will be logged out soon.</p>
                <div>
                    <button onClick={logOut}> Log me out</button>
                    <button onClick={stayActive}>Keep me logged in</button>
                </div>
            </Modal>
            <IdleTimer 
            ref={idleTimerRef} 
            timeout={300*1000} 
            onIdle={onIdle}>
            </IdleTimer>
        </div>
    )
}

export default IdleTimerContainer