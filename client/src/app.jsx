import React from 'react';
import render from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        Hello from react
      </div>
    );
  }
}

render(<App />, document.getElementById('app'));