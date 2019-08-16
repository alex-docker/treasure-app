import React from 'react';
import { deleteArticle } from '../../api';
import firebase from '../../firebase';

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      user: null,
    }
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

  handleDeleteArticle() {
    this.state.user
      .getIdToken()
      .then(token => {
        deleteArticle(token, this.props.props.id)
          .then(res => {
            if (res.status === 204) {
              window.location.reload()
            }
          });
      })
      .catch(error => {
        console.error('error');
      });
  }

  render() {
    return (
      <div>
        <hr />
        <p>{this.props.props.id}</p>
        <p>{this.props.props.title}</p>
        <p>{this.props.props.body}</p>
        <p>{this.props.props.user_id}</p>
        <a href={`/articles/${this.props.id}/update`}>update</a>
        <button type="button" onClick={this.handleDeleteArticle.bind(this)}>delete</button>
      </div>
    )
  }
}

export default Article;