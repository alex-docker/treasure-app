import React from 'react';

const Article = (props) => (
  <div>
    <hr />
    <p>{props.props.id}</p>
    <p>{props.props.title}</p>
    <p>{props.props.body}</p>
    <p>{props.props.user_id}</p>
  </div>
)

export default Article;