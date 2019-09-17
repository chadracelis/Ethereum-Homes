import React, { Component } from 'react'

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) 

class AddLand extends Component {

  state = {
    location: null,
    value: null,
    buffer: null,
    image: '',
  }

  captureFile = (e) => {
    e.preventDefault()
    const file = e.target.files[0]
    const reader = new window.FileReader() // convert file to a buffer (allows us to sore into ipfs)
    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({ buffer: Buffer(reader.result) })
      console.log('buffer', Buffer(reader.result))
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  
  render() {
    return (
      <div>
        <h1 className='title2'>Add Land</h1>
        <form className='add-form' onSubmit={(event) => {
          event.preventDefault()
          const location = this.state.location
          const value = window.web3.utils.toWei(this.state.value.toString(), 'Ether')
          ipfs.add(this.state.buffer, async (error, result) => {
            console.log('Ipfs result', result)
            const image = result[0].hash
            if(error) {
              console.log(error)
              return
            }
            await this.props.addLand(location, image, value)
          })
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="location"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Location.."
              required 
            />
            <input
              id="value"
              type="text"
              onChange={this.handleChange}
              className="form-control"
              placeholder="Land value.."
              required 
            />
            <div className='add-submit'>
              <input 
                type='file' 
                onChange={this.captureFile} 
              />
              <button 
                type="submit" 
                className="btn btn-primary">
                Add Land
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default AddLand
