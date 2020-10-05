import React, {useState} from 'react';
import {  HashRouter,  Route,  Switch } from 'react-router-dom';
import Welcome from './Welcome';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Dashboard from './Dashboard';
import AddRequest from './AddRequest';

function App() {
  const [user, setUser] = useState(null);
  const [requests, setRequests] = useState([]);

  const addRequest = (el) => {
    setRequests([...requests, el]);
  };

  return (
    <HashRouter>             
      <Switch>               
      <Route exact path='/'><Welcome /></Route>
      <Route exact path='/login'><Login /></Route>
      <Route exact path='/signup'><Signup /></Route>
      <Route exact path='/home'><Home /></Route>
      <Route exact path='/dashboard'> <Dashboard /></Route>
      <Route exact path='/addrequest'><AddRequest onAddRequest={addRequest} /></Route>
      </Switch>           
    </HashRouter>
  )
  
  // if (user) {
  //   return (
  //     <>
  //     <Nav loggedUser={user} />
  //     <Dashboard />
  //     </>
  //   )
  // } else {
  //   return (
  //     <Welcome />
  //   );
  // }
}

export default App;