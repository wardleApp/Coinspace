import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class SmallCurrentToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandle(e, { value }) {
    this.props.onSetCoin(value, this.props.state.currentTimePeriod);
  }

  render() {
    return (
      <Menu pointing secondary>
        <Menu.Menu position='left'>
          <Menu.Item active={this.props.currentCoin === this.props.coin_id} content={`${this.props.name} $${(+this.props.coin).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`} onClick={this.onClickHandle.bind(this)} value={this.props.coin_id}/>
        </Menu.Menu>
      </Menu>
    );
  }
}

export default SmallCurrentToggle;
