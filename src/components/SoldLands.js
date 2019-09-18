import React, { Component } from 'react'

const showSoldLands = (lands, listLand, account, handleChange, value) => {
  const soldLands = lands.filter(land => land.forSale === false)
  return (
    soldLands.map((land) => {
      return (
        <tr key={land.landID}>
          <th scope="row">{land.landID.toString()}</th>
          <td>{land.location}</td>
          <td>{window.web3.utils.fromWei(land.value.toString(), 'Ether')} Eth</td>
          <td>{land.owner}</td>
          { 
            land.owner === account ? 
              <td>
                <input
                  id="value"
                  onChange={handleChange}
                  type="text"
                  className="input-listLand"
                  placeholder="Listing Price.."
                  required 
                />
                <button 
                  value={value}
                  className="buyButton"
                  onClick={ (e) => { listLand(land.landID, window.web3.utils.toWei(e.target.value.toString(), 'Ether')) } } 
                > List Your Land
                </button>
              </td> 
            : 
              <td><strong>Not Your Land</strong></td>
          } 
        </tr>
      )
    })
  )
}

class SoldLands extends Component {

  state = {
    value: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    const { lands, listLand, account } = this.props;
    return (
      <div>
        <h2 className='title2'>Out of Market</h2>
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
            { showSoldLands(lands, listLand, account, this.handleChange, this.state.value) }
          </tbody>
        </table>
      </div>
    )
  }
}

export default SoldLands
