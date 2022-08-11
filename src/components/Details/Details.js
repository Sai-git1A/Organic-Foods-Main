import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Header from './Header';
import './details.css';

function Details() {
    const params = useParams();
    const navigate = useNavigate();
    const userURL = 'https://organicfoods.herokuapp.com/user';
    const url = "https://organicfoods.herokuapp.com/restaurantdetails";

    const [stores, setStores] = useState([]);
    const [cartList, setCartList] = useState([]);
    const [total, setTotal] = useState({});
    const auth = sessionStorage.getItem('auth');
    const name = JSON.parse(sessionStorage.getItem('user'));
    const [isVisible, setVisible] = useState(false);

    useEffect(() => {
        fetch(url)
          .then(res => {
            if (res.status === 200) {
              return res.json();
          } else if (res.status === 404) {
              return console.log("Error:" + res.status);
          }
          })
          .then(data => setStores(data));
    }, []);

    const store = stores.find(item => item.name === params.name);

    useEffect(() => {
        sessionStorage.setItem("store", JSON.stringify(store))
    }, [store]);

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        if (cart) {
            setCartList(cart);
        }
    }, []);

    useEffect(() => {
        let sumPrice = 0;
        let sumQuantity = 0;
        cartList.forEach(item => {
            sumPrice += Number(item.price.slice(1, item.price.length));
        });

        cartList.forEach(item => {
            sumQuantity += item.quantity;
        });
        setTotal({price: "₹"+sumPrice, quantity: "Q-"+sumQuantity});
    }, [cartList]);

    function handelClick(title) {
        const filterList = cartList.filter(item => item.title !== title);
        setCartList(filterList);
        sessionStorage.setItem("cart",JSON.stringify(filterList));
    }

    function handelAddClick(id) {
        setCartList(prev => {
            const update = prev.map(item => {
                if (item.id === id) {
                    return {...prev, key: item.key, id: item.id, imgURL: item.imgURL, title: item.title, price: "₹"+(item.price.slice(1, item.price.length)*2), quantity: item.quantity++}
                }
                return item;
            });
            return update;
        });
    }

    function handelRemoveClick(id) {
        setCartList(prev => {
            const update = prev.map(item => {
                if (item.id === id) {
                    return {...prev, key: item.key, id: item.id, imgURL: item.imgURL, title: item.title, price: "₹"+(item.price.slice(1, item.price.length)/2), quantity: item.quantity--}
                }
                return item;
            });
            return update;
        });
    }

    function handelGoBackClick() {
        sessionStorage.setItem("cart",JSON.stringify(cartList));
        navigate(`/listing/${store.name}`);
    }

    function handelCheckoutClick() {
        sessionStorage.setItem("cart",JSON.stringify(cartList));
        if (!auth) {
            navigate('/login');
        } else {
            setVisible(!isVisible);
            fetch(userURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: name.username})
            })
            .then(res => res.json())
            .then(data => storeData(data));
        }
    }

    function storeData(data) {
        sessionStorage.setItem('userData', JSON.stringify(data));
        setVisible(false);
        navigate('/checkout');
    }


    return (
        <>
        <Header />
        {store && 
        <div className='store-div'>
           <img className="img" src={store.imgURL} alt="Store-img" />
           <h1 className="store-title">{store && store.name}</h1>
           <span className="store-content">{store.content}</span>
           <span className="store-rating">{store.rating}</span>
           <span className="store-location">{store.location}</span>
           <span className="store-timing">{store.timing}</span>
           <span className="store-contact">{store.contact}</span>
        </div>
        }
        {cartList ? cartList.map((item) => {
            return (
                <div className='items-div' key={item.key} id={item.id}>
                <img className="items-img" src={item.imgURL} alt="Item-img" />
                <h1 className="items-title">{item.title}</h1>
                <span className="items-price">{item.price}</span>
                <button className="btn btn-light remove-quantity" onClick={() => handelRemoveClick(item.id)}><i className="fa-solid fa-minus"></i></button>
                <span className="items-quantity">{item.quantity}</span>
                <button className="btn btn-light add-quantity" onClick={() => handelAddClick(item.id)}><i className="fa-solid fa-plus"></i></button>
                <button className="btn delete" onClick={() => handelClick(item.title)}><i className="fa-solid fa-trash"></i></button>
                </div>
            )
        }): ""}
        <div className='checkout-div'>
        <button className="btn btn-outline-dark" onClick={handelGoBackClick}>Go Back</button>
        <span className="total-amount">{total.quantity}</span>
        <span className="total-quantity">{total.price}</span>
        <button className="btn btn-outline-dark" onClick={handelCheckoutClick}>Check Out</button>
        </div>
        {isVisible ? <div className='progress-box-main'>
        <div className='progress-box'>
          <CircularProgress color='info'/>
          <h1 className='progress-box-title'>Getting data....</h1>
        </div>
        </div>
        : ''}
        
        </>
    )
}

export default Details;