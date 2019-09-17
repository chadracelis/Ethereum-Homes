import React, { Component } from 'react'
import AddLand from './AddLand';
import LandsForSale from './LandsForSale';
import SoldLands from './SoldLands';
import YourLands from './YourLands';

class Content extends Component {
  render() {
    const { addLand, lands, buyLand, account, listLand } = this.props
    return (
      <div id="content">
        {
          account === '0x20207A621b882AB7129b4cF038Dc2686Bc4610b8' ? // modify to contract owner
            <AddLand addLand={addLand} /> :
            <div></div>
        }
        <p>&nbsp;</p>
        <LandsForSale lands={lands} buyLand={buyLand} account={account} />
        <p>&nbsp;</p>
        <SoldLands lands={lands} account={account} listLand={listLand} />
        <p>&nbsp;</p>
        <YourLands lands={lands} listLand={listLand} account={account} />
      </div>
    )
  }
}

export default Content