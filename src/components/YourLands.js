import React, { Component } from 'react'

const showYourLands = (lands, account, listLand, handleChange, value) => {
  const yourLands = lands.filter(land => land.owner === account)
  return (
    yourLands.map((land) => {
      return (
        <div className="land" key={land.landID}>
          <div className="header">
            <h1>#{land.landID.toString()}</h1>
            <h2>{land.location}</h2>
          </div>
          <div className="image_div">
            <img className="image" src={`https://ipfs.infura.io/ipfs/${land.image}`} alt="" />
          </div>
          <div className='content'>
            <h3>Value: {window.web3.utils.fromWei(land.value.toString(), 'Ether')} Eth</h3>
            { land.forSale !== true ?
              <div>
                <input
                  id="value"
                  onChange={handleChange}
                  type="text"
                  className="input-listLand2"
                  placeholder="Listing Price.."
                  required />
                <button 
                  value={value}
                  className="buyButton"
                  onClick={ (e) => { listLand(land.landID, window.web3.utils.toWei(e.target.value.toString(), 'Ether')) } } 
                > List Your Land
                </button> 
             </div> :
             <strong className='myLand'>Listed</strong>
            }
          </div>
        </div>
      )
    })
  )
}

class YourLands extends Component {

  state = {
    value: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  } 

  render() {
    const { lands, account, listLand } = this.props;
    return (
      <div>
        <h2 className='title'>Your Lands</h2>
        <div className='lands'>
          { showYourLands(lands, account, listLand, this.handleChange, this.state.value) }
        </div>
      </div>
    )
  }
}

export default YourLands