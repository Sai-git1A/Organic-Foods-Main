import React from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './login.css';

function Login() {

  const navigate = useNavigate();

  const url = 'https://organicfoods.herokuapp.com/login';

  function handelChange(e) {
    sessionStorage.setItem('user', JSON.stringify({username: e.target.value}));
  }
  
    return (
        <>
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
            <main className="form-signin text-center">
            <form action={url} method='POST'>
                <i className="fas fa-seedling logo"></i>
                <h1 className="h3 mb-3 fw-normal">Sign in</h1>
                <div className="form-floating">
                  <input type="name" name="username" onChange={handelChange} className="form-control login-username" id="floatingInput" placeholder="Username"/>
                  <label htmlFor="floatingInput">Username</label>
                </div>
                <div className="form-floating">
                  <input type="password" name="password" className="form-control login-password" id="floatingPassword" placeholder="Password"/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-outline-dark" type="submit" onClick={() => sessionStorage.setItem('auth', true)}>Sign in</button>
            </form>
            <button onClick={() => navigate('/register')} className=" w-100 btn btn-lg btn-dark" style={{marginTop: '1rem'}}>Register</button>
            </main>
        </>
    )
}

export default Login;