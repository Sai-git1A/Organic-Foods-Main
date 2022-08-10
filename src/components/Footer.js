import React from 'react';

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer>
    <div className="footer" id="footer">
      <a href="www.facebook.com" target="_blank" className="social"><i className="fa-brands fa-facebook-f contact"></i></a>
      <a href="www.twitter.com" target="_blank" className="social"><i className="fa-brands fa-twitter contact"></i></a>
      <a href="www.whatsapp.com" target="_blank" className="social"><i className="fa-brands fa-whatsapp contact"></i></a>
      <a href="www.gmail.com" target="_blank" className="social"><i className="fa-solid fa-envelope contact"></i></a>
      <p className="copyright">Organic Foods &#169; {year} </p>
    </div>
  </footer>
  );
}

export default Footer;
