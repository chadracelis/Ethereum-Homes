import React, { Component } from 'react'
import AddLand from './AddLand';
import LandsForSale from './LandsForSale';
import ListLand from './ListLand';
import SoldLands from './SoldLands';

class Content extends Component {
  render() {
    const { addLand, lands, buyLand, account, listLand } = this.props
    return (
      <div id="content">
        <p></p>
        {
          account === '0x20207A621b882AB7129b4cF038Dc2686Bc4610b8' ? // modify to contract owner
            <AddLand addLand={addLand} /> :
            <div></div>
        }
        <p>&nbsp;</p>
        <LandsForSale lands={lands} buyLand={buyLand} account={account} />
        <p>&nbsp;</p>
        <ListLand listLand={listLand} />
        <p>&nbsp;</p>
        <SoldLands lands={lands} account={account} listLand={listLand} />
      </div>
    )
  }
}

export default Content
