import { Books } from './components/Books/Books.js';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App({user}) {

  return (
    <div>
      <div className="navbar navbar-dark bg-dark justify-content-between">
        <a 
          className="navbar-brand px-2 logo"
          href="/">
          Library App
        </a>
        <div className='d-flex'>
          <div className='user-container'>
          <div>
          </div>
            Hello {user.name ?? ''}
          </div>
        </div>
      </div>
      <Books currentUser={user}/>
    </div>
  );
}

export default App;
