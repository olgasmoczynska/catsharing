import React, {useState} from 'react';
import {  Link } from 'react-router-dom';
const API = 'http://localhost:3000/users';

function Signup({onAddUser}) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [registered, setRegistered] = useState(false);

    const handleSignup = e => {
        e.preventDefault();

        fetch(API, {
          method: "POST",
          body: JSON.stringify({
            username,
            password,
            requests: [],
            accepted: []
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
          .then(response => {
            if (response.ok === false) {
              throw new Error("Błąd sieci!");
            } else {
              return response.json();
            }
          })
          .then(data => {
            if (typeof onAddUser === "function") {
              onAddUser(data);
            };
            setRegistered(true);
          })
          .catch(err => console.log(err));
      };

      if (registered) {
          return (
              <div className="formWrapper">
              <h1>Congratulations!</h1>
              <div className="loginPrompt">
              <h3>Already have an account?</h3>
              <Link to="/login">Sign in</Link>
              </div>
              </div>
          )
      } else return (
        <div className="formWrapper">
        <h1>Welcome to Petsharing!</h1>
        <div className="signupPrompt">
        <h3>Create an account</h3>
        <form onSubmit={handleSignup}>
        <label>User:&nbsp;
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>&nbsp;Password:&nbsp;
            <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
            <button className="button signupButton" type="submit">Sign up!</button>
        </form>
        </div>
        <div className="loginPrompt">
        <h3>Already have an account?</h3>
        <Link to="/login">Sign in</Link>
        </div>
        </div>
    );
}

export default Signup;
