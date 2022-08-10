import React from 'react';
import { Routes, Route, BrowserRouter, } from 'react-router-dom';
import Home from './components/Home/HomePage';
import Menu from './components/Menu/ListingPage';
import Details from './components/Details/Details';
import Login from './components/Authentication/Login';
import Register from './components/Authentication/Register';
import User from './components/User/User';
import Checkout from './components/Checkout/Checkout';
import Payment from './components/Payment/Payment';
import Footer from './components/Footer';
import './components/footer.css'

function Routing() {
    return (
        <>
        <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/listing/:name" element={<Menu />} />
            <Route path="/details/:name" element={<Details />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user" element={<User />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment/:custId/:orderId" element={<Payment />} />
        </Routes>
        </BrowserRouter>
        <Footer />
        </>
    )
}

export default Routing;