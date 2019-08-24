import React, { Component } from 'react'
import AddLand from './AddLand';
import LandsForSale from './LandsForSale';
import ListLand from './ListLand';
import SoldLands from './SoldLands';

export class Main extends Component {

  render() {
    return (
      <div id="content">
        <p></p>
        <AddLand addLand={this.props.addLand} />
        <p>&nbsp;</p>
        <LandsForSale lands={this.props.lands} buyLand={this.props.buyLand} />
        <p>&nbsp;</p>
        <ListLand listLand={this.props.listLand} />
        <p>&nbsp;</p>
        <SoldLands lands={this.props.lands} account={this.props.account} listLand={this.props.listLand} />
      </div>
    )
  }
}

export default Main