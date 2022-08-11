import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './register.css';

function Register() {

  const navigate = useNavigate();

  const url = 'https://organicfoods.herokuapp.com/register';

  const [userDetails, setUserDetails] =  useState({
    username:'',
    email:'',
    password:'',
    repassword:''
  });

  function handelChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setUserDetails(prev => {
      return {...prev, [name]: value}
    });
    localStorage.setItem('user', JSON.stringify(userDetails));
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
            <div className="register-div">
            <main className="form-signin text-center">
            <form action={url} method='POST'>
                <i className="fas fa-seedling logo"></i>
                <h1 className="h3 mb-3 fw-normal">Register</h1>
                <div className="form-floating">
                  <input type="name" name="username" className="form-control username" onChange={handelChange} id="floatingName" placeholder="Username"/>
                  <label htmlFor="floatingName">Username</label>
                </div>
                <div className="form-floating">
                  <input type="email" name="email" className="form-control email" onChange={handelChange} id="floatingEmail" placeholder="name@example.com"/>
                  <label htmlFor="floatingEmail">Email address</label>
                </div>
                <div className="form-floating">
                  <input type="password" name="password" className="form-control password" onChange={handelChange} id="floatingPassword" placeholder="Password"/>
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating">
                  <input type="password" name="repassword" className="form-control re-enter-password" onChange={handelChange} id="floatingReEnterPassword" placeholder="Re-Enter-Password"/>
                  <label htmlFor="floatingReEnterPassword">Re-Enter-Password</label>
                </div>
                <button className="w-100 btn btn-lg btn-outline-dark" type="submit">Register</button>
            </form>
            <button onClick={() => navigate('/login')} className="w-100 btn btn-lg btn-dark" style={{marginTop: '1rem'}}>Sign in</button>
            </main>
            </div>
        </>
    )
}

export default Register;