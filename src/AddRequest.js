import React, {useState} from 'react';
import {  Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';
const getUserId = () => localStorage.getItem('id');
const API = 'http://localhost:3000';

function AddRequest({onAddRequest}) {
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [pet, setPet] = useState('');
    const [error, setError] = useState(null);
    const [requested, setRequested] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validation()) {
            fetch(`${API}/users/${getUserId()}`, {
                method: "PATCH",
                body: JSON.stringify({
                  requests: [pet, dateFrom, dateTo]
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
                    if (typeof onAddRequest === "function") {
                      onAddRequest(data);
                    };
                    setRequested(true);
                })
                .catch(err => console.log(err));
        }
    }
      
    const validation = () => {
        let valid = true;
    
        if (pet === '') {
            setError('Select your pet');      
            return false;
        } else {
            setError(null);
        }
        
        return valid;
    }

    return (
        <div className="formWrapper">
        {error &&
          <div>{error}</div>
        }
        <form className="form" onSubmit={handleSubmit}>
            <select value={pet} onChange={e => setPet(e.target.value)}>
                <option value="" disabled="disabled">Select pet</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
            </select>
            <div className="datePicker">
            From:&nbsp;
            <DatePicker onChange={setDateFrom} required value={dateFrom} />
            &nbsp;To:&nbsp;
            <DatePicker onChange={setDateTo} required value={dateTo} />
            </div>
            <button className="button addButton" type="submit">Add request</button>
        </form>
        <Link to='/dashboard'>Back to dashboard</Link>
        {requested && <>
        <div>Request successfuly submitted!</div>
        </>}
        </div>
    )
}

export default AddRequest;
