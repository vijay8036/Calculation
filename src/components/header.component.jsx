import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import { constants } from 'crypto';


export default class Header extends Component {

    constructor() {
        super();
        this.onBold = this.onBold.bind(this);    
       
      }
      onBold(){
        document.execCommand("bold");
      }
    render() {       
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
         
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                  <Link to={'/'} className="nav-link">Home</Link>
                </li>
              <li className="nav-item">
                  <Link to={'/month'} className="nav-link">Month</Link>
                </li>
              <li className="nav-item">
                  <Link to={'/transition'} className="nav-link">Transition</Link>
                </li>
              <li className="nav-item">
                  <Link to={'/member'} className="nav-link">Member</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/create'} className="nav-link">Create</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/index'} className="nav-link">Index</Link>
                </li>
                <li className="nav-item">
                  <Link to={'/login'} className="nav-link">Login</Link>
                </li>
                <li className="nav-item">             
                  <button className="nav-link" onClick={this.onBold}>bold</button>
                </li>
                {/* <li className="nav-item">
                  <Link to={'/mtransition'} className="nav-link">Member Transaction</Link>
                </li> */}
              </ul>
            </div>
          </nav> 
        
            )
    }
}
