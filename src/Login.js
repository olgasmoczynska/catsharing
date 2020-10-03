import React, {useState} from 'react';
import {  Redirect, HashRouter,  Route,  Link,  Switch,  NavLink } from 'react-router-dom';
const API = 'http://localhost:3000/users';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    const validate = data => {
        const {username, password} = data;
        return new Promise((resolve, reject) => {
          if (username === "admin" && password === "admin") {
            resolve({
              username
            });
          } else {
            reject("Hasło lub login są nieprawidłowe!");
          }
        });
    }

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
                if (user.password === password) {
                    localStorage.setItem("username", username);
                    setIsLogged(true);
                    return user;
                    // Do localStorage dodajesz token = username
                    // Przekierowujesz do ekranu glownego z kafelkami
                    // Redirect chyba bardziej router - react jsowy window.location.href = '/tails'
                }
            }
            throw new Error('User or password not found')
        })
        .catch(err => console.log(err.message))
        //     username,
        //     password
        // }).then(user => {
        //     setUser(user);
        // }).catch(err => {
        //     console.log(err);
        // });
    };

    // localStorage.setItem("username", username);

    if (isLogged) {
        return <Redirect to='/home' />
    } else {
        return (
            <>
            <form onSubmit={handleLogin}>
                <label>Username:
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                </label>
                <label>Password:
                <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                </label>
                <button type="submit">Sign In</button>
            </form>
            </>
        );
    } 
}

export default Login;