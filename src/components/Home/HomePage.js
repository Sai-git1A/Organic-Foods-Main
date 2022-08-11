import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Header from './Header';
import './home.css';

function Home() {

    const url = "https://organicfoods.herokuapp.com/homePage";

    const [homeData, setHomeData] = useState([]);
    const [state, setState] = useState(false);
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
        fetch(url)
         .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 404) {
                return console.log("Error:" + res.status);
            }
         })
        .then(data => setHomeData(data))
        .then(() => {setState(true); setVisible(false);});
    }, []);

    return (
        <>
        <Header list={homeData} />
        <div className= "storeBox">
        {state ? homeData.map(store => {
            return (
                <Link key={store._id} to={`/listing/${store.name}`}>
                <div id={store.id} className= "stores">
                      <img className="store-img" src={store.imgURL} alt={store.name} />
                      <h3 className="store-title">{store.name}</h3>
                      <p className="store-sub">{store.content}</p>
                      <p>{store.rating}</p>
                </div>
                </Link>
            )
         }) : ''}
         {isVisible ? <div className='progress-box-main'>
          <div className='progress-box'>
            <CircularProgress color='info'/>
            <h1 className='progress-box-title'>Getting data....</h1>
          </div>
        </div> : ''}
        </div>
        </>
    )
}

export default Home;