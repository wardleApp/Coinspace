import React from 'react';
import ReactDOM from 'react-dom';
import img from '../dist/img/graphTemplate.png';
import axios from 'axios';

class App extends React.Component {
	constructor(props) {
		super(props);
    this.state = {

    };
	}
  componentDidMount() {
    // React Cronjob
    // let minute = new Date().getMinutes() % 15;
    // console.log(15 - minute, 'minutes left');
    // new Promise(() => {
    //   setTimeout(this.getUpdate, 900000 - 60000 * minute)
    // }).then(() => {
    //   // setInterval(this.getUpdate, 1800000);
    // }).catch(err => {
    //   console.log('set interval err', err);
    // });
  }
  changeState(data) {
    this.setState({data: data});
  }
  getUpdate() {
    // axios call to server
    // on success, set timeout(at the 00 minute, set the state)
    axios.get('/update')
      .then((data) => {
        let minute = new Date().getMinutes() % 30;
        setTimeout(()=>{changeState(data)}, 1800000 - 60000 * minute);
      }).catch(err => {
        console.log('update err', err);
      });
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
