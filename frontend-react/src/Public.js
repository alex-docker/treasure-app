import React from 'react';
import { getPublicMes } from './api';

class Public extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    }
    this.errorMessage = '';
  }
  componentDidMount() {
    this.getPublicMessage()
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
    return (
      <div>
        <div>{this.state.message}</div>
        <p>{this.state.errorMessage}</p>
      </div>
    )
  }
}

export default Public;