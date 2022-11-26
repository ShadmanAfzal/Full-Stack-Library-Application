import { Books } from './components/Books/Books.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState();
  const [user, setUser] = useState({});

  const getUserDetails = async () => {
    const userResponse = await fetch('/user',{
      method: 'GET',
      headers: { "Content-type": "application/json; charset=UTF-8" }
    });

    const user_details = await userResponse.json();

    console.log(user_details);

    setUser(user_details);
  }

  useEffect(() => {
    getUserDetails();
  }, [])
  

  const searchHandler = (e) => {
    e.preventDefault();
    navigator(`/search?query=${query}`)
  }

  return (
    <div>
      <div className="navbar navbar-dark bg-dark justify-content-between">
        <a 
          className="navbar-brand px-2 logo"
          href="/">
          Library App
        </a>
        <div className='d-flex'>
          {/* <form className="form-inline mx-2" onSubmit={searchHandler}>
            <input className="form-control border-none shadow-none mr-sm-2" type="search" placeholder="Search" aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button
            className='btn btn-dark'
            onClick={() => {
              navigator('/add')
            }}>
            Add Books
          </button> */}
          <div className='user-container'>
          <div>

          </div>
            Hello {user.displayName ?? ''}
          </div>
        </div>
      </div>
      <Books />
    </div>
  );
}

export default App;
