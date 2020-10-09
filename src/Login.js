import React, {useState} from 'react';
import {  Redirect } from 'react-router-dom';
const API = 'http://localhost:3000/users';
const bcrypt = require("bcryptjs");

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [error, setError] = useState(false); 

    // const validate = data => {
    //     const {username, password} = data;
    //     return new Promise((resolve, reject) => {
    //       if (username === "admin" && password === "admin") {
    //         resolve({
    //           username
    //         });
    //       } else {
    //         reject("Hasło lub login są nieprawidłowe!");
    //       }
    //     });
    // }

    const handleLogin = (event) => {
        event.preventDefault();
        fetch(API)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        })
        .then(users => {
            console.log(users);
            const user = users.find(userItem => username === userItem.username);
            if (user) {
                if (bcrypt.compareSync(password, user.password) === true) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('id', user.id);
                    setIsLogged(true);
                    return user;
                }
            }
            setError(true);
            throw new Error('Username or password not found');
        })
        .catch(err => console.log(err.message))
    };

    if (isLogged) {
        return <Redirect to='/home' />
    } else {
        return (
            <div className="formWrapper">
            <form onSubmit={handleLogin}>
                <label>Username:&nbsp;
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>&nbsp;Password:&nbsp;
                <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <button className="button signupButton" type="submit">Sign In</button>
            </form>
            {error && <div>Username or password not found</div>}
            </div>
        );
    } 
}

export default Login;
