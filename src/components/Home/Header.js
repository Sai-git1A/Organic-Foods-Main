import React, { useState } from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import './header.css';

function Header(props) {

  const navigate = useNavigate();
  const auth = sessionStorage.getItem('auth');
  const user = JSON.parse(sessionStorage.getItem('user'));

  const list = props.list;
  const [search, setSearch] = useState("");

  function change(event) { 
    const value = event.target.value;
    setSearch(value);
  }
  
  function handelLogin() {
    navigate("/login");
  }

  function handelRegister() {
    navigate("/register");
  }

  return (
    <header>
    <section className="header" id="header">
    <div className="container-fluid Navbar">
      <nav className="navbar navbar-expand-md navbar-light">
        <Link className="navbar-brand" to={"/"}>
          <img src="favicon.ico" alt="logo" width="30" height="24" className="d-inline-block align-text-top nav-brand-icon"/>
          Organic Foods
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#search" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse search-div" id="search">
          <form className="d-flex">
            <input className="form-control me-2" list="data" onChange={change} type="search" placeholder="Your favorite food." aria-label="Search"/>
            <datalist id= "data">
            {list.map(item => {
              return <option key={item._id} id={item.id}>{item.name}</option>
            })}
            </datalist>
            <Link to={`/listing/${search}`}>
            <button className="btn btn-outline-success" type="button"><i className="fa-solid fa-magnifying-glass search-icon"></i></button>
            </Link>
          </form>
        </div>
        {auth?<Link to={'/user'} className="btn-user"><button className="btn btn-outline-dark" type='button'>Hi {user ? user.username : ''}</button></Link>:<>
          <button className="btn btn-primary btn-login" type="button" onClick={handelLogin}><i className="fa-solid fa-arrow-right-to-bracket login-icon"></i>Login</button>
          <button className="btn btn-outline-primary btn-register" type="button" onClick={handelRegister}><i className="fa-solid fa-user register-icon"></i>Register</button>
        </>}
      </nav>
      <Outlet />
    </div>

    <div className="nav-hidden">Hidden</div>

   <div className="container-fluid H-banner">
     <div className="H-title">
       <div className="row">
         <div className="col-lg-6">
           <h1 className="title">Healthy foods Happy life</h1>
           <button type="button" className="btn btn-dark btn-lg download-btn"><i className="fab fa-apple"></i> Download</button>
           <button type="button" className="btn btn-outline-light btn-lg download-btn"><i className="fab fa-google-play"></i> Download</button>
         </div>
         <div className="col-lg-6">
           <i className="fas fa-seedling header-logo"></i>
           <h1 className="logo-title">Organic Foods</h1>
         </div>
       </div>
     </div>
   </div>
  </section>
    </header>
  );
}

export default Header;
