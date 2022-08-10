import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './header.css';

function Header() {
    return (
        <header>
            <section className="header" id="header">
            <div className="container-fluid Navbar">
              <nav className="navbar navbar-expand-md navbar-light">
                <Link className="navbar-brand" to="/">
                <img src="favicon.ico" alt="logo" width="30" height="24" className="d-inline-block align-text-top nav-brand-icon"/>
                Organic Foods
                </Link>
              </nav>
              <Outlet />
            </div>
            </section>
            <div className="nav-hidden">Hidden</div>
        </header>
    )
}

export default Header;