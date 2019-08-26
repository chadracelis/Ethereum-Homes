import React, { Component } from 'react'

const showLandsForSale = (lands, buyLand) => {
  const landsForSale = lands.filter(land => land.forSale === true)
  return (
    landsForSale.map((land) => {
      return (
        <tr key={land.landID}>
          <th scope="row">{land.landID.toString()}</th>
          <td>{land.location}</td>
          <td>{window.web3.utils.fromWei(land.value.toString(), 'Ether')} Eth</td>
          <td>{land.owner}</td>
          <td>
            <button 
              value={land.value}
              className="buyButton"
              onClick={ (event) => { buyLand(land.landID, event.target.value)} } 
            > Buy
            </button>
          </td> 
        </tr>
      )
    })
  )
}

export class LandsForSale extends Component {

  render() {
    return (
      <div>
        <h2>Lands For Sale</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Location</th>
              <th scope="col">Value</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="landList">
            { showLandsForSale(this.props.lands, this.props.buyLand) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default LandsForSale
