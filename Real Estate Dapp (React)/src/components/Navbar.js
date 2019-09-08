import React, { Component } from 'react';
import home from '../home.png'

class Navbar extends Component {
  render() {
    const { account } = this.props;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark navbar-custom">
          <a className="navbar-brand" href="/#"><strong>Ethereum Homes</strong></a>
          <img src={home} alt="/" />
          <ul className="navbar-nav ml-auto">
            <h4 className="nav-address">Account:</h4>
            <li className="nav-item">
              <a
                className="nav-link nav-link-custom"
                href={`https://etherscan.io/address/${account}`}
                target="_blank"
                rel="noopener noreferrer"
              >
               <strong>{account}</strong>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Navbar;
