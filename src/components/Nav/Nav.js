import React, { useEffect, useState } from 'react'
import "./Nav.css"
import { useNavigate } from 'react-router-dom';
function Nav() {
    const navigate = useNavigate();
    const [show, handleShow] = useState(false);
    const transitionNavBar = () => {
        if(window.scrollY > 100){
            handleShow(true);
        }else{
            handleShow(false);
        }
    }
    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar);
        return () => window.removeEventListener("scroll", transitionNavBar);
    }, [])
  return (
    <div className={`nav ${show && 'nav__black'}`}>
        <div className='nav__contents'>
            <img 
                onClick={() => navigate('/')}
                src="images/logo.png" className='nav__logo' />

            <img 
                onClick={() => navigate('/profile')}
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" className='nav__avatar' />
        </div>
    </div>
  )
}

export default Nav