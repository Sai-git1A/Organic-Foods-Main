import React, {useEffect, useState} from 'react';
import Header from './Header';
import './user.css';

function User() {
    const url = 'https://organicfoods.herokuapp.com/user';
    const updateURL = 'https://organicfoods.herokuapp.com/update';
    const [user, setUser] = useState([]);
    const [userUpdate, setUserUpdate] = useState({
        username: '',
        email: '',
        tel: '',
        address: ''
    });
    const getUser = JSON.parse(sessionStorage.getItem('user'));
    const ordersURL = `https://organicfoods.herokuapp.com/orders/${getUser.username}`;
    const allOrdersURL = `https://organicfoods.herokuapp.com/all_orders/${getUser.username}`;
    const [orders, setOrders] = useState([]);
    const [allOrders, setAllOrders] = useState([]);
    const [gotOrder, setOrder] = useState({});
    const [isVisible, setVisible] = useState(true);
    const [isHidden, setHidden] = useState(true);
    const [btnText, setBtnText] = useState('Edit');
    const [orderDisplay, setDisplay] = useState(false);

    useEffect(() => {
        fetch(url,
            {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({username: getUser.username})
            })
            .then(res => res.json())
            .then(data => setUser(data))
    }, [getUser]);

    useEffect(() => {
        fetch(ordersURL)
        .then(res => res.json())
        .then(data => setOrders(data));
    }, [ordersURL]);

    useEffect(() => {
        fetch(allOrdersURL)
        .then(res => res.json())
        .then(data => setAllOrders(data));
    }, [allOrdersURL]);

    function handelChange(e) {
        const {name, value} = e.target;
        setUserUpdate(prev => {
            return {...prev, [name]: value};
        });
    }

    function handelClick() {
        if (btnText === 'Edit') {
           setBtnText('Update');
           setHidden(!isHidden);
           setVisible(!isVisible);
        } else if (btnText === 'Update') {
            setBtnText('Edit');
            setHidden(!isHidden);
            setVisible(!isVisible);
            fetch(updateURL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: user[0]._id, 
                    username: userUpdate.username, 
                    email: userUpdate.email, 
                    tel: userUpdate.tel, 
                    address: userUpdate.address
                })
            })
              .then(console.log("Updated"));
        }
    }

    function handelOrderClick(id) {
        const data = allOrders.find(order => order.payment.orderId === id);
        setOrder(data);
        setDisplay(!orderDisplay);
    }

    return <>
        <Header />
        <div className="user-body">
        <div className="user-card">
        <h1 className="card-title">Details</h1>
        {user&& user.map(data => <div key={data._id}>
            <div className="card-details username-div">
                <span className="username-title">Username</span>
                <h2 className="username" style={{display:isVisible ? 'block' : 'none'}}>{data.username}</h2>
                <input type='name' name='username' readOnly={true} value={data.username} placeholder='username' style={{display:isHidden ? 'none' : 'block'}}/>
            </div>
            <div className="card-details email-div">
                <span className="email-title">Email</span>
                <h2 className="email" style={{display:isVisible ? 'block' : 'none'}}>{data.email}</h2>
                <input type='email' name='email' onChange={handelChange} placeholder='user@gmail.com' style={{display:isHidden ? 'none' : 'block'}}/>
            </div>
            <div className="card-details tel-div">
                <span className="tel-title">Mobile Number</span>
                <h2 className="tel" style={{display:isVisible ? 'block' : 'none'}}>+91 {data.tel}</h2>
                <input type='tel' name='tel' onChange={handelChange} placeholder='0123456789' style={{display:isHidden ? 'none' : 'block'}}/>
            </div>
            <div className="card-details address-div">
                <span className="address-title">Address</span>
                <h2 className="address" style={{display:isVisible ? 'block' : 'none'}}>C/o {data.address}</h2>
                <textarea typeof='address' name='address' onChange={handelChange} cols='28' style={{display:isHidden ? 'none' : 'block'}}/>
            </div>
            <div className="details-update-div">
                <button className="btn btn-outline-dark" onClick={handelClick}>{btnText}</button>
            </div>
        </div>)}
        </div>
        <div className='user-orders'>
        <h1 className="orders-title">Orders</h1>
        {orders&&orders.map(order => <div key={order._id} className='orders' onClick={() => handelOrderClick(order.orderId)}>
        <div className='order-id-div orders-div'>
        <span className='orders-titles'>Order Id</span>
        <h2 className='order-id order-details'>{order.orderId}</h2>
        </div>
        <div className='order-date-div orders-div'>
        <span className='orders-titles'>Date</span>
        <h2 className="order-date order-details">{order.txnDate}</h2>
        </div>
        <div className='order-price-div orders-div'>
        <span className='orders-titles'>Price</span>
        <h2 className="order-price order-details">₹{order.txnAmount}</h2>
        </div>
        <div className='order-paymentMode-div orders-div'>
        <span className='orders-titles'>Payment Method</span>
        <h2 className="order-paymentMode order-details">{order.paymentMode}</h2>
        </div>
        <div className='order-status-div orders-div'>
        <span className='orders-titles'>Status</span>
        <h2 className="order-status order-details">{order.txnStatus}</h2>
        </div>
        </div>)}
        </div>
        </div>
        {orderDisplay ? <div className='order-display-main'>
        <div className='order-display'>
        <div className='store-display'>
        <img src={gotOrder.store.imgURL} alt='Store-img' className='order-store-img'/>
        <h1 className='order-store-title'>{gotOrder.store.name}</h1>
        <span className='order-store-details'>{gotOrder.store.content}</span>
        <span className='order-store-details'>{gotOrder.store.rating}</span>
        <span className='order-store-details'>{gotOrder.store.location}</span>
        </div>
        {gotOrder.cart.map(item => {
            return (
                <div key={item.key} className='cart-display'>
                <img src={item.imgURL} alt='Cart-Item-img' className='order-cart-img'/>
                <h3 className='order-cart-title'>{item.title}</h3>
                <span className='order-cart-details'>{item.price}</span>
                <span className='order-cart-details'>Q {item.quantity}</span>
                </div>
            )
        })}
        </div>
        <button className='btn btn-dark close' onClick={() => setDisplay(!orderDisplay)}><i className="fa-solid fa-xmark"></i></button>
        </div> : ''}
    </>
}

export default User;