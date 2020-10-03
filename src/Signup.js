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
              <>
              <div>Congratulations!</div>
              <span>Already have an account?</span> <Link to="/login">Sign in</Link>
              </>
          )
      } else return (
        <>
        <div>Welcome to Catsharing!</div>
        <div>Create an account</div>
        <form onSubmit={handleSignup}>
        <label>User:
            <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <label>Password:
            <input type="text" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
            <button type="submit">Sign up!</button>
        </form>
        <span>Already have an account?</span> <Link to="/login">Sign in</Link>
        </>
    );
}

export default Signup;
