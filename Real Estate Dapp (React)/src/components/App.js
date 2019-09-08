import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import LandContract from '../abis/LandContract.json';
import Navbar from './Navbar';
import Content from './Content';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-ethereum browser detected')
    }
  }

  // .call() to get blockchain data
  // .send() to set transaction
  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    const account = accounts[0]
    this.setState({ account })
    // Load contract
    const networkId = await web3.eth.net.getId()
    const networkData = LandContract.networks[networkId]
    if(networkData) {
      const landContract = web3.eth.Contract(LandContract.abi, networkData.address)
      this.setState({ landContract })
      const landCount = await landContract.methods.landCount().call()
      this.setState({ landCount })
      console.log(this.state.landCount)
      // Load Products
      for(var i = 1; i <= landCount; i++) {
        const land = await landContract.methods.lands(i).call()
        this.setState({
          lands: [...this.state.lands, land]
        })
      }
      this.setState({ loading: false })
      console.log(this.state.lands)
    } else {
      window.alert('LandContract not deployed to connected network');
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      landCount: '',
      lands: [],
      loading: true
    }

    this.addLand = this.addLand.bind(this)
    this.buyLand = this.buyLand.bind(this)
    this.listLand = this.listLand.bind(this)
  }

  addLand = (location, value) => {
    this.setState({ loading: true })
      this.state.landContract.methods.addLand(location, value).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  buyLand = (id, value) => {
    this.setState({ loading: true })
      this.state.landContract.methods.buyLand(id).send({ from: this.state.account, value: value })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  listLand = (id, value) => {
    this.setState({ loading: true })
      this.state.landContract.methods.listLand(id, value).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
  }

  render() {
    return (
      <div className='app-container'>
        <Navbar account={this.state.account} />
        <div className='container-fluid mt-5'>
          <div class1='row'>
            <main role='main' className='col-lg-12 flex'>
            { 
              this.state.loading ? 
                <p>Loading...</p> :
                <Content 
                  lands={this.state.lands} 
                  addLand={this.addLand} 
                  buyLand={this.buyLand}
                  listLand={this.listLand}
                  account={this.state.account}
                /> 
            }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
