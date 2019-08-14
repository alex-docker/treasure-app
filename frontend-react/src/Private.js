import React from 'react';
import firebase from './firebase';
import { getPrivateMes } from './api';

class Private extends React.Component {
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
        this.getPrivateMessage();
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

  render() {
    return (
      <div>
        <div>{this.state.message}</div>
        <p>{this.state.errorMessage}</p>
      </div>
    )
  }
}

export default Private;