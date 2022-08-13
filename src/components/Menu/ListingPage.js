import React, {useEffect, useState} from 'react';
import Header from './Header'
import './listing.css';
import { useParams, Link, Outlet } from 'react-router-dom';

function Menu() {
    const params = useParams();
    const url = "https://organicfoods.herokuapp.com/listItems";

    const [list, setList] = useState([]);
    const [filterList, setFilterList] = useState([]);
    const [cart, setCart] = useState([]);
    const [show, setShow] = useState(true);

    useEffect(() => {
        fetch(url)
          .then(res => {
            if (res.status === 200) {
                return res.json();
            } else {
                return console.log("Error");
            }
          })
          .then(data => setList(data));
    }, []);

    useEffect(() => {
      setFilterList(list);
    }, [list]);

    useEffect(() => {
      const getCart = sessionStorage.getItem('cart');
      if (getCart !== undefined) {
        setCart(JSON.parse(getCart));
      }
    }, []);

    function handelRatingChange(event) {
      const value = event.target.value;
      if (value === "All") {
        setFilterList(list);
      } else {
        setFilterList(list.filter(item => {
          return item.rating === value;
        }));
      }
    }

    function handelPriceChange(event) {
      const value = event.target.value;
      if (value === "All") {
        setFilterList(list);
      } else {
        setFilterList(list.filter(item => {
          return item.price.slice(1) <= value;
        }));
      }
    }

    function handelClick(key, id, imgURL, title, price) {
      const quantity = 1;
      setCart(prev => {
        return [...prev, {"key": key, "id": id, "imgURL": imgURL, "title": title, "price": price, "quantity": quantity}];
      });
    }

    function handelCart() {
      setShow(!show);
      if (cart !== []) {
        sessionStorage.setItem('cart', JSON.stringify(cart))
      }
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
            <span className="cart-length">{cart ? cart.length : 0}</span>
            <button className="btn cart-btn" type='button' onClick={handelCart}><i className="fa-solid fa-cart-shopping cart-icon"></i></button>
          </nav>
          <Outlet />
        </div>
        </section>
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
        <Link to={`/Details/${params.name}`}>
        <button className="btn btn-outline-dark" >View Cart</button>
        </Link>
        </div>
        <Outlet />
        <Header name={params.name} store={cart}/>
        <section className="menu" id="menu">
    <div className="container-fluid">
      <div className="filter-menu">
        <div className="row">
          <div className="col-lg-2 col-md-3">
            <div className="filter">
              <div className="rating">
                <h4 className="rating-title">Rating:</h4>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="All"/>
                  <label>All</label>
                </div>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="⭐"/>
                  <label>⭐</label>
                </div>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="⭐⭐"/>
                  <label>⭐⭐</label>
                </div>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="⭐⭐⭐"/>
                  <label>⭐⭐⭐</label>
                </div>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="⭐⭐⭐⭐"/>
                  <label>⭐⭐⭐⭐</label>
                </div>
                <div className="rating-list">
                  <input type="radio" name="rating" onChange={handelRatingChange} value="⭐⭐⭐⭐⭐"/>
                  <label>⭐⭐⭐⭐⭐</label>
                </div>
              </div>

              <div className="price">
                <h4 className="price-title">Price:</h4>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="All"/>
                  <label>All</label>
                </div>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="100"/>
                  <label>0 to ₹100</label>
                </div>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="250"/>
                  <label>₹100 to ₹250</label>
                </div>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="400"/>
                  <label>₹250 to ₹400</label>
                </div>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="650"/>
                  <label>₹400 to ₹650</label>
                </div>
                <div className="price-list">
                  <input type="radio" name="price" onChange={handelPriceChange} value="1000"/>
                  <label>₹650 to ₹1000</label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-10 col-md-9">
            <div className="menu">
              <h3 className="menu-title">Ready to serve</h3>
              {list&&filterList.map(item => {
                return (
                  <div key={item._id} id={item.id} className="menu-item">
                  <img className="menu-item-img" src={item.imgURL} alt="food-item"/>
                  <h4 className="menu-item-name">{item.title}</h4>
                  <h6 className="menu-item-sub">{item.content}</h6>
                  <p>{item.rating}</p>
                  <div className="menu-item-price-btn-div">
                  <span className="menu-item-price" >Price: <span className='menu-item-rs'>{item.price}</span></span>
                  <button className="btn btn-outline-success add-btn" onClick={() => handelClick(item._id, item.id, item.imgURL, item.title, item.price)}><i className="fa-solid fa-cart-plus cart-icon"></i></button>
                  </div>
                </div>     
                );
              })}                 
            </div>
          </div>
        </div>
        </div>
      </div>
     </section>
        </>
    );
}

export default Menu;