import React from 'react';
import ReactDOM from 'react-dom';
import img from '../dist/img/graphTemplate.png';

class App extends React.Component {
	constructor(props) {
		super(props)
	}
  render() {
    return (
      <div>
        <img src={require("../dist/img/graphTemplate.png")}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));