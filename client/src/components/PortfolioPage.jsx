import React from 'react';

class PortfolioPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ui segment pushable">>
        <div className="ui visible inverted left vertical sidebar menu">
          <a className="item">
            <i className="home icon"></i>
            Home
          </a>
          <a className="item">
            <i className="block layout icon"></i>
            Topics
          </a>
          <a className="item">
            <i className="smile icon"></i>
            Friends
          </a>
          <a className="item">
            <i className="calendar icon"></i>
            History
          </a>
        </div>
        <div className="pusher">
          <div className="ui basic segment">
            <h3 className="ui header">Application Content</h3>
            <p></p>
            <p></p>
            <p></p>
            <p></p>
          </div>
        </div>
      </div>

    );
  }
}

export default PortfolioPage;