const API = 'http://localhost:3000';

export function getUsers() {
    return fetch(`${API}/users`)
        .then(response => {
          if (response.ok === false) {
            throw new Error("Błąd sieci!");
          } else {
            return response.json();
          }
        })
        .catch(err => console.log(err));
}