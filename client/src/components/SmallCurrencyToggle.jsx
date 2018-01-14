import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class SmallCurrentToggle extends React.Component {
  constructor(props) {
    super(props);
    this.price = this.props.state.allData.slice(-4).filter((allCoins) => allCoins.coin_id === this.props.coin_id)[0].price;
  }

  onClickHandle(e, { value }) {
    this.props.onSetCoin(value, this.props.state.currentTimePeriod);
  }
  render() {
    return (
      <Menu pointing secondary>
        <Menu.Menu position='left'>
          <Menu.Item active={this.props.state.currentCoin === this.props.coin_id} content={`${this.props.name} $${(+this.price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} onClick={this.onClickHandle.bind(this)} value={this.props.coin_id}/>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default SmallCurrentToggle;
