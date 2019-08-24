import React, { Component } from 'react'

export class AddLand extends Component {

  state = {
    location: null,
    value: null,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1>Add Land</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const location = this.state.location
          const value = window.web3.utils.toWei(this.state.value.toString(), 'Ether')
          this.props.addLand(location, value)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="location"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Location.."
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="value"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Land value.."
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Land</button>
        </form>
      </div>
    )
  }
}

export default AddLand
