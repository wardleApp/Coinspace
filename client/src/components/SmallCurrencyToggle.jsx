import React from 'react';

class SmallCurrentToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickHandle(e) {
    this.props.onSetCoin(e.target.value);
  }

  render() {
    return (
      <button className="ui left floated button" onClick={this.onClickHandle.bind(this)} value={this.props.coin_id}>{this.props.name + ' ' + '$' + (parseFloat(this.props.coin).toFixed(2)).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} </button>
    );
  }
}

export default SmallCurrentToggle;