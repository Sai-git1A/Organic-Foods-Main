import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './checkout.css';

function Checkout() {
    const navigate = useNavigate();
    const url = 'https://organicfoods-payment.herokuapp.com/paynow';
    const user = JSON.parse(sessionStorage.getItem('userData'));
    const [cartList, setCartList] = useState([]);
    const store = JSON.parse(sessionStorage.getItem('store'));

    const [order, setOrder] = useState({
        id: "",
        date: "",
        total: "",
        items: "" 
    });

    useEffect(() => {
        const orderId = "Test_" + Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
        const date = new Date().getDate();
        const month = new Date().toLocaleString('en-us', {month: 'short'});
        const year = new Date().getFullYear();
        const orderDate = date +"-"+ month +"-"+ year;
        setOrder(prev => {
            return {...prev, id: orderId, date: orderDate}
        });
    }, []);

    useEffect(() => {
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        if (cart) {
            setCartList(cart);
        }
    }, []);

    useEffect(() => {
        let sum = 0;
        let sumItems = 0;
        cartList.forEach(item => {
            sum += Number(item.price.slice(1, item.price.length));
        });
        cartList.forEach(item => {
            sumItems += item.quantity;
        })
        setOrder(prev => {
            return {...prev, total: sum, items: "Q "+sumItems};
        });
    }, [cartList]);

    function handelGoBackClick() {
        navigate(`/details/${store.name}`);
    };

    return (
        <>
           <Header />
           <div className='store-user-div'>
           {store ? 
            <div className='s-div'>
               <img className="s-img" src={store.imgURL} alt="Store-img" />
               <h1 className="s-title">{store.name}</h1>
               <span className="s-content">{store.content}</span>
               <span className="s-rating">{store.rating}</span>
               <span className="s-location">{store.location}</span>
               <span className="s-timing">{store.timing}</span>
               <span className="s-contact">{store.contact}</span>
            </div>
            : ""}
            {user ? 
            user.map(data => <div className='user-div' key={data._id}>
            <h1 className="user-title">Contact Details</h1>
            <div>
                <h2 className="user-name details">{data.username},</h2>
            </div>
            <div>
                <h2 className="user-email details">{data.email},</h2>
            </div>
            <div>
                <h2 className="user-tel details">{data.tel},</h2>
            </div>
            <div>
                <h2 className="user-address details">{data.address}</h2>
            </div>
            </div>)
            : ""}
            <div className='order-div'>
                <h1 className='order-title'>Order Details</h1>
                <div>
                    <h2 className="order-id details">{order.id}</h2>
                </div>
                <div>
                    <h2 className="order-date details">{order.date}</h2>
                </div>
                <div>
                    <h2 className="order-total details">₹{order.total} ({order.items})</h2>
                </div>
            </div>
           </div>
           
           
            {cartList ? cartList.map(item => {
                return (
                    <div className='cartItems-div' key={item.key}>
                        <img className="cartItems-img" src={item.imgURL} alt='Item img'/>
                        <h1 className='cartItems-title'>{item.title}</h1>
                        <span className="cartItems-price">{item.price}</span>
                        <span className="cartItems-quantity">Q {item.quantity}</span>
                    </div>
                )
            })
            : ""}
            <div className='checkout-div'>
            <button className="btn btn-outline-dark" onClick={handelGoBackClick}>Go Back</button>
            <span className="total-amount">{order.items}</span>
            <span className="total-quantity">₹{order.total}</span>
            <form action={url} method='post' style={{display: 'inline'}}>
            <input type="hidden" name="orderId" value={order.id} />
            <input type="hidden" name="amount" value={order.total} />
            <input type="hidden" name="custId" value={user[0].username} />
            <input type="hidden" name="email" value={user[0].email} />
            <input type="hidden" name="tel" value={user[0].tel} />
            <button className="btn btn-outline-dark" type="submit">Pay Now</button>
            </form>
            </div>
        </>
    )
}

export default Checkout;