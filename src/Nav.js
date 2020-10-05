import React from 'react';
import {  NavLink } from 'react-router-dom';

function Nav({onLogout}) {

    return (
        <div>
            <nav className="nav">
                <div className="logo">Petsharing</div>
                <ul>
                    <li><NavLink to='/home' >Home</NavLink></li>
                    <li><NavLink to='/dashboard' >Dashboard</NavLink></li>
                    <li><NavLink to='/addrequest' >Add Request</NavLink></li>
                    <li>You are logged as&nbsp;<span>{localStorage.getItem('username')}</span></li>
                    <button className="button" onClick={onLogout}>Logout</button>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;