import React, {useState, useEffect} from 'react';
import {Link, Outlet} from 'react-router-dom';
import './header.css'

function Header(props) {

  const url = "https://organicfoods.herokuapp.com/homePage";

  const [list, setList] = useState([]);
  const [show, setShow] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch(url)
      .then(res => {
        if (res.status === 200) {
          return res.json();
      } else if (res.status === 404) {
          return console.log("Error:" + res.status);
      }
      })
      .then(data => setList(data))
  }, []);

  useEffect(() => {
    const getCart = JSON.parse(sessionStorage.getItem('cart'));
    setCart(getCart);
  }, [props.toCart]);

  const store = list.find(item => item.name === props.name);
  
  function handelClick() {
    setShow(!show);
  }

  
  return (
    <header>
        <section className="header" id="header">
        <div className="container-fluid Navbar">
          <nav className="navbar navbar-expand-md navbar-light">
            <Link className="navbar-brand" to="/">
            <img src="favicon.ico" alt="logo" width="30" height="24" className="d-inline-block align-text-top nav-brand-icon"/>
            Organic Foods
            </Link>
            <span className="cart-length">{cart ? cart.length : 0}</span>
            <button className="btn cart-btn" type='button' onClick={handelClick}><i className="fa-solid fa-cart-shopping cart-icon"></i></button>
          </nav>
          <Outlet />
        </div>
        </section>
        <div className="nav-hidden">Hidden</div>
        <div className="card cart-menu" style={show?{visibility: 'hidden'}: {visibility: 'visible'}}>
        <div className="card-header">Items
        <span className="quantity">Q</span>
        <span className="amount">Price</span>
        </div>
        <ul className="list-group list-group-flush">
        {cart ? cart.map((item, index) => {
              return (
                <li className="list-group-item" key={item.key} id={index}>
                {item.title}
                <span className="quantity">{item.quantity}</span>
                <span className="amount">{item.price}</span>
                </li>
              )
            }) : ''}
        </ul>
        <Link to={`/Details/${store && store.name}`}>
        <button className="btn btn-outline-dark">View Cart</button>
        </Link>
        </div>
        <section className="store" id="store">
        <div className="container-fluid">
          <div className="store-card">
            <div className="row">
              <div className="col-lg-6 col-md-6">
                <div className="s-card-front">
                  {store && <>
                    <img className="store-img" src={store.imgURL} alt="Store"/>
                    <h3 className="store-title" id='store-title'>{store.name}</h3>
                    <p className="store-sub">{store.content}</p>
                    <p>{store.rating}</p>
                  </>}
                </div>
              </div>
              <div className="col-lg-6 col-md-6">
                <div className="s-card-back">
                  <h3 className="s-card-text">“I know once people get connected to real food, they never change back.”</h3>
                  <h4 className="s-card-text-sub">- Alice Waters</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </header>
)
    
}

export default Header;