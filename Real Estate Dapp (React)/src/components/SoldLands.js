import React, { Component } from 'react'

export class SoldLands extends Component {

  state = {
    value: null
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h2>Sold Lands</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">location</th>
              <th scope="col">value</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="landList">
            { this.props.lands.map((land) => {
                if(!land.forSale) {
                  return(
                    <tr key={land.landID}>
                      <th scope="row">{land.landID.toString()}</th>
                      <td>{land.location}</td>
                      <td>{window.web3.utils.fromWei(land.value.toString(), 'Ether')} Eth</td>
                      <td>{land.owner}</td>
                      { land.owner === this.props.account ? 
                        <td>
                          <input
                            id="value"
                            onChange={this.handleChange}
                            type="text"
                            className="form-control"
                            placeholder="Listing Price.."
                            required />
                          <button 
                            value={this.state.value}
                            className="buyButton"
                            onClick={ (e) => {this.props.listLand(land.landID, window.web3.utils.toWei(e.target.value.toString(), 'Ether'))} } 
                          > List Your Land
                          </button>
                        </td> : <div></div>
                      } 
                    </tr>
                  )
                } 
              }
            )}
          </tbody>
        </table>
      </div>
    )
  }
}

export default SoldLands
