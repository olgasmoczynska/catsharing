import React, {useState, useEffect} from 'react';
import {  HashRouter,  Route } from 'react-router-dom';
import Signup from "./Signup";
import Login from "./Login";

function Welcome() {
    const [users, setUsers] = useState(false);
    const API = "http://localhost:3000/users";

    useEffect(() => {
      fetch(API)
        .then(response => {
          if (response.ok === false) {
            throw new Error("Błąd sieci!");
          } else {
            return response.json();
          }
        })
        .then(data => setUsers(data))
        .catch(err => console.log(err));
    }, []);

    const handleAddUser = user => {
        setUsers(prevState => [
          ...prevState,
          user
        ]);
    }

    return (
      
        <HashRouter>             
        <>               
        <Route  exact path='/'
                render={(props) => (
                <Signup {...props} onAddUser={handleAddUser} />
                )} />               
        <Route path='/login' component={Login} />             
        </>           
        </HashRouter>


    );
}

export default Welcome;
