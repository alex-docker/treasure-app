import React from 'react';
import Article from './Article';
import { getArticles } from './api';

class Articles extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      articles: []
    }
  }

  componentDidMount() {
    getArticles()
      .then(res => {
        return res.json()
      })
      .then(res => {
        this.setState({
          articles: res
        })
      })
      .catch(error => {
        console.error(error)
      })
  }

  render() {
    return (
      <div>
        {this.state.articles.map(article => {
          return <Article props={article} key={article.id}></Article>
        })}
      </div>
    )
  }
}

export default Articles;