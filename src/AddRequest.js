import React, {useState} from 'react';
import Tile from './Tile';
import DatePicker from 'react-date-picker';
const API = 'http://localhost:3000/users';

function AddRequest({onAddRequest}) {
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [pet, setPet] = useState('');
    const [error, setError] = useState(null);
    const [requested, setRequested] = useState(false)

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validation()) {
            fetch(`${API}/1`, {
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
        <>
        {error &&
          <div>{error}</div>
        }
        <form onSubmit={handleSubmit}>
            <select value={pet} onChange={e => setPet(e.target.value)}>
                <option value="" disabled="disabled">Select</option>
                <option value="cat">Cat</option>
                <option value="dog">Dog</option>
            </select>
            <div>
            From:
            <DatePicker onChange={setDateFrom} required value={dateFrom} />
            To:
            <DatePicker onChange={setDateTo} required value={dateTo} />
            </div>
            <button type="submit">Add</button>
        </form>
        {requested &&
        <Tile />}
        </>
    )
}

export default AddRequest;