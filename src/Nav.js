import React from 'react';
import {  NavLink } from 'react-router-dom';

function Nav({onLogout}) {

    return (
        <div>
            <nav>
                <div>Petsharing</div>
                <ul>
                    <li><NavLink to='/home' >Main</NavLink></li>
                    <li><NavLink to='/dashboard' >Dashboard</NavLink></li>
                    <li><NavLink to='/addrequest' >Add Request</NavLink></li>
                    <li>
                        <ul>
                            <li>You are logged as {localStorage.getItem("username")}</li>
                            <li><button onClick={onLogout}>Logout</button></li>
                        </ul>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Nav;