import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Header from './Header';
import './payment.css';

function Payment () {
    const params = useParams();
    const navigate = useNavigate();
    const url = `https://organicfoods.herokuapp.com/orders/${params.custId}`;
    const postURL = 'https://organicfoods.herokuapp.com/cart';
    const [order, setOrder] = useState([]);
    const [orderData, setOrderData] = useState();
    const [isVisible, setVisible] = useState(true);
    const [isDisplay, setDisplay] = useState(false);

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setOrder(data.find(o => o.orderId === params.orderId)))
        .then(() => {setVisible(false); setDisplay(true);});
    }, [url, params.orderId]);

    useEffect(() => {
        const store = JSON.parse(sessionStorage.getItem('store'));
        const cart = JSON.parse(sessionStorage.getItem('cart'));
        const data = {storeData: store, cartData: cart, payment: order};
        setOrderData(data);
    }, [order]);

    function handelClick() {
        setDisplay(false);
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(res => console.log(res));
    }

    return (
        <>
            <Header />
            <div className="payment-body">
                <div className='payment-details-div'>
                <div className='payment-detail'>
                <span className='details-titles'>Order Id</span>
                <h2 className='orderId detail'>{order.orderId}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Customer Id</span>
                <h2 className='custId detail'>{order.custId}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Transaction Id</span>
                <h2 className='txnId detail'>{order.txnId}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Status</span>
                <h2 className='txnStatus detail'>{order.txnStatus}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Payment Method</span>
                <h2 className='paymentMode detail'>{order.paymentMode}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Date</span>
                <h2 className='txnDate detail'>{order.txnDate}</h2>
                </div>
                <div className='payment-detail'>
                <span className='details-titles'>Price</span>
                <h2 className='txnAmount detail'>{order.txnAmount}</h2>
                </div>
                </div>
            </div>
            <div className='payment-navigate'>
                <button className='btn btn-outline-dark btn-navigate' onClick={() => {navigate(`/details/${orderData[0].storeData.name}`)}}>Go Back</button>
                <button className='btn btn-outline-dark btn-navigate' onClick={() => {navigate(`/user`)}}>Continue</button>
            </div>
            {isVisible ? <div className='progress-box-main'>
              <div className='progress-box'>
                <CircularProgress color='info'/>
                <h1 className='progress-box-title'>Getting data....</h1>
              </div>
            </div> : ''}
            {isDisplay ? <div className='status-box-main'>
                <div className='status-box'>
                {order && order.txnStatus === 'TXN_SUCCESS' ? 
                <h1 className='status-title'>Your transaction is Successful.</h1> : 
                <h1 className='status-title'>Your transaction got Stuck.</h1>}
                <button className='btn btn-dark' onClick={handelClick}>Ok</button>
                </div>
            </div> : ''}
        </>
    )
}

export default Payment;