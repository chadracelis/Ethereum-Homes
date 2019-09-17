import React, { Component } from 'react'

const showLandsForSale = (lands, buyLand, account) => {
  const landsForSale = lands.filter(land => land.forSale === true)
  return (
    landsForSale.map((land) => {
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
            <h4 className='owner'>Owner</h4>
            <h5 className='address'>{land.owner}</h5>
            {
              land.owner !== account ? 
                <button 
                  value={land.value}
                  className="buyButton"
                  onClick={ (event) => { buyLand(land.landID, event.target.value) } } 
                > Buy
                </button>
              :
                <strong className='myLand'>Your Listing</strong>
            }
          </div>
        </div>
      )
    })
  )
}

class LandsForSale extends Component {

  render() {
    return (
      <div>
        <h2 className='title'>Lands For Sale</h2>
        <div className='lands'>
          { showLandsForSale(this.props.lands, this.props.buyLand, this.props.account) }
        </div>
      </div>
    )
  }
}

export default LandsForSale