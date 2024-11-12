import React from 'react';
import { Link } from 'react-router-dom';
import "../styles.css";

function Header() {
  return (
    <header>
      <nav style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center',}}>
        <div>
          <h1 style={{fontStyle: 'italic'}}>Shoopy Globe</h1>
        </div>
        <div>
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
