import React from 'react';

class SmallCurrentToggle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button className="ui left floated button">{this.props.name + ' ' + this.props.coin.Price} </button>
    );
  }
}

export default SmallCurrentToggle;