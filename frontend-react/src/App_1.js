import React from 'react';
import Articles from './Articles';
import firebase from './firebase';
import { getPrivateMes, getPublicMes } from './api';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      message: '',
    }
    this.errorMessage = '';
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({user: user});
      } else {
        this.setState({
          user: null
        });
      }
    });
  }

  getPrivateMessage() {
    this.state.user
      .getIdToken()
      .then(token => {
        return getPrivateMes(token);
      })
      .then(resp => {
        this.setState({
          message: resp.message
        });
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        })
      })
  }

  getPublicMessage() {
    getPublicMes()
      .then(resp => {
        return resp.json()
      })
      .then(resp => {
        this.setState({
          message: resp.message
        })
      })
      .catch(error => {
        this.setState({
          errorMessage: error.toString()
        })
      })
  }

  render() {
    if (this.state.user === null) {
      return <button onClick={firebase.login}>Please login</button>;
    }
    return (
      <div>
        <div>
          <div>{this.state.message}</div>
          <p>{this.state.errorMessage}</p>
          <button onClick={this.getPrivateMessage.bind(this)}>
            Get Private Message
          </button>
          <button onClick={this.getPublicMessage.bind(this)}>
            Get Public Message
          </button>
          <button onClick={firebase.logout}>Logout</button>
        </div>
        <Articles></Articles>
      </div>
    )
  }
}

export default App;
