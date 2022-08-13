import React, {useState, useEffect} from 'react';
import './header.css'

function Header(props) {

  const url = "https://organicfoods.herokuapp.com/homePage";

  const [list, setList] = useState([]);

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

  const store = list.find(item => item.name === props.name);
  
  return (
    <header>
        <div className="nav-hidden">Hidden</div>
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