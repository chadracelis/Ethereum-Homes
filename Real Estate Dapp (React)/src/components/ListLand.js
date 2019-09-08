import React, { Component } from 'react'

class ListLand extends Component {

  state = {
    id: null,
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
        <h2>List Your Land</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const id = this.state.id
          const value = window.web3.utils.toWei(this.state.value.toString(), 'Ether')
          this.props.listLand(id, value)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="id"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Land ID.."
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="value"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Listing Price.."
              required />
          </div>
          <button type="submit" className="btn btn-primary">List Land</button>
        </form>
      </div>
    )
  }
}

export default ListLand
