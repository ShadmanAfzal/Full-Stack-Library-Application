import { useNavigate } from 'react-router-dom';
import { Books } from './components/Books/Books.js';
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from 'react';

function App() {
  const navigator = useNavigate();

  const [query, setQuery] = useState();

  const searchHandler = (e) => {
    e.preventDefault();
    navigator(`/search?query=${query}`)
  }

  return (
    <div>
      <div className="navbar navbar-dark bg-dark justify-content-between">
        <a className="navbar-brand px-2" href="/">Library App</a>
        <div className='d-flex'>
          <form className="form-inline mx-2" onSubmit={searchHandler}>
            <input className="form-control border-none shadow-none mr-sm-2" type="search" placeholder="Search" aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
          <button
            className='btn btn-dark'
            onClick={() => {
              navigator('/add')
            }}>Add Books</button>
        </div>
      </div>
      <Books />
    </div>
  );
}

export default App;
