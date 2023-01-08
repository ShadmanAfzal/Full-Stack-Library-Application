import react from 'react';

export const NavBar = ({ name }) => {
    return (
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
                    Hello { name ?? '' }
                </div>
            </div>
        </div>
    );
}