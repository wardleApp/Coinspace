import React from 'react';
import ReactDOM from 'react-dom';

class FBLogin extends React.Component {
  constructor(props) {
    console.log("FBLogin constructor initiated");
    super(props);
    this.state = {};

    //FB Javascript SDK //load with the page
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }

  //SDK setup

  //adpted from window.fbAsyncInit
  fbAsyncInit() {
    FB.init({
      appId      : '142468679794360', //our app's id on facebook
      xfbml      : true,
      version    : 'v2.11' //needs to be the lastest facebook sdk version
    });
    // FB.AppEvents.logPageView();

    //check if we're logged in
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  };

  //statusChangeCallback
  statusChangeCallback(response) {

    if (response.status === 'connected') {
      console.log('Logged in and authenticated');
      console.dir(response);
      this.testAPI("/me?fields=name,email");

    } else {
      console.log('Not authenticated');
    }
  }

  //checks if logged in
  checkLoginState() {

    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }

  //test incoming data
  testAPI(query) {

    FB.api(query, function(response) {

      if (response) {

        if (!response.error) {
          console.log("Welcome, ", response.name);
          console.dir(response);
          this.buildProfile(response,console.log);

        } else {
          console.dir(response.error);
        }
        
      } else {
        console.log("no response from API");
      }
    });
  };

  //build a profile
  buildProfile(response, callback) {
    let user = {
      name: response.name,
      email: response.email
    };

    callback(user);
  };

  render() {


    console.log("FBLogin render initiated");

    let login = this.checkLoginState.bind(this);

    let loginButton = (

      <div>
        <fb-login-button
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"

          scope="public_profile,email"
          onlogin={login}>
        </fb-login-button>
      </div>
    );

  return loginButton;
  }
  
}

export default FBLogin;