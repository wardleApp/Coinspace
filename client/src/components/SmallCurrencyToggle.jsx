import React from 'react';
import { Menu, Segment } from 'semantic-ui-react';

class SmallCurrentToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandle(e, { value }) {
    this.props.onSetCoin(value);
    
  }

  render() {
    return (
      <Menu pointing secondary>
      <Menu.Menu position='left'>
       <Menu.Item active={this.props.currentCoin === this.props.coin_id} name={this.props.name + ' ' + '$' + (parseFloat(this.props.coin).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} onClick={this.onClickHandle.bind(this)} value={this.props.coin_id}/>
      </Menu.Menu>
      </Menu>
    );
  }
}

export default SmallCurrentToggle;